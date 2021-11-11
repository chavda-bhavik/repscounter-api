import { buildSchema } from 'type-graphql';
import { ExerciseResolver } from '../resolvers/Exercise/Exercise.resolver';
import { CountResolver } from '../resolvers/Count/Count.resolver';

export const createSchema = async () => {
    return buildSchema({
        resolvers: [ExerciseResolver, CountResolver],
        validate: false,
        dateScalarMode: 'isoDate',
    });
};
