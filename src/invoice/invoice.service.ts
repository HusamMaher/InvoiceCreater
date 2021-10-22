import { Injectable } from '@nestjs/common';
// import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { InvoiceItem } from 'src/invoice-item/entities/invoice-item.entity';
import { Between } from 'typeorm';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private InvoiceRepository: Repository<Invoice>,
    @InjectRepository(InvoiceItem)
    private InvoiceItemRepository: Repository<InvoiceItem>,
  ) {}
  async create(items: [any], discount: { type: string; value: number }) {
    const invoice = this.InvoiceRepository.create();
    let invoiceItem;
    let totalPrice = 0;
    const invoiceItems = [];
    for (const element of items) {
      invoiceItem = this.InvoiceItemRepository.create();
      invoiceItem.item = element.item.id;
      invoiceItem.qty = element.qty;
      invoiceItem.unitPrice = element.item.price;
      if (discount.type === 'onItem') {
        invoiceItem.totalUnitPrice =
          element.item.price * element.qty * (discount.value / 100);
      } else {
        invoiceItem.totalUnitPrice = element.item.price * element.qty;
      }
      totalPrice += invoiceItem.totalUnitPrice;

      invoiceItem = await this.InvoiceItemRepository.save(invoiceItem);
      invoiceItems.push(invoiceItem);
    }

    if (discount.type === 'onTotal') {
      invoice.total = totalPrice - (discount.value / 100) * totalPrice;
    } else {
      invoice.total = totalPrice;
    }
    invoice.invoiceItem = invoiceItems;
    const newInv = await this.InvoiceRepository.save(invoice);
    return newInv;
  }

  findAll() {
    return this.InvoiceRepository.find({ relations: ['invoiceItem'] });
  }

  findOne(id: number) {
    return this.InvoiceRepository.findOne({ id });
  }
  //update on same table
  async update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    return await this.InvoiceRepository.update({ id }, updateInvoiceDto);
  }

  remove(id: number) {
    return this.InvoiceRepository.delete({ id });
  }
  //update on nested fields
  async updateInvoice(id, option) {
    const invoice = await this.InvoiceRepository.createQueryBuilder('invoice')
      .leftJoinAndSelect('invoice.invoiceItem', 'invoiceItem')
      .where('invoiceItem.id = :id', { id })
      .update(option);

    return invoice;
  }
  async getTotalPaymentByDate(dateFrom: Date, dateTo: Date) {
    const totals = await this.InvoiceRepository.find({
      select: ['total'],
      where: {
        created_at: Between(dateFrom, dateTo),
      },
    });
    return totals;
  }
}
