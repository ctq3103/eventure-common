import { Subjects } from './subjects';

export interface EventUpdatedEvent {
	subject: Subjects.OrganizationUpdated;
	data: {
		id: string;
		name: string;
		userId: string;
	};
}
