// src/todo/todo.resolver.ts
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';
import { CreateTodoInput, UpdateTodoInput } from './todo.input';

@Resolver()
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Mutation(() => Todo)
  createTodo(
    @Args('createTodoInput') createTodoInput: CreateTodoInput,
  ): Promise<Todo> {
    return this.todoService.create(createTodoInput);
  }

  @Query(() => [Todo], { name: 'todos' })
  findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Query(() => Todo, { name: 'todo' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Todo | null> {
    return this.todoService.findOne(id);
  }

  @Mutation(() => Todo)
  updateTodo(
    @Args('updateTodoInput') updateTodoInput: UpdateTodoInput,
  ): Promise<Todo> {
    return this.todoService.update(updateTodoInput.id, updateTodoInput);
  }

  @Mutation(() => Boolean)
  removeTodo(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    return this.todoService.remove(id);
  }
}
