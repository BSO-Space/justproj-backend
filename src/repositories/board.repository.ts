import { Board } from '@prisma/client';
import prisma from '../config/prisma.config';
// import { BoardWithRelations } from '../interfaces/board.interface';
import { BoardModel } from '../models/board.model';
import { DatabaseError } from '../errors';
import { IRepository } from './IRepository';

export class BoardRepository implements IRepository<Board> {
    async findAll(): Promise<BoardModel[]> {
        try {
            return await prisma.board.findMany({
                include: {
                    columns: {
                        orderBy: { order: "asc" },
                        include: {
                            tasks: {
                                orderBy: { order: "asc" },
                            },
                        },
                    },
                },
            });
        } catch (error: Error | any) {
            throw new DatabaseError('Failed to get all boards');
        }
    }

    async findById(id: string): Promise<BoardModel | null> {
        try {
            return await prisma.board.findUnique({
                where: { id },
                include: {
                    columns: {
                        orderBy: { order: "asc" },
                        include: {
                            tasks: {
                                orderBy: { order: "asc" },
                            },
                        },
                    },
                },
            });
        } catch (error: Error | any) {
            throw new DatabaseError('Failed to get board by id');
        }
    }

    async create(board: Board): Promise<Board> {
        try {
            return await prisma.board.create({
                data: {
                    projectId: board.projectId,
                    ownerId: board.ownerId,
                },
            });
        } catch (error: Error | any) {
            throw new DatabaseError('Failed to create board');
        }

    }

    async update(id: string, data: Partial<Board>): Promise<{ id: string; projectId: string; ownerId: string; } | null> {
        try {
            return await prisma.board.update({
                where: { id },
                data: {
                    projectId: data.projectId,
                },
            });
        } catch (error: Error | any) {
            throw new DatabaseError('Failed to create board');
        }

    }
    
    async delete(id: string): Promise<boolean> {
        try {
            return await prisma.board.delete({
                where: { id },
            }).then(() => true).catch(() => false);
        } catch (error: Error | any) {
            throw new DatabaseError('Failed to delete board');
            
        }
    }
}
