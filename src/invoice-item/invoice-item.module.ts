import { Module } from '@nestjs/common';
import { InvoiceItemService } from './invoice-item.service';
import { InvoiceItemController } from './invoice-item.controller';
import { InvoiceItem } from './entities/invoice-item.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [InvoiceItemController],
  providers: [InvoiceItemService],
  imports: [SequelizeModule.forFeature([InvoiceItem])],
})
export class InvoiceItemModule {}
