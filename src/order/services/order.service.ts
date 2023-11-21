import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import { Orders } from 'src/database/entities';

@Injectable()
export class OrderService {
  private orders: Record<string, Orders> = {}

  constructor(
      @InjectRepository(Orders)
      private orderRepository: Repository<Orders>
  ) {}

  async createOrder(orderData: Partial<Orders>): Promise<Orders> {
    const order = this.orderRepository.create(orderData);
    return this.orderRepository.save(order);
  }

  findById(orderId: string): Orders {
    return this.orders[ orderId ];
  }

  update(orderId, data) {
    const order = this.findById(orderId);

    if (!order) {
      throw new Error('Orders does not exist.');
    }

    this.orders[ orderId ] = {
      ...data,
      id: orderId,
    }
  }
}
