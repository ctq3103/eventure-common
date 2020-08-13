import { Subjects } from './subjects';

export interface EventCreatedEvent {
	subject: Subjects.OrganizationCreated;
	data: {
		id: string;
		name: string;
		description: string;
		address: string;
		userId: string;
	};
}
