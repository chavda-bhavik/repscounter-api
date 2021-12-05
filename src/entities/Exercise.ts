import { Field, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as Yup from 'yup';
import { Count } from './Count';

@ObjectType()
@Entity()
export class Exercise extends BaseEntity {
    static validations = Yup.object().shape({
        name: Yup.string().required().max(200),
        calories: Yup.number().required().min(1),
        target: Yup.string().optional().max(150),
    });

    @Field()
    @PrimaryGeneratedColumn()
    @Column(() => Number)
    id: number;

    @Field()
    @Column({ type: 'text' })
    name: string;

    @Field()
    @Column({ nullable: false })
    calories: number;

    @Field({ nullable: true })
    @Column({ type: 'text', nullable: true })
    target: string;

    @OneToMany(() => Count, (count) => count.exercise)
    counts: Count[];
}
