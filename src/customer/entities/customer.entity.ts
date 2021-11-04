import {
  Column,
  Model,
  Table,
  HasMany,
  ForeignKey,
  DeletedAt,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

import { Invoice } from '../../invoice/entities/invoice.entity';
@Table
export class Customer extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id?: number;

  @Column
  name: string;
  @Column
  address: string;

  @Column
  email: string;

  @HasMany(() => Invoice, { sourceKey: 'id' })
  invoice: Invoice[];

  @DeletedAt
  @Column
  deletedAt: Date;
}
