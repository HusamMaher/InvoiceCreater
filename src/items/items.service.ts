import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item)
    private item: typeof Item,
  ) {}

  async create(createItemDto: CreateItemDto) {
    const item = await this.item.create(createItemDto);
    return item.save();
  }

  findAll() {
    return this.item.findAll();
  }

  findOne(id: number) {
    return this.item.findOne({ where: { id } });
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    this.item.update(updateItemDto, { where: { id } });
  }

  remove(id: number) {
    return this.item.destroy({ where: { id } });
  }
}
