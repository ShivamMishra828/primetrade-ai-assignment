import { NextFunction, Request, Response } from 'express';
import TaskRepository from '../repositories/task-repository';
import TaskService from '../services/task-service';
import { StatusCodes } from 'http-status-codes';
import { SuccessResponse } from '../utils/responses';
import { Task } from '@prisma/client';

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

        res.status(StatusCodes.OK).json(
            new SuccessResponse('Task status updated successfully', task),
        );
    } catch (err: unknown) {
        next(err);
    }
}

export async function fetchTaskById(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const task = await taskService.findById(
            req.user!.id,
            req.params.id as string,
            req.user!.role,
        );

        res.status(StatusCodes.OK).json(
            new SuccessResponse('Successfully fetched task by id', task),
        );
    } catch (err: unknown) {
        next(err);
    }
}

export async function fetchAllTasks(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const tasks = await taskService.findAllTasks(req.user!.id, req.user!.role);

        res.status(StatusCodes.OK).json(new SuccessResponse('Tasks fetched successfully', tasks));
    } catch (err: unknown) {
        next(err);
    }
}

export async function deleteTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        await taskService.deleteTask(req.params.id as string, req.user!.id, req.user!.role);
        res.status(StatusCodes.OK).json(new SuccessResponse('Task deleted successfully', null));
    } catch (err: unknown) {
        next(err);
    }
}
