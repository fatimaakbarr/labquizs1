import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepo: Repository<Restaurant>,
  ) {}

  findAll() {
    return this.restaurantRepo.find({ relations: ['menuItems'] });
  }

  create(dto: CreateRestaurantDto) {
    return this.restaurantRepo.save(dto);
  }
}
