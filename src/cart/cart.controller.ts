import {
  Controller,
  Get,
  Body,
  HttpStatus, Param, Res, Post, Req,
} from '@nestjs/common';
import { CartService } from './services';
import { Response } from 'express';
import {OrderService} from "../order";

@Controller('api/profile/cart')
export class CartController {
  constructor(
      private cartsService: CartService,
      private orderService: OrderService,
  ) {}

  @Get(':userId')
  async findUserCart(@Param('userId') userId: string, @Res() response: Response) {
    const cart = await this.cartsService.findUserCart(userId);

    if (!cart) {
      return response.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Cart not found',
      });
    }

    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { cart, total: '23' },
    });
  }

  @Post('checkout/:userId')
  async checkout(@Param('userId') userId: string, @Body() body) {
    const cart = await this.cartsService.findUserCart(userId);

    if (!cart || !cart.items || cart.items.length === 0) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Cart is empty',
      };
    }

    const total = cart.items.reduce((acc, item) => acc + item.count, 0);

    const order = await this.orderService.createOrder({
      cart,
      userId,
      payment: JSON.stringify({ method: "credit_card" }),
      delivery: JSON.stringify({ method: "pick_up" }),
      comments: body.comments || '',
      status: 'OPEN',
      total
    });

    await this.cartsService.updateCartStatus(cart.id, 'ORDERED');

    return {
      statusCode: HttpStatus.OK,
      message: 'Checkout successful',
      data: { order },
    };
  }
}