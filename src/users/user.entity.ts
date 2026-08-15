import { Report } from '../reports/report.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  name!: string;

  @Column({ default: true })
  admin!: boolean;

  @OneToMany(() => Report, (report) => report.user)
  reports!: Report[];
}
