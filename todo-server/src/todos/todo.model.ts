import { OmitType } from "@nestjs/mapped-types";
import { IsDate, IsDateString, IsEnum, IsNotEmpty, MaxLength, MinDate, MinLength } from "class-validator";
import { Table, Model, Column } from "sequelize-typescript";
import { IsMinDateString } from "../validator/is-min-date-string";


export enum TodoPriority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low'
}

export type TodoSortBy = 'priority' | 'dueDate' | 'createdAt';
export type TodoSortType = 'ASC' | 'DESC';

@Table
export class Todo extends Model {
  @Column
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  title: string;

  @Column
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  description: string;

  @Column
  @IsDateString({
    strict: true,
    strictSeparator: true
  })
  @IsMinDateString()
  dueDate: Date;

  @Column
  @IsEnum(TodoPriority)
  priority: TodoPriority;

  @Column
  createdAt: Date;
}

export class TodoCreateDto extends OmitType(Todo, ['createdAt', 'id'] as const) { };

export type TodoCreate = Omit<Todo, 'id'>;