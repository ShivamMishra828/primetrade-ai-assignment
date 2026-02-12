import express, { Router } from 'express';
import validate from '../../middlewares/validate-middleware';
import verifyJwtToken from '../../middlewares/auth-middleware';
import { taskCreateSchema } from '../../schemas/task-schema';
import { createTask } from '../../controllers/task-controller';

const router: Router = express.Router();

router.use(verifyJwtToken);

router.post('/', validate(taskCreateSchema), createTask);

export default router;
