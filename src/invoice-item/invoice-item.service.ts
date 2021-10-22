import { Injectable } from '@nestjs/common';
import { CreateInvoiceItemDto } from './dto/create-invoice-item.dto';
import { UpdateInvoiceItemDto } from './dto/update-invoice-item.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceItem } from './entities/invoice-item.entity';

@Injectable()
export class InvoiceItemService {
  constructor(
    @InjectRepository(InvoiceItem)
    private InvoiceItemRepository: Repository<InvoiceItem>,
  ) {}
  async create(createInvoiceItemDto: CreateInvoiceItemDto) {
    const item = this.InvoiceItemRepository.create(createInvoiceItemDto);
    return await this.InvoiceItemRepository.save(item);
  }

  findAll() {
    return this.InvoiceItemRepository.find();
  }

  findOne(id: number) {
    return this.InvoiceItemRepository.findOne({ id });
  }

  update(id: number, updateInvoiceItemDto: UpdateInvoiceItemDto) {
    this.InvoiceItemRepository.update({ id }, updateInvoiceItemDto);
  }

  remove(id: number) {
    return this.InvoiceItemRepository.delete({ id });
  }
}
