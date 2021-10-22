import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
// import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Item } from 'src/items/entities/item.entity';
import { IItem } from 'src/items/item.interface';
import { get } from 'http';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  create(
    @Body('items')
    items: [
      {
        item: IItem;
        qty: number;
      },
    ],
    @Body('discount') discount: { type: string; value: number },
  ) {
    const invoice = this.invoiceService.create(items, discount);
    if (!invoice) return NotFoundException;
    return invoice;
  }
  @Get('test')
  updateInvoice(@Body() id: number, @Body() option: any) {
    return this.invoiceService.updateInvoice(id, option);
  }
  @Get('totalPayment')
  getTotalPaymentByDate(
    @Query('dateFrom') dateFrom: Date,
    @Query('dateTo') dateTo: Date,
  ) {
    return this.invoiceService.getTotalPaymentByDate(dateFrom, dateTo);
  }
  @Get()
  findAll() {
    return this.invoiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoiceService.update(+id, updateInvoiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoiceService.remove(+id);
  }
}
