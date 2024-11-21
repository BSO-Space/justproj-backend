import { DatabaseError } from "../errors";
import { ColumnRepository } from "../repositories/column.repository";
import { ColumnModel } from "../models/column.model";

export class ColumnService {
    constructor(private columnsRepository: ColumnRepository) { }

    async getAllColumns() {
        try {
            return this.columnsRepository.findAll();
        } catch (error: Error | any) {
            throw new DatabaseError(error.message);
        }
    }

    async getColumnById(id: string) {
        try {
            return this.columnsRepository.findById(id);
        } catch (error: Error | any) {
            throw new DatabaseError(error.message);
        }
    }

    async createColumn(column: ColumnModel) {
        try {
            return this.columnsRepository.create(column);
        } catch (error: Error | any) {
            throw new DatabaseError(error.message);
        }
    }

    async updateColumn(id: string, column: ColumnModel) {
        try {
            return this.columnsRepository.update(id, column);
        } catch (error: Error | any) {
            throw new DatabaseError(error.message);
        }
    }

    async deleteColumn(id: string) {
        try {
            return this.columnsRepository.delete(id);
        } catch (error: Error | any) {
            throw new DatabaseError(error.message);
        }
    }
}   