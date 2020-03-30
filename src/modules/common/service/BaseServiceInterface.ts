import { NextFunction } from "express";
import { BaseEntity } from "../model/BaseEntity";


interface BaseServiceInterface<T extends BaseEntity> {
  getAll(next: NextFunction): Promise<Object[]>;
  getById(id: number, next: NextFunction, relations?: string[]): Promise<T>;
  save(entity: T, next: NextFunction): Promise<T>;
  delete(id: number, next: NextFunction): Promise<T>;
  softDelete(id: number, next: NextFunction): Promise<T>;
}

export default BaseServiceInterface;