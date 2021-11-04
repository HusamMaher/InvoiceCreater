import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { Item } from './entities/item.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [ItemsController],
  providers: [ItemsService],
  imports: [SequelizeModule.forFeature([Item])],
})
export class ItemsModule {}
