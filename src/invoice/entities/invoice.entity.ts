import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

import { InvoiceItem } from '../../invoice-item/entities/invoice-item.entity';
import { Customer } from '../../customer/entities/customer.entity';
@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  total: number;
  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Customer, (customer) => customer.invoice)
  customer: Customer;

  @OneToMany(() => InvoiceItem, (invoiceItem) => invoiceItem.Invoice, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  invoiceItem: InvoiceItem[];

  @DeleteDateColumn()
  deletedAt?: Date;
}
