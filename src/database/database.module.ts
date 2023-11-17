import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategy';
import { Carts, CartItems, Orders, Product, User } from './entities';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: `${process.env.DB_HOST}`,
            port: +`${process.env.DB_PORT}`,
            username: `${process.env.DB_USERNAME}`,
            password: `${process.env.DB_PASSWORD}`,
            entities: [Carts, CartItems, Orders, Product, User],
            logging: true,
            namingStrategy: new SnakeNamingStrategy(),
            synchronize: false,
            ssl: {
                rejectUnauthorized: false,
            }
        }),
        TypeOrmModule.forFeature([Carts, CartItems, Orders, Product, User]),
    ],
    exports: [TypeOrmModule],
})
export class DatabaseModule {}