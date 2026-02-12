import { Prisma, Task } from '@prisma/client';
import prisma from '../config/prisma-config';

class TaskRepository {
    create(taskData: Prisma.TaskCreateInput): Promise<Task> {
        return prisma.task.create({
            data: taskData,
        });
    }
}

export default TaskRepository;
