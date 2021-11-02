import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}

  async create(createItemDto: CreateItemDto) {
    const item = this.itemRepository.create(createItemDto);
    return await this.itemRepository.save(item);
  }

  findAll() {
    return this.itemRepository.find();
  }

  findOne(id: number) {
    return this.itemRepository.findOne({ id });
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    this.itemRepository.update({ id }, updateItemDto);
  }

  remove(id: number) {
    return this.itemRepository.softDelete(id);
  }
}
