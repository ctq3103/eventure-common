import { Subjects } from './subjects';

export interface PaymentCreatedEvent {
	subject: Subjects.PaymentCreated;
	data: {
		id: string;
		eventId: string;
		orderId: string;
		stripeId: string;
	};
}
