import { Field, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import * as Yup from 'yup';
import { Exercise } from '.';

@ObjectType()
@Entity()
export class Count extends BaseEntity {
    static validations = Yup.object().shape({});

    @Field()
    @PrimaryGeneratedColumn()
    @Column(() => Number)
    id: number;

    @Field()
    @Column({ type: 'date', nullable: false })
    date: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    sets: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    reps: number;

    @ManyToOne(() => Exercise, (exe) => exe.counts)
    exercise: Partial<Exercise>;

    @Field()
    @Column()
    exerciseId: number;
}
