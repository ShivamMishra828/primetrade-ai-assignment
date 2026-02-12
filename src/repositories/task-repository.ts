import { Prisma, Task, TaskStatus } from '@prisma/client';
import prisma from '../config/prisma-config';

class TaskRepository {
    create(taskData: Prisma.TaskCreateInput): Promise<Task> {
        return prisma.task.create({
            data: taskData,
        });
    }

    findById(id: string): Promise<Task | null> {
        return prisma.task.findUnique({
            where: { id, status: TaskStatus.pending || TaskStatus.completed },
        });
    }

    updateStatus(id: string, status: TaskStatus): Promise<Task> {
        return prisma.task.update({ where: { id }, data: { status } });
    }

    findAllTaskAdmin(): Promise<Task[]> {
        return prisma.task.findMany({
            where: { status: TaskStatus.pending || TaskStatus.completed },
        });
    }

    findAllTaskUser(userId: string): Promise<Task[]> {
        return prisma.task.findMany({
            where: { createdBy: userId, status: TaskStatus.pending || TaskStatus.completed },
        });
    }

    deleteTask(taskId: string) {
        return prisma.task.update({
            where: { id: taskId, status: TaskStatus.pending || TaskStatus.completed },
            data: {
                status: TaskStatus.cancelled,
            },
        });
    }
}

export default TaskRepository;
