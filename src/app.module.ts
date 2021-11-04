import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ItemsModule } from './items/items.module';
import { InvoiceModule } from './invoice/invoice.module';
import { CustomerModule } from './customer/customer.module';
import { InvoiceItemModule } from './invoice-item/invoice-item.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SequelizeModule } from '@nestjs/sequelize';
@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '/public') }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      autoLoadModels: true,
      logging: false,
      // synchronize: true,
      retryAttempts: 1,
      models: [],
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
