import {
    Column,
    Entity, JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {Carts} from "./cart";

@Entity()
export class CartItems {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Carts, cart => cart.items)
    @JoinColumn({ name: "carts_id" })
    cart: Carts;

    @Column('uuid')
    productId: string;

    @Column('int')
    count: number;
}