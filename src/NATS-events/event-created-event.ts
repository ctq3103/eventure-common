import { Subjects } from './subjects';
import { TicketStatus } from './types/ticket-status';

export interface EventCreatedEvent {
	subject: Subjects.EventCreated;
	data: {
		id: string;
		title: string;
		address: string;
		datetime: string;
		price: number;
		status: TicketStatus;
		userId: string;
		organizationId: string;
		image?: {
			name: string;
			data: Buffer;
		};
		version: number;
	};
}
