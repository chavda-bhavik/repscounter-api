import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql';
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
    @Mutation(() => CountResponseType)
    async addCount(@Arg('data') data: CountInput): Promise<CountResponseType> {
        if (data.exerciseId) await findEntityOrThrow(Exercise, data.exerciseId);
        let count = createEntity(Count, data);
        return count;
    }

    @Query(() => [Count])
    async counts(@Arg('exerciseId', { nullable: true }) exerciseId: number): Promise<Count[]> {
        let where = {};
        if (exerciseId) where = { where: { exerciseId } };
        let counts = await getData(Count, where);
        return counts;
    }

    @Query(() => Count)
    async count(@Arg('id', () => Int) id: number): Promise<Count | undefined> {
        let count = await findEntityOrThrow(Count, id);
        return count;
    }

    @Mutation(() => CountResponseType)
    async updateCount(
        @Arg('id', () => Int) id: number,
        @Arg('data') data: CountInput,
    ): Promise<CountResponseType> {
        if (data.exerciseId) await findEntityOrThrow(Exercise, data.exerciseId);
        return updateEntity(Count, id, data);
    }

    @Mutation(() => Count)
    async deleteCount(@Arg('id', () => Int) id: number): Promise<Count | undefined> {
        return removeEntity(Count, id);
    }
}
