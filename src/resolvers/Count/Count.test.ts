import { Count } from '@/entities';
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

const getAllCountsQuery = `
    query Query($exerciseId: String) {
        counts(exerciseId: $exerciseId) {
            id
            date
            sets
            reps
            kg
        }
    }
`;
const getCountQuery = `
    query count($id: String!) {
        count(id: $id) {
            id
            date
            sets
            reps
            kg
        }
    }
`;
const addCountMutation = `
    mutation addCount($data: CountInput!) {
        addCount(data: $data) {
            errors {
                message
                field
            }
            entity {
                id
                date
                sets
                reps
                kg
            }
        }
    }
`;
const updateCountMutation = `
    mutation updateCount($data: CountInput!, $id: String!) {
        updateCount(data: $data, id: $id) {
            entity {
                date
                id
                reps
                sets
                kg
            }
            errors {
                field
                message
            }
        }
    }
`;
const deleteCountMutation = `
    mutation deleteCount($id: String!) {
        deleteCount(id: $id) {
            id
            date
            sets
            reps
            kg
        }
    }
`;

describe('count operations', () => {
    const countData: Partial<Count> = {
        date: new Date().toISOString(),
        sets: 1,
        reps: 1,
        kg: 1,
        id: "9c2e7c38-ab2e-4603-b7a1-0d6248fbbc05"
    };
    let countId: string;
    const updateCountData: Partial<Count> = {
        sets: 2,
        reps: 2,
        kg: 2,
    };

    it('should create new count', async () => {
        const response = await mutate(addCountMutation, {
            variables: {
                data: {
                    ...countData,
                    exerciseId: "31f117f9-1b12-4085-b3fb-d655f3f873d3",
                },
            },
        });
        // @ts-ignore
        expect(response.data?.addCount?.errors).toBeNull();
        // @ts-ignore
        expect(response.data?.addCount?.entity).toBeDefined();
        expect(response.data).toMatchObject({
            addCount: {
                entity: {
                    ...countData,
                },
            },
        });
        // @ts-ignore
        countId = response.data.addCount.entity.id;
    });

    it('should update count', async () => {
        const response = await mutate(updateCountMutation, {
            variables: {
                data: updateCountData,
                id: countId,
            },
        });
        expect(response.data).toMatchObject({
            updateCount: {
                entity: {
                    ...updateCountData,
                },
            },
        });
    });

    it('should get all counts', async () => {
        let response = await query(getAllCountsQuery);
        // @ts-ignore
        expect(response.data.counts.length).toBeGreaterThan(1);
    });

    it('should get all counts for exercise', async () => {
        let response = await query(getAllCountsQuery, {
            variables: {
                exerciseId: "31f117f9-1b12-4085-b3fb-d655f3f873d3",
            },
        });
        // @ts-ignore
        expect(response.data.counts.length).toBeGreaterThan(2); // two counts are added to globalSetup for exercise 1
    });

    it('should get single count', async () => {
        let response = await query(getCountQuery, {
            variables: {
                id: countId,
            },
        });
        // @ts-ignore
        expect(response.data.count).toBeDefined();
        expect(response.data).toMatchObject({
            count: {
                ...updateCountData,
            },
        });
    });

    it('should delete count', async () => {
        await mutate(deleteCountMutation, {
            variables: {
                id: countId,
            },
        });
        let response = await query(getCountQuery, {
            variables: {
                id: countId,
            },
        });
        expect(response.data).toBeNull();
        expect(response.errors!.length).toBeGreaterThan(0);
    });
});
