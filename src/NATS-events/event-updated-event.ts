import { Subjects } from './subjects';

export interface EventUpdatedEvent {
	subject: Subjects.EventUpdated;
	data: {
		id: string;
		name: string;
		userId: string;
	};
}