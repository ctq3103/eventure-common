import { Subjects } from './subjects';

export interface EventCreatedEvent {
	subject: Subjects.EventCreated;
	data: {
		id: string;
		title: string;
		description: string;
		address: string;
		datetime: Date;
		price: number;
		userId: string;
	};
}
