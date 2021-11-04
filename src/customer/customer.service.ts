import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer)
    private customer: typeof Customer,
  ) {}
  async create(createCustomerDto: CreateCustomerDto) {
    const newCustomer = this.customer.create(createCustomerDto);
    return (await newCustomer).save();
  }

  findAll() {
    return this.customer.findAll();
  }

  findOne(id: number) {
    return this.customer.findOne({ where: { id } });
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    this.customer.update(updateCustomerDto, { where: { id } });
  }

  remove(id: number) {
    return this.customer.destroy({ where: { id } });
  }
}
