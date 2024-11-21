import { Board, Column, Task } from '@prisma/client';

export interface BoardModel extends Board {
    columns: (Column & { tasks: Task[] })[];
}