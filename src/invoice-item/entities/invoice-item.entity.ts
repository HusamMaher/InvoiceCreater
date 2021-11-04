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
  DeletedAt,
} from 'sequelize-typescript';
import { Invoice } from '../../invoice/entities/invoice.entity';
import { Item } from '../../items/entities/item.entity';

@Table
export class InvoiceItem extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id?: number;

  @Column
  unitPrice: number;

  @Column
  qty: number;
  @Column
  totalUnitPrice: number;

  @CreatedAt
  @Column
  created_at: Date;

  @UpdatedAt
  @Column
  updated_at: Date;

  @ForeignKey(() => Item)
  @Column
  itemId!: number;

  @BelongsTo(() => Item)
  item: Item;

  @ForeignKey(() => Invoice)
  @Column
  InvoiceId!: number;

  @BelongsTo(() => Invoice)
  Invoice: Invoice;

  @DeletedAt
  @Column
  deletedAt: Date;
}
