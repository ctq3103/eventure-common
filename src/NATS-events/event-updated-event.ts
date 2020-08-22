import { Subjects } from './subjects';

export interface EventUpdatedEvent {
	subject: Subjects.EventUpdated;
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
