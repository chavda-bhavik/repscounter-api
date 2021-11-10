import { InputType, Field } from 'type-graphql';

@InputType()
export class AddExerciseType {
    @Field({ nullable: true })
    name: string;

    @Field({ nullable: true })
    calories: number;

    @Field({ nullable: true })
    target: string;
}
