import { useEffect, useState, type SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';

type Task = {
    id: string;
    name: string;
    description: string;
    status: 'pending' | 'completed';
};

function Home() {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const API_BASE = 'http://localhost:3000/api/v1';

    const fetchTasks = async (): Promise<void> => {
        try {
            const res = await fetch(`${API_BASE}/tasks`, {
                credentials: 'include',
            });

            const result = await res.json();

            if (res.ok) {
                setTasks(result.success.data);
            } else {
                handleError(result.error?.message);
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                handleError(err.message);
            } else {
                handleError('Something went wrong');
            }
        }
    };

    useEffect(() => {
        const loadTasks = async () => {
            await fetchTasks();
        };

        loadTasks();
    }, []);

    const handleCreate = async (e: SyntheticEvent): Promise<void> => {
        e.preventDefault();

        if (!name || !description) {
            return handleError('All fields are required');
        }

        try {
            const res = await fetch(`${API_BASE}/tasks`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, description }),
                credentials: 'include',
            });

            const result = await res.json();

            if (res.ok) {
                handleSuccess(result.success.message);
                setName('');
                setDescription('');
                await fetchTasks();
            } else {
                handleError(result.error?.message);
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                handleError(err.message);
            } else {
                handleError('Something went wrong');
            }
        }
    };

    const handleComplete = async (id: string): Promise<void> => {
        try {
            const res = await fetch(`${API_BASE}/tasks/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'completed' }),
                credentials: 'include',
            });

            const result = await res.json();

            if (res.ok) {
                handleSuccess(result.success.message);
                await fetchTasks();
            } else {
                handleError(result.error?.message);
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                handleError(err.message);
            } else {
                handleError('Something went wrong');
            }
        }
    };

    const handleDelete = async (id: string): Promise<void> => {
        try {
            const res = await fetch(`${API_BASE}/tasks/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            const result = await res.json();

            if (res.ok) {
                handleSuccess(result.success.message);
                await fetchTasks();
            } else {
                handleError(result.error?.message);
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                handleError(err.message);
            } else {
                handleError('Something went wrong');
            }
        }
    };

    const handleLogout = async (): Promise<void> => {
        await fetch(`${API_BASE}/auth/logout`, {
            method: 'GET',
            credentials: 'include',
        });

        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div style={{ padding: '40px', width: '600px' }} className="container">
            <h2>Task Dashboard</h2>

            <button onClick={handleLogout} style={{ marginBottom: '20px' }}>
                Logout
            </button>

            <form onSubmit={handleCreate} style={{ marginBottom: '30px' }}>
                <h3>Create Task</h3>
                <input
                    type="text"
                    placeholder="Task Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <br />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <br />
                <button type="submit">Create</button>
            </form>

            <h3>Your Tasks</h3>

            {tasks.length === 0 && <p>No tasks found</p>}

            {tasks.map((task) => (
                <div
                    key={task.id}
                    style={{
                        border: '1px solid #ccc',
                        padding: '10px',
                        marginBottom: '10px',
                    }}
                >
                    <h4>
                        {task.name} ({task.status})
                    </h4>
                    <p>{task.description}</p>

                    {task.status === 'pending' && (
                        <button onClick={() => handleComplete(task.id)}>Mark Completed</button>
                    )}

                    <button onClick={() => handleDelete(task.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default Home;
