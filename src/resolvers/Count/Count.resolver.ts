import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import {
    createEntity,
    findEntityOrThrow,
    getData,
    removeEntity,
    updateEntity,
} from '@/util/typeorm';
import { CountResponseType } from '../SharedTypes';
import { CountInput } from './CountTypes';
import { Count, Exercise } from '@/entities';

@Resolver(Count)
export class CountResolver {
    @FieldResolver(() => Exercise)
    exercise(@Root() count: Count): Promise<Exercise | undefined> {
        return findEntityOrThrow(Exercise, count.exerciseId);
    }

    @Mutation(() => CountResponseType)
    async addCount(@Arg('data') data: CountInput): Promise<CountResponseType> {
        if (data.exerciseId) await findEntityOrThrow(Exercise, data.exerciseId);
        let count = createEntity(Count, data);
        return count;
    }

    @Query(() => [Count])
    async counts(
        @Arg('exerciseId', () => String, { nullable: true }) exerciseId: string,
        @Arg('date', () => Date, { nullable: true }) date: Date,
    ): Promise<Count[]> {
        let where = {};
        if (exerciseId) where = { where: { exerciseId } };
        if (date) where = { where: { date } };
        let counts = await getData(Count, where);
        return counts;
    }

    @Query(() => Count)
    async count(@Arg('id', () => String) id: string): Promise<Count | undefined> {
        let count = await findEntityOrThrow(Count, id);
        return count;
    }

    @Mutation(() => CountResponseType)
    async updateCount(
        @Arg('id', () => String) id: string,
        @Arg('data') data: CountInput,
    ): Promise<CountResponseType> {
        if (data.exerciseId) await findEntityOrThrow(Exercise, data.exerciseId);
        return updateEntity(Count, id, data);
    }

    @Mutation(() => Count)
    async deleteCount(@Arg('id', () => String) id: string): Promise<Count | undefined> {
        return removeEntity(Count, id);
    }
}
