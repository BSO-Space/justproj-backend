import { Board } from '@prisma/client';
import { BoardRepository } from '../repositories/board.repository';
import { DatabaseError, NotFoundError } from '../errors';
import { ColumnsType } from '../types/board.type';

export class BoardService {
    constructor(private boardRepository: BoardRepository) { }

    async getAllBoardData() {
        try {
            const boards = await this.boardRepository.findAll(); // TypeScript จะรู้จัก BoardWithRelations โดยตรง

            const boardData = boards.map((board) => {
                const columnsData: ColumnsType = {};

                board.columns.forEach((column) => {  // TypeScript รู้จัก columns และ tasks ที่ซ้อนกันอยู่
                    columnsData[column.id] = {
                        name: column.name,
                        items: column.tasks,
                    };
                });

                return {
                    id: board.id,
                    projectId: board.projectId,
                    ownerId: board.ownerId,
                    columns: columnsData,
                    length: board.columns.length,
                };
            });
            return boardData;
        } catch (error) {
            throw new DatabaseError('Error getting board data');
        }

    }

    async getBoardData(boardId: string) {
        try {
            const board = await this.boardRepository.findById(boardId,); // TypeScript จะรู้จัก BoardWithRelations โดยตรง

            if (!board) throw new NotFoundError('Board not found')

            const columnsData: ColumnsType = {};

            board!.columns.forEach((column) => {  // TypeScript รู้จัก columns และ tasks ที่ซ้อนกันอยู่
                columnsData[column.id] = {
                    name: column.name,
                    items: column.tasks,
                };
            });

            return {
                id: board!.id,
                projectId: board!.projectId,
                ownerId: board!.ownerId,
                columns: columnsData,
                length: board!.columns.length,
            };
        } catch (error) {
            throw new DatabaseError('Error getting board data');
        }

    }

    async createBoard(board: Board) {
        try {
            const boardData = await this.boardRepository.create(board);

            return {
                id: boardData.id,
                projectId: boardData.projectId,
                ownerId: boardData.ownerId,
                columns: {},
                length: 0,
            }
        } catch (error) {
            throw new DatabaseError('Error creating board');
        }
    }

    async updateBoard(board: Board) {
        try {
            await this.boardRepository.update(board.id, board);
        } catch (error) {
            throw new DatabaseError('Error updating board');
        }
    }

    async deleteBoard(boardId: string) {
        try {
            await this.boardRepository.delete(boardId);
        } catch (error) {
            throw new DatabaseError('Error deleting board');
        }
    }
}
