import {
  Column,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
  HasMany,
  Table,
  Model,
  ForeignKey,
  PrimaryKey,
  AutoIncrement,
  BelongsToMany,
} from 'sequelize-typescript';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { InvoiceItem } from '../../invoice-item/entities/invoice-item.entity';
@Table
export class Item extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id?: number;

  @Column
  name: string;

  @Column
  description: string;

  @Column
  price: number;

  @BelongsToMany(() => Invoice, () => InvoiceItem)
  invoices: Array<Invoice & { InvoiceItem: InvoiceItem }>;
}
