import { Task } from "@prisma/client";

type ColumnType = { name: string; items: Task[] | null };
export type ColumnsType = { [key: string]: ColumnType };