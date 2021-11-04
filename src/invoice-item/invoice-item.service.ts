import { Injectable } from '@nestjs/common';
import { CreateInvoiceItemDto } from './dto/create-invoice-item.dto';
import { UpdateInvoiceItemDto } from './dto/update-invoice-item.dto';
import { InjectModel } from '@nestjs/sequelize';
import { InvoiceItem } from './entities/invoice-item.entity';

@Injectable()
export class InvoiceItemService {
  constructor(
    @InjectModel(InvoiceItem)
    private invoiceItem: typeof InvoiceItem,
  ) {}
  async create(createInvoiceItemDto: CreateInvoiceItemDto) {
    const item = await this.invoiceItem.create(createInvoiceItemDto);
    return item.save();
  }

  findAll() {
    return this.invoiceItem.findAll();
  }

  findOne(id: number) {
    return this.invoiceItem.findOne({ where: { id } });
  }

  update(id: number, updateInvoiceItemDto: UpdateInvoiceItemDto) {
    this.invoiceItem.update(updateInvoiceItemDto, { where: { id } });
  }

  remove(id: number) {
    return this.invoiceItem.destroy({ where: { id } });
  }
}
