import { Customer } from 'src/customer/entities/customer.entity';
import { Invoice } from '../entities/invoice.entity';
import { invoiceItemDTO } from './invoiceItem.dto';
export class invoiceDTO {
  id: number;
  total: number;
  customer: Customer;
  items: invoiceItemDTO[] = [];

  constructor(invoice: Invoice) {
    this.id = invoice.id;
    this.total = invoice.total;
    this.customer = invoice.customer;
    invoice.items.forEach((item) => {
      this.items.push(new invoiceItemDTO(item));
    });
  }
}
