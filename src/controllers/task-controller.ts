import { NextFunction, Request, Response } from 'express';
import TaskRepository from '../repositories/task-repository';
import TaskService from '../services/task-service';
import { StatusCodes } from 'http-status-codes';
import { SuccessResponse } from '../utils/responses';

const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);

export async function createTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const task = await taskService.create(req.body, req.user!.id);

        res.status(StatusCodes.CREATED).json(
            new SuccessResponse('Task created successfully', task),
        );
    } catch (err: unknown) {
        next(err);
    }
}

export async function updateTaskStatus(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const task = await taskService.updateStatus(
            req.user!.id,
            req.params.id as string,
            req.body.status,
            req.user!.role,
        );

        res.status(StatusCodes.CREATED).json(
            new SuccessResponse('Task status updated successfully', task),
        );
    } catch (err: unknown) {
        next(err);
    }
}
