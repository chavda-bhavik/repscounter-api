import { getConnection } from 'typeorm';
import { Arg, Query, Resolver } from 'type-graphql';

import { Count, Exercise } from '@/entities';
import { formatDateToString, groupBy } from '@/util/helper';
import { Calory, Target } from './DashboardTypes';

@Resolver()
export class DashboardResolver {
    @Query(() => [Calory])
    async calories(
        @Arg('dateStart') dateStart: Date,
        @Arg('dateEnd') dateEnd: Date,
    ): Promise<Calory[]> {
        let data = await getConnection()
            .createQueryBuilder(Count, 'count')
            .select("exercise.calories", "calories")
            .addSelect("count.date", "date")
            .addSelect("count.reps", "reps")
            .addSelect("count.sets", "sets")
            .addSelect("count.kg", "kg")
            .innerJoin(Exercise, "exercise", "count.exerciseId = exercise.id")
            .where('"count"."date" BETWEEN :startDate and :endDate', { startDate: dateStart, endDate: dateEnd })
            .orderBy("count.date", "ASC")
            .getRawMany();

        data = data.map(item => {
            return {
                date: formatDateToString(item.date),
                calories: (item.kg || item.sets || item.reps) ?
                    (((item.kg || 1) * item.calories) / 5) * (item.sets || 1) * (item.reps || 1)
                    : (item.calories),
            }
        });
        let grouppedData: any = groupBy(data, item => item.date);
        grouppedData = Object.keys(grouppedData).reduce((acc: Calory[], key) => {
            acc.push({
                date: key,
                calories: Math.round(grouppedData[key].reduce((acc: number, item: Calory) => acc + item.calories, 0)),
            });
            return acc;
        }, []);
        return grouppedData;
    }

    @Query(() => [Target])
    async targets(
        @Arg('dateStart') dateStart: Date,
        @Arg('dateEnd') dateEnd: Date,
    ): Promise<Target[]> {
        let data = await getConnection()
            .createQueryBuilder(Count, 'count')
            .select("exercise.calories", "calories")
            .addSelect("exercise.target", "target")
            .addSelect("count.reps", "reps")
            .addSelect("count.sets", "sets")
            .addSelect("count.kg", "kg")
            .innerJoin(Exercise, "exercise", "count.exerciseId = exercise.id")
            .where('"count"."date" BETWEEN :startDate and :endDate', { startDate: dateStart, endDate: dateEnd })
            .orderBy("count.date", "ASC")
            .getRawMany();

        data = data.map(item => {
            return {
                target: item.target,
                calories: (item.kg || item.sets || item.reps) ?
                    (((item.kg || 1) * item.calories) / 5) * (item.sets || 1) * (item.reps || 1)
                    : (item.calories),
            }
        });
        let grouppedData: any = groupBy(data, item => item.target);
        grouppedData = Object.keys(grouppedData).reduce((acc: Target[], key) => {
            acc.push({
                target: key,
                calories: Math.round(grouppedData[key].reduce((acc: number, item: Target) => acc + item.calories, 0)),
            });
            return acc;
        }, []);
        return grouppedData;
    }
}