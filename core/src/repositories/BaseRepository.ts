import { Model } from "mongoose";
import { IBaseRepository } from "./interfaces/IBaseRepository.js";
import { QueryFilter,UpdateQuery } from "mongoose";
export abstract class BaseRepository<T> implements IBaseRepository<T> {
  constructor(protected model: Model<T>) {}

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async find(
    query: QueryFilter<T> = {},
    limit: number = 100,
    sort: Record<string, 1 | -1> = { createdAt: -1 },
  ): Promise<T[]> {
    return this.model.find(query).limit(limit).sort(sort).exec();
  }

  async insertMany(data:Partial<T[]>):Promise<T[]>{
    return this.model.insertMany(data)
  }

  async findOne(query: QueryFilter<T>): Promise<T | null> {
    return this.model.findOne(query).exec();
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async update(id: string, data: UpdateQuery<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async deleteById(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }
}
