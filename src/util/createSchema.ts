import { buildSchema } from 'type-graphql';
import { ExerciseResolver } from '../resolvers/Exercise/Exercise.resolver';

export const createSchema = async () => {
    return buildSchema({
        resolvers: [ExerciseResolver],
        validate: false,
        dateScalarMode: 'isoDate',
    });
};
