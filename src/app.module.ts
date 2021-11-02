import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from './items/items.module';
import { InvoiceModule } from './invoice/invoice.module';
import { CustomerModule } from './customer/customer.module';
import { Item } from './items/entities/item.entity';
import { Invoice } from './invoice/entities/invoice.entity';
import { InvoiceItemModule } from './invoice-item/invoice-item.module';
import { Customer } from './customer/entities/customer.entity';
import { InvoiceItem } from './invoice-item/entities/invoice-item.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '/public') }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [Item, Invoice, Customer, InvoiceItem],
      synchronize: false,
      migrations: ['migration/*.js'],
      cli: {
        migrationsDir: 'migration',
      },
    }),
    ItemsModule,
    InvoiceModule,
    CustomerModule,
    InvoiceItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
