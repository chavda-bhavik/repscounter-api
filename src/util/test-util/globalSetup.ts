import { ConnectionOptions, getConnectionOptions, createConnection } from 'typeorm';
import { Exercise, Count } from '../../entities';

export default async () => {
    const options: ConnectionOptions = await getConnectionOptions('test');
    let conn = await createConnection({
        ...options,
        synchronize: true,
        dropSchema: true,
        name: 'test',
    });
    let qb = await conn.createQueryBuilder();
    await qb.insert().into(Exercise).values(exerciseData).execute();
    await qb.insert().into(Count).values(countsData).execute();
};

let exerciseData: Partial<Exercise>[] = [
    {
        name: 'Exercise 1',
        calories: 120,
        target: 'chest',
    },
    {
        name: 'Exercise 2',
        calories: 120,
        target: 'leg',
    },
];
let countsData: Partial<Count>[] = [
    {
        exerciseId: 1,
        date: new Date().toISOString(),
        sets: 10,
        reps: 10,
    },
    {
        exerciseId: 1,
        date: new Date().toISOString(),
        sets: 15,
        reps: 15,
    },
];
