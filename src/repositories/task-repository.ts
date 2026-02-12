import { Prisma, Task, TaskStatus } from '@prisma/client';
import prisma from '../config/prisma-config';

class TaskRepository {
    create(taskData: Prisma.TaskCreateInput): Promise<Task> {
        return prisma.task.create({
            data: taskData,
        });
    }

    findById(id: string): Promise<Task | null> {
        return prisma.task.findUnique({ where: { id } });
    }

    updateStatus(id: string, status: TaskStatus): Promise<Task> {
        return prisma.task.update({ where: { id }, data: { status } });
    }
}

export default TaskRepository;
