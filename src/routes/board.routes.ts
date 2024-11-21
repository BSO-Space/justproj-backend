import { Router } from 'express';
import { createBoard, getAllBoards, getBoardById, updateBoard, deleteBoard } from '../controllers/board.controller';

const boardRouter = Router();

boardRouter.get('/', getAllBoards);
boardRouter.get('/:boardId', getBoardById);
boardRouter.post('/', createBoard);
boardRouter.patch('/boardId', updateBoard);
boardRouter.delete('/:boardId', deleteBoard);

export default boardRouter;