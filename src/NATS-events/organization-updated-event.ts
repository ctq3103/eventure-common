import { Subjects } from './subjects';

export interface OrganizationUpdatedEvent {
	subject: Subjects.OrganizationUpdated;
	data: {
		id: string;
		name: string;
		description: string;
		address: string;
		userId: string;
		image?: {
			name: string;
			data: Buffer;
		};
		version: number;
	};
}
