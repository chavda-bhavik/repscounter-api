import { InputType, Field } from 'type-graphql';

@InputType()
export class CountInput {
    @Field({ nullable: true })
    exerciseId: number;

    @Field({ nullable: true })
    date: string;

    @Field({ nullable: true })
    reps: number;

    @Field({ nullable: true })
    sets: number;
}
