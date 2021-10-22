import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Customer } from 'src/customer/entities/customer.entity';
import { InvoiceItem } from 'src/invoice-item/entities/invoice-item.entity';
@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  total: number;

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
}
