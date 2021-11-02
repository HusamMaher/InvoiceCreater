import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';
import { InvoiceItem } from '../../invoice-item/entities/invoice-item.entity';
@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @OneToMany(() => InvoiceItem, (invoiceItem) => invoiceItem.item)
  invoiceItem: InvoiceItem[];

  @DeleteDateColumn()
  deletedAt?: Date;
}
