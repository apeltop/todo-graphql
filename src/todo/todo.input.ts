import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateTodoInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => Int)
  userId: number;
}

@InputType()
export class UpdateTodoInput {
  @Field()
  id: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  isCompleted?: boolean;
}
