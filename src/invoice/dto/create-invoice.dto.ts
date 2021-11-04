export class CreateInvoiceDto {
  customerId: number;
  discount: { type: string; value: number };
  items: [{ id: number; qty: number; price: number }];
}
