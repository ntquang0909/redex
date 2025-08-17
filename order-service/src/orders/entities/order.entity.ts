import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  DECLINED = 'DECLINED',
  CANCELLED = 'CANCELLED',
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @Column({ default: OrderStatus.PENDING })
  status: OrderStatus;

  @Column({ type: 'json' })
  product: Product;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
