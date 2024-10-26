// src/todo/todo.service.ts
import { Injectable } from '@nestjs/common';
import { Todo } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { CreateTodoInput, UpdateTodoInput } from './todo.input';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async create(createTodoInput: CreateTodoInput): Promise<Todo> {
    return this.prisma.todo.create({
      data: {
        ...createTodoInput,
        userId: createTodoInput.userId,
        // user: { connect: { id: createTodoInput.userId } },
      },
    });
  }

  async findAll(): Promise<Todo[]> {
    return this.prisma.todo.findMany();
  }

  async findOne(id: number): Promise<Todo | null> {
    return this.prisma.todo.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateTodoInput: UpdateTodoInput): Promise<Todo> {
    return this.prisma.todo.update({
      where: { id },
      data: updateTodoInput,
    });
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.prisma.todo.delete({
      where: { id },
    });
    return result ? true : false;
  }
}
