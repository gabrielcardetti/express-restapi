import { NextFunction } from "express";
import { Repository, getRepository } from "typeorm";
import { HttpException } from "../mids/errorHandler";
import BaseServiceInterface from "./BaseServiceInterface";
import { BaseEntity } from "../model/BaseEntity";
import { classToPlain } from "class-transformer";


class BaseService<T extends BaseEntity> implements BaseServiceInterface<T> {
  protected repository: Repository<T>;

  constructor(model: any) {
    this.repository = getRepository(model);
  }

  public async getAll(next: NextFunction): Promise<Object[]> {
    let entities: T[];
    try {
      entities = await this.repository.find({ where: { deleted: 0 } });
    } catch (error) {
      next(new HttpException(404, ""));
      return;
    }
    let entitiesPlain: Object[] = [];
    for(const entity of entities){
      entitiesPlain.push(classToPlain(entity));
    }
    return entitiesPlain;
  }

  public async getById(id: number, next: NextFunction, relations?: string[]): Promise<T> {
    let t: T;
    try {
      if (relations)
        t = await this.repository.findOneOrFail(id, { relations, where: { deleted: 0 } });
      else
        t = await this.repository.findOneOrFail(id, { where: { deleted: 0 } });
    } catch (error) {
      next(new HttpException(404, ""));
    }
    return t;
  }

  public async getPlain(id: number, next: NextFunction, relations?: string[]): Promise<Object> {
    const t = await this.getById(id, next, relations);
    if(!t) return;
    return classToPlain(t);
  }

  public async save(entity: any, next: NextFunction): Promise<T> {
    let t: T;
    try {
      t = await this.repository.save(entity);
    } catch (error) {
      next(new HttpException(409, ""));
    }
    return t;
  }

  public async delete(id: number, next: NextFunction): Promise<T> {
    let deleteResult;
    try {
      deleteResult = await this.repository.delete(id);
    } catch (e) {
      next(new HttpException(404, "delete base probnlem"));
    }
    return deleteResult;
  }


  public async softDelete(id: number, next: NextFunction): Promise<T> {
    const t: T = await this.getById(id, next);
    if(!t) return;
    t.deleted = true;

    const deletedT: T = await this.save(t, next);
    return deletedT;
  }

}

export default BaseService;