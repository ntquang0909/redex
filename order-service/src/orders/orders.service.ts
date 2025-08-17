import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
// import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, Product } from './entities/order.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly httpService: HttpService,
  ) {}

  async fetchProduct(productId: string): Promise<Product> {
    try {
      const response = await lastValueFrom(
        this.httpService.get<Product>(
          `http://localhost:3000/products/${productId}`,
        ),
      );
      return response.data;
    } catch {
      throw new InternalServerErrorException(
        `Failed to fetch product with ID ${productId}`,
      );
    }
  }

  async create(createOrderDto: CreateOrderDto) {
    try {
      const product = await this.fetchProduct(createOrderDto.productId);

      const order = this.orderRepository.create({
        product,
        quantity: createOrderDto.quantity,
      });
      return await this.orderRepository.save(order);
    } catch (error) {
      console.error('Error creating order:', error);
      throw new InternalServerErrorException('Failed to create order');
    }
  }

  async findAll() {
    try {
      return await this.orderRepository.find({});
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw new InternalServerErrorException('Failed to fetch orders');
    }
  }

  async findOne(id: string) {
    try {
      const order = await this.orderRepository.findOne({ where: { id } });

      if (!order) {
        throw new NotFoundException(`Order with ID "${id}" not found`);
      }

      return order;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch order');
    }
  }

  // update(id: number, updateOrderDto: UpdateOrderDto) {
  //   return `This action updates a #${id} order`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} order`;
  // }
}
