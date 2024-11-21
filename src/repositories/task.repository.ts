
import prisma from "../config/prisma.config";
import { DatabaseError } from "../errors";
import { TaskModel } from "../models/task.model";
import { IRepository } from "./IRepository";

export class TaskRepository implements IRepository<TaskModel> {
    async findAll(): Promise<TaskModel[]> {
        try {
            return await prisma.task.findMany()
        } catch (error: Error | any) {
            throw new DatabaseError(error.message)
        }
    }

    async findById(id: string): Promise<TaskModel | null> {
        try {
            return await prisma.task.findUnique({
                where: {
                    id: id
                }
            })
        } catch (error: Error | any) {
            throw new DatabaseError(error.message)
        }
    }

    async create(data: Partial<TaskModel>): Promise<TaskModel> {
        try {
            return await prisma.task.create({
                data: {
                    name: data.name!,
                    columnId: data.columnId!,
                    assigneeId: data.assigneeId,
                    order: data.order!
                }
            })
        } catch (error: Error | any) {
            throw new DatabaseError(error.message)

        }
    }
    async update(id: string, data: Partial<TaskModel>): Promise<TaskModel | null> {
        try {
            return await prisma.task.update({
                where: {
                    id: id
                },
                data: {
                    name: data.name,
                    columnId: data.columnId,
                    assigneeId: data.assigneeId,
                    order: data.order,
                }
            })
        } catch (error: Error | any) {
            throw new DatabaseError(error.message)

        }
    }
    async delete(id: string): Promise<boolean> {
        try {
            return await prisma.task.delete({
                where: {
                    id: id
                }
            }).then(() => true).catch(() => false)
        } catch (error: Error | any) {
            throw new DatabaseError(error.message)
        }
    }

    async updateOrder(columnId: string, order: number, increment: boolean){
        try {
            await prisma.task.updateMany({
                where: {columnId, order: increment ? {gte: order} : {lte: order}},
                data: {order: increment ? {increment: 10} : {decrement: 10}}
            })
        } catch (error: Error | any) {
            throw new DatabaseError(error.message)
        }
    }

    async updateTask(taskId: string, data: Partial<TaskModel>) {
        try {
            await prisma.task.update({
                where: {id: taskId},
                data: data
            })
        } catch (error: Error | any) {
            throw new DatabaseError(error.message)
        }
    }

}