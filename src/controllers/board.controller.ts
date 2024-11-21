import { Request, Response, NextFunction } from 'express';
import { BoardService } from '../services/board.service';
import { BoardRepository } from '../repositories/board.repository';
import { Board } from '@prisma/client';

const boardRepository = new BoardRepository();
const boardService = new BoardService(boardRepository);

export const getAllBoards = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const boardData = await boardService.getAllBoardData();
        res.status(200).json({ 
            message: 'All boards retrieved successfully',
            data: boardData 
        });
    } catch (error) {
        next(error);
    }
};

export const getBoardById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const boardId = req.params.boardId as string;
        const boardData = await boardService.getBoardData(boardId);

        if (!boardData) {
            res.status(404).json({ 
                message: 'Board not found', 
                data: null 
            });
        }

        res.status(200).json({ 
            message: 'Board retrieved successfully', 
            data: boardData,
        });
    } catch (error) {
        next(error);
    }
}

export const createBoard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const boardData:Board = req.body;
        const newBoard = await boardService.createBoard(boardData);

        res.status(201).json({
            message: 'Board created successfully',
            data: newBoard,
        });
    } catch (error) {
        next(error);
    }
}

export const updateBoard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let boardData = req.body as Board;
        boardData.id = req.params.boardId as string;
        const updatedBoard = await boardService.updateBoard(boardData);

        res.status(200).json({
            message: 'Board updated successfully',
            data: updatedBoard,
        });
    } catch (error) {
        next(error);
    }
}

export const deleteBoard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const boardId = req.params.boardId as string;
        await boardService.deleteBoard(boardId);

        res.status(200).json({
            message: 'Board deleted successfully',
        });
    } catch (error) {
        next(error);
    }
}
