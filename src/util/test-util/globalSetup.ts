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
        id: "31f117f9-1b12-4085-b3fb-d655f3f873d3"
    },
    {
        name: 'Exercise 2',
        calories: 120,
        target: 'leg',
        id: "1959618a-4ab6-4656-9b49-b7f484903d5f"
    },
];
let countsData: Partial<Count>[] = [
    {
        id: "fade224e-a860-44d4-a25d-b6c7d374d6a0",
        exerciseId: "31f117f9-1b12-4085-b3fb-d655f3f873d3",
        date: new Date().toISOString(),
        sets: 10,
        reps: 10,
    },
    {
        id: "d8dbf553-70f1-477c-a42d-6470f1e42415",
        exerciseId: "31f117f9-1b12-4085-b3fb-d655f3f873d3",
        date: new Date().toISOString(),
        sets: 15,
        reps: 15,
    },
];
