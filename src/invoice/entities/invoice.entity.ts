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
  BelongsToMany,
  AutoIncrement,
} from 'sequelize-typescript';
import { InvoiceItem } from '../../invoice-item/entities/invoice-item.entity';
import { Customer } from '../../customer/entities/customer.entity';
import { Item } from 'src/items/entities/item.entity';

@Table
export class Invoice extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id?: number;

  @Column
  total: number;

  @CreatedAt
  @Column
  created_at: Date;

  @UpdatedAt
  @Column
  updated_at: Date;

  @BelongsTo(() => Customer)
  customer: Customer;
  @ForeignKey(() => Customer)
  @Column({
    allowNull: false,
    validate: { notNull: { msg: 'customer' } },
  })
  customerId!: number;

  @BelongsToMany(() => Item, () => InvoiceItem)
  // items: Item[];
  items: Array<Item & { InvoiceItem: InvoiceItem }>;
  // @HasMany(() => InvoiceItem, { sourceKey: 'id' })
  // invoiceItem: InvoiceItem[];
}
