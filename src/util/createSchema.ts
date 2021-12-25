import { buildSchema } from 'type-graphql';
import { ExerciseResolver } from '../resolvers/Exercise/Exercise.resolver';
import { CountResolver } from '../resolvers/Count/Count.resolver';
import { DashboardResolver } from '@/resolvers/Dashboard/Dashboard.resolver';

export const createSchema = async () => {
    return buildSchema({
        resolvers: [ExerciseResolver, CountResolver, DashboardResolver],
        validate: false,
        dateScalarMode: 'isoDate',
    });
};
