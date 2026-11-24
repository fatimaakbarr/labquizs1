import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { MenuItemsModule } from './menu-items/menu-items.module';
import { LoggerMiddleware } from './common/logger.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'fooddb',
      autoLoadEntities: true,
      synchronize: true, // creates tables automatically
    }),
    RestaurantsModule,
    MenuItemsModule,
  ],
})
export class AppModule implements NestModule {
  // apply logger middleware to menu item routes
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('menu-items');
  }
}
