import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql';
import {
    createEntity,
    findEntityOrThrow,
    getData,
    removeEntity,
    updateEntity,
} from '@/util/typeorm';
import { ExerciseResponseType } from '../SharedTypes';
import { AddExerciseType } from './ExerciseTypes';
import { Exercise } from '@/entities';

@Resolver(Exercise)
export class ExerciseResolver {
    @Mutation(() => ExerciseResponseType)
    async addExercise(@Arg('data') data: AddExerciseType): Promise<ExerciseResponseType> {
        let exercise = createEntity(Exercise, data);
        return exercise;
    }

    @Query(() => [Exercise])
    async exercies(): Promise<Exercise[]> {
        let exercises = await getData(Exercise);
        return exercises;
    }

    @Query(() => Exercise)
    async exercise(@Arg('id', () => Int) id: number): Promise<Exercise | undefined> {
        let exercise = await findEntityOrThrow(Exercise, id);
        return exercise;
    }

    @Mutation(() => ExerciseResponseType)
    async updateExercise(
        @Arg('id', () => Int) id: number,
        @Arg('data') data: AddExerciseType,
    ): Promise<ExerciseResponseType> {
        return updateEntity(Exercise, id, data);
    }

    @Mutation(() => Exercise)
    async deleteExercise(@Arg('id', () => Int) id: number): Promise<Exercise | undefined> {
        return removeEntity(Exercise, id);
    }
}
