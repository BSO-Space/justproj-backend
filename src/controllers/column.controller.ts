import { Request, Response, NextFunction } from "express"
import { ColumnRepository } from "../repositories/column.repository"
import { ColumnService } from "../services/column.service"
import { ColumnModel } from "../models/column.model"

const columnRepository = new ColumnRepository()
const columnService = new ColumnService(columnRepository)

export const getAllColumns = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const columns = await columnService.getAllColumns()
        res.status(200).json({
            message: "All columns receipt successfully",
            data: columns,
        })
    }
    catch (error) {
        next(error)
    }
}

export const getColumnById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const column = await columnService.getColumnById(id)
        res.status(200).json({
            message: "Column receipt successfully",
            data: column,
        })
    }
    catch (error) {
        next(error)
    }
}

export const createColumn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const columnData: ColumnModel = req.body
        const column = await columnService.createColumn(columnData)
        res.status(201).json({
            message: "Column created successfully",
            data: column,
        })
    }
    catch (error) {
        next(error)
    }
}

export const updateColumn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const columnData: ColumnModel = req.body
        const column = await columnService.updateColumn(id, columnData)
        res.status(200).json({
            message: "Column updated successfully",
            data: column,
        })
    }catch(error) {
        next(error)
    }
}

export const deleteColumn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const column = await columnService.deleteColumn(id)
        res.status(200).json({
            message: "Column deleted successfully",
            data: column,
        })
    }
    catch (error) {
        next(error)
    }
}