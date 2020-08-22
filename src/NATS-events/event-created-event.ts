import { Subjects } from './subjects';

export interface EventCreatedEvent {
	subject: Subjects.EventCreated;
	data: {
		id: string;
		title: string;
		address: string;
		datetime: string;
		price: number;
		userId: string;
		version: number;
	};
}
