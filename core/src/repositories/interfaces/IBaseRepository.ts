export interface IBaseRepository<T> {
  create(data: Partial<T>): Promise<T>;

  findById(id: string): Promise<T | null>;

  find(
    query?: Partial<T>,
    limit?: number,
    sort?: Record<string, 1 | -1>,
  ): Promise<T[]>;

  findOne(query: Partial<T>, sort?: Record<string, 1 | -1>): Promise<T | null>;

  update(id: string, data: Partial<T>): Promise<T | null>;

  deleteById(id: string): Promise<T | null>;
}
