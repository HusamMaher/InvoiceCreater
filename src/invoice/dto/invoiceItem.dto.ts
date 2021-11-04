import { Item } from 'src/items/entities/item.entity';

export class invoiceItemDTO {
  id: number;
  name: string;
  price: number;
  qty: number;
  totalUnitCount: number;
  constructor(item: Item) {
    this.id = item.id;
    this.name = item.name;
    this.price = item['InvoiceItem']?.price;
    this.qty = item['InvoiceItem']?.qty;
    this.totalUnitCount = item['InvoiceItem']?.totalUnitCount;
  }
}
