import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';
import { Invoice } from '../../invoice/entities/invoice.entity';
@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  address: string;
  @Column()
  email: string;
  @OneToMany(() => Invoice, (invoice) => invoice.customer)
  invoice: Invoice[];

  @DeleteDateColumn()
  deletedAt?: Date;
}
