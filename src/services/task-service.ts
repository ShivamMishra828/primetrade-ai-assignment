import TaskRepository from '../repositories/task-repository';
import { Task } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import AppError from '../utils/app-error';

interface TaskCreateInput {
    name: string;
    description: string;
}

class TaskService {
    private taskRepository: TaskRepository;

    constructor(taskRepository: TaskRepository) {
        this.taskRepository = taskRepository;
    }

    async create(taskData: TaskCreateInput, userId: string): Promise<Task> {
        try {
            return await this.taskRepository.create({
                name: taskData.name,
                description: taskData.description,
                creator: {
                    connect: {
                        id: userId,
                    },
                },
            });
        } catch (err: unknown) {
            throw new AppError(
                'Failed to create task',
                StatusCodes.INTERNAL_SERVER_ERROR,
                'TASK_CREATION_FAILED',
            );
        }
    }
}

export default TaskService;
