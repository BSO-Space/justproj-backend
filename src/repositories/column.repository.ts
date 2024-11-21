import { ColumnModel } from "../models/column.model";
import { IRepository } from "./IRepository";
import prisma from "../config/prisma.config";
import { DatabaseError } from "../errors";


export class ColumnRepository implements IRepository<ColumnModel> {
    async findAll(): Promise<ColumnModel[]> {
        try {
            return await prisma.column.findMany({
                include: {
                    tasks: {
                        orderBy: {
                            order: 'asc'
                        }
                    }
                }
            });
        } catch (error: Error | any) {
            throw new DatabaseError(error.message)
        }

    }

    async findById(id: string): Promise<ColumnModel | null> {
        try {
            return await prisma.column.findUnique({
                where: {
                    id
                },
                include: {
                    tasks: {
                        orderBy: {
                            order: 'asc'
                        }
                    }
                }
            })
        } catch (error: Error | any) {
            throw new Error(error.message);
        }
    }

    async create(data: Partial<ColumnModel>): Promise<ColumnModel> {
        try {
            return await prisma.column.create({
                data: {
                    name: data.name!,
                    order: data.order!,
                    boardId: data.boardId!,
                }
            })
        } catch (error: Error | any) {
            throw new DatabaseError(error.message)
        }
    }

    async update(id: string, data: Partial<ColumnModel>): Promise<{ name: string; id: string; order: number; boardId: string; } | null> {
        try {
            return await prisma.column.update({
                where: {
                    id
                },
                data: {
                    name: data.name,
                    order: data.order,
                    boardId: data.boardId,
                }
            })
        } catch (error: Error | any) {
            throw new DatabaseError(error.message)
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            return await prisma.column.delete({
                where: {
                    id
                }
            }).then(() => true).catch(() => false)
        } catch (error: Error | any) {
            throw new DatabaseError(error.message)
        }
    }
}