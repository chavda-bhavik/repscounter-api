import { InputType, Field, Float } from 'type-graphql';

@InputType()
export class CountInput {
    @Field({ nullable: true })
    id: string;

    @Field({ nullable: true })
    exerciseId: string;

    @Field({ nullable: true })
    date: string;

    @Field({ nullable: true })
    reps: number;

    @Field({ nullable: true })
    sets: number;

    @Field(() => Float, { nullable: true })
    kg: number;
}
