import { Subjects } from './subjects';

export interface EventUpdatedEvent {
	subject: Subjects.EventCreated;
	data: {
		id: string;
		name: string;
		userId: string;
	};
}
