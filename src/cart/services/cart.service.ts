import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Carts } from 'src/database/entities';

@Injectable()
export class CartService {
  constructor(
      @InjectRepository(Carts)
      private cartRepository: Repository<Carts>,
  ) {}

  async findUserCart(userId: string): Promise<Carts | undefined> {
    return this.cartRepository.findOne({
      where: { userId },
      relations: ['items']
    });
  }

  async updateCartStatus(cartId: string, status: string): Promise<void> {
    await this.cartRepository.update(cartId, { status });
  }

  async deleteCart(cartId: string): Promise<void> {
    await this.cartRepository.delete(cartId);
  }
}