import { Injectable } from '@nestjs/common';
// import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { InvoiceItem } from '../invoice-item/entities/invoice-item.entity';
import { Between } from 'typeorm';
import { Customer } from '../customer/entities/customer.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Invoice)
    private InvoiceRepository: Repository<Invoice>,
    @InjectRepository(InvoiceItem)
    private InvoiceItemRepository: Repository<InvoiceItem>,
  ) {}
  async create(
    name: string,
    items: [any],
    discount: { type: string; value: number },
    customerId: string,
  ) {
    try {
      console.log('customer');
      const customer = await this.customerRepository.findOne({
        where: { id: customerId },
      });
      console.log(customer);

      const invoice = this.InvoiceRepository.create();
      invoice.name = name;
      invoice.customer = customer;
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
    } catch (error) {
      throw new Error(error);
    }
  }
  async findcustomerInvoices(customerId: number) {
    const customerInvoice = await this.InvoiceRepository.find({
      where: { customer: customerId },
    });
    return customerInvoice;
  }
  findAll() {
    return this.InvoiceRepository.find({
      relations: ['invoiceItem'],
      // withDeleted: true,
    });
  }

  findOne(id: number) {
    return this.InvoiceRepository.findOne(
      { id },
      { relations: ['invoiceItem', 'customer'] },
    );
  }
  //update on same table
  async update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    return await this.InvoiceRepository.update({ id }, updateInvoiceDto);
  }

  async remove(id: number) {
    return this.InvoiceRepository.softDelete(id);
  }
  getInvoiceById(id: string) {
    return this.InvoiceRepository.findOne(id, {
      relations: ['invoiceItem', 'customer'],
    });
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
