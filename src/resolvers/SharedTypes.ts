import { User, Exercise, Count } from '@/entities';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class FieldError {
    @Field()
    field: string;
    @Field()
    message: string;
}

@ObjectType()
export class ResponseType {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => User, { nullable: true })
    entity?: User;
}

@ObjectType()
export class ExerciseResponseType {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => Exercise, { nullable: true })
    entity?: Exercise;
}

@ObjectType()
export class CountResponseType {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => Count, { nullable: true })
    entity?: Count;
}
