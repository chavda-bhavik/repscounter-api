import { Field, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import * as Yup from 'yup';
import { Exercise } from '.';

@ObjectType()
@Entity()
export class Count extends BaseEntity {
    static validations = Yup.object().shape({
        sets: Yup.number().required().min(1),
        reps: Yup.number().required().min(1),
    });

    @Field()
    @PrimaryGeneratedColumn()
    @Column(() => Number)
    id: number;

    @Field()
    @Column({ type: 'date', nullable: false })
    date: string;

    @Field()
    @Column({ nullable: false })
    sets: number;

    @Field()
    @Column({ nullable: false })
    reps: number;

    @ManyToOne(() => Exercise, (exe) => exe.counts)
    exercise: Partial<Exercise>;

    @Column()
    exerciseId: number;
}
