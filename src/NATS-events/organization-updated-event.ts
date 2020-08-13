import { Subjects } from './subjects';

export interface OrganizationUpdatedEvent {
	subject: Subjects.OrganizationUpdated;
	data: {
		id: string;
		name: string;
		userId: string;
	};
}
