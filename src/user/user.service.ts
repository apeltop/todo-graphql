// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User, Todo } from '@prisma/client';
import { PrismaService } from '../todo/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create(createUserInput: CreateUserInput): Promise<User> {
    return this.prisma.user.create({
      data: createUserInput,
    });
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: { todos: true },
    });
  }

  findOne(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: { todos: true },
    });
  }
}
