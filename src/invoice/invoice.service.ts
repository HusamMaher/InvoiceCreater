import { Injectable } from '@nestjs/common';
// import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice } from './entities/invoice.entity';
import { InvoiceItem } from '../invoice-item/entities/invoice-item.entity';
import { Op } from 'sequelize';
import { Customer } from '../customer/entities/customer.entity';
import { Includeable } from 'sequelize/types/lib/model';
import { InjectModel } from '@nestjs/sequelize';
import { Item } from 'src/items/entities/item.entity';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { invoiceDTO } from './dto/invoice.dto';
import { Event } from 'src/service/eventEmmiter.service';
@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel(Customer)
    private customer: typeof Customer,
    @InjectModel(Invoice)
    private invoice: typeof Invoice,
    @InjectModel(InvoiceItem)
    private invoiceItem: typeof InvoiceItem,
  ) {}
  async create(createInvoiceDto: CreateInvoiceDto) {
    const invoice = await this.invoice.create(createInvoiceDto.customerId);

    const invoiceItem = new InvoiceItem();
    let totalPrice = 0;

    for (const element of createInvoiceDto.items) {
      invoiceItem.itemId = element.id;
      invoiceItem.qty = element.qty;
      invoiceItem.InvoiceId = invoice.id;
      invoiceItem.unitPrice = element.price;
      if (createInvoiceDto.discount.type === 'onItem') {
        invoiceItem.totalUnitPrice =
          element.price * element.qty * (createInvoiceDto.discount.value / 100);
      } else {
        invoiceItem.totalUnitPrice = element.price * element.qty;
      }
      totalPrice += invoiceItem.totalUnitPrice;

      await this.invoiceItem.create(invoiceItem.toJSON());
    }

    if (createInvoiceDto.discount.type === 'onTotal') {
      invoice.total =
        totalPrice - (createInvoiceDto.discount.value / 100) * totalPrice;
    } else {
      invoice.total = totalPrice;
    }

    await this.invoice.update(invoice.toJSON(), { where: { id: invoice.id } });
    const pdfEvent = new Event();

    const inv = await this.findOne(invoice.id);
    pdfEvent.emit('create', inv);
    return inv;
  }

  async findcustomerInvoices(customerId: number) {
    const customerInvoice = await this.invoice.findAll({
      where: { customer: customerId },
    });
    return customerInvoice;
  }
  getInclude(): Includeable[] {
    return [{ model: Customer }, { model: Item }];
  }
  async findAll() {
    const invoice = await this.invoice.findAll({
      include: this.getInclude(),
    });
    return invoice;
  }

  async findOne(id: number) {
    const invoice = await this.invoice.findOne({
      where: { id },
      include: this.getInclude(),
    });
    return new invoiceDTO(invoice);
  }
  //update on same table
  async update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    return await this.invoice.update(updateInvoiceDto, { where: { id } });
  }

  async remove(id: number) {
    return this.invoice.destroy({ where: { id } });
  }
  getInvoiceById(id: string) {
    return this.invoice.findOne({ where: { id }, include: this.getInclude() });
  }
  //update on nested fields
  async updateInvoice(id, option) {
    const invoice = await this.invoice.update(option, { where: { id } });

    return invoice;
  }
  async getTotalPaymentByDate(dateFrom: Date, dateTo: Date) {
    const totals = await this.invoice.findAll({
      attributes: ['total'],
      where: {
        created_at: { [Op.between]: [dateFrom, dateTo] },
      },
    });
    return totals;
  }
}
