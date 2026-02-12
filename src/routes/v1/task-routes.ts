import express, { Router } from 'express';
import validate from '../../middlewares/validate-middleware';
import verifyJwtToken from '../../middlewares/auth-middleware';
import {
    taskCreateSchema,
    taskIdParamSchema,
    taskStatusUpdateSchema,
} from '../../schemas/task-schema';
import {
    createTask,
    deleteTask,
    fetchAllTasks,
    fetchTaskById,
    updateTaskStatus,
} from '../../controllers/task-controller';

const router: Router = express.Router();

router.use(verifyJwtToken);

router.post('/', validate(taskCreateSchema), createTask);

router.patch(
    '/:id',
    validate(taskIdParamSchema, 'params'),
    validate(taskStatusUpdateSchema),
    updateTaskStatus,
);

router.get('/:id', validate(taskIdParamSchema, 'params'), fetchTaskById);

router.get('/', fetchAllTasks);

router.delete('/:id', validate(taskIdParamSchema, 'params'), deleteTask);

export default router;
