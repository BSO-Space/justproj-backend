import { Router } from 'express';
import { getTaskById, getTasks,createTask ,updateTask, deleteTask, moveTask } from '../controllers/task.controller';

const taskRouter = Router();

taskRouter.get('/', getTasks);
taskRouter.get('/:taskId', getTaskById);
taskRouter.post('/', createTask);
taskRouter.patch('/:taskId', updateTask);
taskRouter.delete('/:taskId', deleteTask);
taskRouter.patch('/:taskId/move', moveTask);

export default taskRouter;
