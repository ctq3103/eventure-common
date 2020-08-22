import { Subjects } from './subjects';

export interface OrganizationUpdatedEvent {
	subject: Subjects.OrganizationUpdated;
	data: {
		id: string;
		name: string;
		description: string;
		address: string;
		userId: string;
		version: number;
	};
}
