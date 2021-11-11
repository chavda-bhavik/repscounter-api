import { Exercise } from '@/entities';
import { createTestClient, TestQuery } from 'apollo-server-integration-testing';
import { Connection } from 'typeorm';

import { createApolloServer, testConn } from '../../util/test-util';

let conn: Connection, mutate: TestQuery, query: TestQuery;
beforeAll(async () => {
    conn = await testConn();
    const apolloServer = await createApolloServer();
    let client = createTestClient({
        apolloServer,
    });
    mutate = client.mutate;
    query = client.query;
});
afterAll(async () => {
    await conn.close();
});

const getAllExercisesQuery = `
    query Query {
        exercies {
            calories
            name
            id
            target
        }
    }
`;
const getExerciseQuery = `
    query exercise($id: Int!) {
        exercise(id: $id) {
            id
            name
            calories
            target
        }
    }
`;
const createExerciseMutation = `
    mutation addExericise($data: AddExerciseType!) {
        addExercise(data: $data) {
            entity {
                calories
                id
                name
                target
            }
            errors {
                field
                message
            }
        }
    }
`;
const updateExerciseMutation = `
    mutation updateExercise($data: AddExerciseType!, $id: Int!) {
        updateExercise(data: $data, id: $id) {
            errors {
                field
                message
            }
            entity {
                id
                name
                calories
                target
            }
        }
    }
`;
const deleteExperienceMutation = `
    mutation DeleteExercise($id: Int!) {
        deleteExercise(id: $id) {
            id
            name
            calories
            target
        }
    }
`;

describe('exercise operations', () => {
    const exerciseData: Partial<Exercise> = {
        name: 'test exercise 1',
        calories: 100,
        target: 'test target 2',
    };
    let exerciseId: number;
    const updateExerciseData: Partial<Exercise> = {
        name: 'exercise update',
        calories: 200,
        target: 'target update',
    };

    it('should create new exercise', async () => {
        const response = await mutate(createExerciseMutation, {
            variables: {
                data: exerciseData,
            },
        });
        // @ts-ignore
        expect(response.data?.addExercise?.errors).toBeNull();
        // @ts-ignore
        expect(response.data.addExercise.entity).toBeDefined();
        // @ts-ignore
        exerciseId = response.data.addExercise.entity.id;
    });

    it('should update exercise', async () => {
        const response = await mutate(updateExerciseMutation, {
            variables: {
                data: updateExerciseData,
                id: Number(exerciseId),
            },
        });
        expect(response.data).toMatchObject({
            updateExercise: {
                entity: {
                    ...updateExerciseData,
                },
            },
        });
    });

    it('should get all exercises', async () => {
        let response = await query(getAllExercisesQuery);
        // @ts-ignore
        expect(response.data.exercies.length).toBeGreaterThan(1);
    });

    it('should get single exercise', async () => {
        let response = await query(getExerciseQuery, {
            variables: {
                id: Number(exerciseId),
            },
        });
        // @ts-ignore
        expect(response.data.exercise).toBeDefined();
        expect(response.data).toMatchObject({
            exercise: {
                ...updateExerciseData,
            },
        });
    });

    it('should delete exercise', async () => {
        await mutate(deleteExperienceMutation, {
            variables: {
                id: Number(exerciseId),
            },
        });
        let response = await query(getExerciseQuery, {
            variables: {
                id: Number(exerciseId),
            },
        });
        expect(response.data).toBeNull();
        expect(response.errors!.length).toBeGreaterThan(0);
    });
});