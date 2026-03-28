import { QueryFilter, UpdateQuery } from "mongoose";

export interface IBaseRepository<T> {
  create(data: Partial<T>): Promise<T>;
  insertMany(data: Partial<T[]>): Promise<T[]>;

  findById(id: string): Promise<T | null>;

  find(
    query?: QueryFilter<T>,
    limit?: number,
    sort?: Record<string, 1 | -1>,
  ): Promise<T[]>;

  findOne(
    query: QueryFilter<T>,
    sort?: Record<string, 1 | -1>,
  ): Promise<T | null>;

  update(id: string, data: UpdateQuery<T>): Promise<T | null>;

  deleteById(id: string): Promise<T | null>;
}
