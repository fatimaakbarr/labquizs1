import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuItem } from './menu-item.entity';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';

@Injectable()
export class MenuItemsService {
  constructor(
    @InjectRepository(MenuItem)
    private menuItemRepo: Repository<MenuItem>,
  ) {}

  findAll() {
    return this.menuItemRepo.find({ relations: ['restaurant'] });
  }

  async findOne(id: number) {
    const item = await this.menuItemRepo.findOne({ where: { id }, relations: ['restaurant'] });
    if (!item) throw new NotFoundException('Menu item not found');
    return item;
  }

  create(dto: CreateMenuItemDto) {
    return this.menuItemRepo.save(dto);
  }

  async update(id: number, dto: CreateMenuItemDto) {
    await this.findOne(id);
    await this.menuItemRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.menuItemRepo.delete(id);
    return { message: 'Menu item deleted' };
  }
}
