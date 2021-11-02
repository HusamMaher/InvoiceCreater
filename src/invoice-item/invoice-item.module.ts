import { Module } from '@nestjs/common';
import { InvoiceItemService } from './invoice-item.service';
import { InvoiceItemController } from './invoice-item.controller';
import { InvoiceItem } from './entities/invoice-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [InvoiceItemController],
  providers: [InvoiceItemService],
  imports: [TypeOrmModule.forFeature([InvoiceItem])],
})
export class InvoiceItemModule {}
