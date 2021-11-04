import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { Invoice } from './entities/invoice.entity';
import { InvoiceItem } from '../invoice-item/entities/invoice-item.entity';
import { PDFGenerator } from '../service/pdfgenerator';
import { SequelizeModule } from '@nestjs/sequelize';
import { Customer } from '../customer/entities/customer.entity';
// import { MailService } from 'src/service/mail.service';
@Module({
  imports: [SequelizeModule.forFeature([Invoice, InvoiceItem, Customer])],
  controllers: [InvoiceController],
  providers: [InvoiceService, PDFGenerator], // MailService],
})
export class InvoiceModule {}
