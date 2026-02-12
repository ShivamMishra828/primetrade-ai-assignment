import TaskRepository from '../repositories/task-repository';
import { Task, Role, TaskStatus } from '@prisma/client';
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

    async updateStatus(
        userId: string,
        taskId: string,
        status: TaskStatus,
        userRole: Role,
    ): Promise<Task> {
        try {
            const task = await this.taskRepository.findById(taskId);

            if (!task) {
                throw new AppError('Task not found', StatusCodes.NOT_FOUND, 'TASK_NOT_FOUND');
            }

            if (task.status === status) {
                throw new AppError(
                    `Task is already ${status}`,
                    StatusCodes.CONFLICT,
                    `TASK_ALREADY_${status.toUpperCase()}`,
                );
            }

            const isAdmin: boolean = userRole === 'admin';
            const isOwner: boolean = task.createdBy === userId;

            if (task.createdBy !== userId) {
                throw new AppError(
                    'You do not have permission to update task status',
                    StatusCodes.FORBIDDEN,
                    'FORBIDDEN',
                );
            }

            return this.taskRepository.updateStatus(taskId, status);
        } catch (err: unknown) {
            if (err instanceof AppError) {
                throw err;
            } else {
                throw new AppError(
                    'Failed to update task status',
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    'TASK_UPDATION_FAILED',
                );
            }
        }
    }
}

export default TaskService;
