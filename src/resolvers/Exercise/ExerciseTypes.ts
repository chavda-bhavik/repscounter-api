import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class AddExerciseType {
    @Field({ nullable: true })
    id: string;

    @Field({ nullable: true })
    name: string;

    @Field(() => Int, { nullable: true })
    calories: number;

    @Field({ nullable: true })
    target: string;
}
