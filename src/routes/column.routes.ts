import { Router } from 'express';
import { getAllColumns, getColumnById, createColumn , updateColumn, deleteColumn } from '../controllers/column.controller';

const columnRouter = Router();

columnRouter.get('/', getAllColumns);
columnRouter.get('/:columnId', getColumnById);
columnRouter.post('/', createColumn);
columnRouter.patch('/:columnId', updateColumn);
columnRouter.delete('/:columnId', deleteColumn);

export default columnRouter;
