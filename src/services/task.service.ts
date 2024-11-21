import { DatabaseError } from "../errors";
import { TaskModel } from "../models/task.model";
import { TaskRepository } from "../repositories/task.repository";

export class TaskService {
    constructor(private taskRepository: TaskRepository) { }

    async getAllTasks() {
        try {
            return await this.taskRepository.findAll();
        } catch (error: Error | any) {
            throw new DatabaseError(error.message)
        }
    }

    async getTaskById(id: string) {
        try {
            return await this.taskRepository.findById(id);
        } catch (error: Error | any) {
            throw new DatabaseError(error.message)
        }
    }

    async createTask(task: TaskModel) {
        try {
            return await this.taskRepository.create(task);
        } catch (error: Error | any) {
            throw new DatabaseError(error.message)
        }
    }

    async updateTask(id: string, task: TaskModel) {
        try {
            return await this.taskRepository.update(id, task);
        } catch (error: Error | any) {
            throw new DatabaseError(error.message)
        }
    }

    async deleteTask(id: string) {
        try {
            return await this.taskRepository.delete(id);
        } catch (error: Error | any) {
            throw new DatabaseError(error.message)
        }
    }
    
    async updateTaskPosition(taskId: string, columnId: string, order: number) {
        const task = await this.taskRepository.findById(taskId);
                
        if (!task) throw new Error("Task not found");

        const newOrder = order * 10;

        if (task.columnId !== columnId) {
            await this.taskRepository.updateOrder(columnId, newOrder, true); // true = increment
            await this.taskRepository.updateTask(taskId, { columnId, order: newOrder });
            await this.reorderTasksInColumn(task.columnId, task.order);
        } else {
            if (newOrder > task.order) {
                await this.taskRepository.updateOrder(columnId, newOrder, false);
            } else if (newOrder < task.order) {
                await this.taskRepository.updateOrder(columnId, newOrder, true);
            }
            await this.taskRepository.updateTask(taskId, { order: newOrder });
        }
    }

    async reorderTasksInColumn(columnId: string, order: number) {
        await this.taskRepository.updateOrder(columnId, order, false); // false = decrement
    }
}