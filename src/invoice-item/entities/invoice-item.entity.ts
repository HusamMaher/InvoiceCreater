import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Invoice } from '../../invoice/entities/invoice.entity';
import { Item } from '../../items/entities/item.entity';

@Entity()
export class InvoiceItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  unitPrice: number;

  @Column()
  qty: number;
  @Column()
  totalUnitPrice: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Item, (item) => item.invoiceItem)
  item: Item;

  @ManyToOne(() => Invoice, (invoice) => invoice.invoiceItem)
  Invoice: Invoice;

  @DeleteDateColumn()
  deletedAt?: Date;
}
