import { z } from 'zod/v3';

export const taskCreateSchema = z.object({
    name: z.string().min(1, 'Task name is required'),
    description: z.string().min(1, 'Description is required'),
});
