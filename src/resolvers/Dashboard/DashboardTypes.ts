import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Calory {
    @Field()
    date: string;
    @Field()
    calories: number;
}

@ObjectType()
export class Target {
    @Field()
    target: string;
    @Field()
    calories: number;
}