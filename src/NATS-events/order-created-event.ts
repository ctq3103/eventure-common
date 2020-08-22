import { Subjects } from './subjects';
import { OrderStatus } from './types/order-status';

export interface OrderCreatedEvent {
	subject: Subjects.OrderCreated;
	data: {
		id: string;
		status: OrderStatus;
		userId: string;
		totalPrice: number;
		expiresAt: string;
		version: number;
		event: {
			id: string;
			price: number;
		};
	};
}
