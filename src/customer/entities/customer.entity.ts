import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Invoice } from 'src/invoice/entities/invoice.entity';
@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  address: string;
  @OneToMany(() => Invoice, (invoice) => invoice.customer)
  invoice: Invoice[];
}
