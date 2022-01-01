import { Field, Float, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import * as Yup from 'yup';
import { Exercise } from '.';

@ObjectType()
@Entity()
export class Count extends BaseEntity {
    static validations = Yup.object().shape({});

    @Field()
    @PrimaryColumn("uuid")
    id: string;

    @Field()
    @Column({ type: 'date', nullable: false })
    date: string;

    @Field(() => Float, { nullable: true })
    @Column({ type: 'float', nullable: true })
    kg: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    sets: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    reps: number;

    @ManyToOne(() => Exercise, (exe) => exe.counts, {
        onDelete: 'CASCADE',
    })
    exercise: Partial<Exercise>;

    @Field()
    @Column()
    exerciseId: string;
}
