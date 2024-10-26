import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Todo } from '../todo/todo.model';

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  createdAt: Date;

  @Field(() => [Todo], { nullable: true })
  todos?: Todo[]; // 유저의 할 일 목록
}
