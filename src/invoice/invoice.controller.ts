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
  Inject,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { PDFGenerator } from '../service/pdfgenerator';
// import { MailService } from 'src/service/mail.service';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

import { IItem } from '../items/item.interface';
import { resolve } from 'path';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@Controller('invoice')
export class InvoiceController {
  constructor(
    private readonly invoiceService: InvoiceService,
    private pDFGenerator: PDFGenerator, // private mailService: MailService,
  ) {}

  @Get('genPDF/:id')
  async generatePDF(@Param('id') id: string) {
    const invoice = await this.invoiceService.getInvoiceById(id);

    const dir = resolve('..', '..', '/pdfCreated');

    const pdf = await this.pDFGenerator.createInvoice(invoice, dir);
    // const message = {
    //   from: 'onlinesuport.forsite@gmail.com',
    //   to: `${}`,
    //   subject: 'Message title',
    //   text: 'Plaintext version of the message',
    //   html: '<p>HTML version of the message</p>',
    // };
    // await this.mailService.sendMail();
    // return 'ji';
  }

  @Post()
  async create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return await this.invoiceService.create(createInvoiceDto);
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
  @Get('customerInvoices/:customerId')
  getAllCustromerInvoice(@Param('customerId') customerId: number) {
    return this.invoiceService.findcustomerInvoices(customerId);
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
