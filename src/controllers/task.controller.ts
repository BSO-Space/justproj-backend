import { Request, Response, NextFunction } from "express"
import { TaskRepository } from "../repositories/task.repository"
import { TaskService } from "../services/task.service";

const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);

export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tasks = await taskService.getAllTasks();
        res.status(200).json({
            message: "All tasks receipt successfully",
            data: tasks,
        });
    } catch (error) {
        next(error);
    }
}

export const getTaskById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { taskId } = req.params;
        const task = await taskService.getTaskById(taskId);

        res.status(200).json({
            message: "Task receipt successfully",
            data: task,
        })
    } catch (error) {
        next(error);
    }
}

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const task = await taskService.createTask(req.body);

        res.status(201).json({
            message: "Task created successfully",
            data: task,
        })
    } catch (error) {
        next(error);
    }
}

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const task = await taskService.updateTask(id, req.body);

        res.status(200).json({
            message: "Task updated successfully",
            data: task,
        })
    } catch (error) {
        next(error);
    }
}

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const task = await taskService.deleteTask(id);

        res.status(200).json({
            message: "Task deleted successfully",
            data: task,
        })
    } catch (error) {
        next(error);
    }
}

export const moveTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { taskId } = req.params;
        const { columnId , order} = req.body;
        const task = await taskService.updateTaskPosition(taskId, columnId, order);

        res.status(200).json({
            message: "Task moved successfully",
            data: task,
        })
    } catch (error) {
        next(error);
    }
}