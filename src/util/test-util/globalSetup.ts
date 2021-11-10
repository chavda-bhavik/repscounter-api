import { ConnectionOptions, getConnectionOptions, createConnection } from 'typeorm';
import { Exercise } from '../../entities';

export default async () => {
    const options: ConnectionOptions = await getConnectionOptions('test');
    let conn = await createConnection({
        ...options,
        synchronize: true,
        dropSchema: true,
        name: 'test',
    });
    let qb = await conn.createQueryBuilder();
    await qb.insert().into(Exercise).values(teacherData).execute();
};

let teacherData: Partial<Exercise>[] = [
    {
        name: 'Exercise 1',
        calories: 120,
        target: 'chest',
    },
];
