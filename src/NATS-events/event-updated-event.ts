import { Subjects } from './subjects';

export interface EventUpdatedEvent {
	subject: Subjects.EventUpdated;
	data: {
		id: string;
		title: string;
		datetime: Date;
		price: number;
		userId: string;
	};
}
