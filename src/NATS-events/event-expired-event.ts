import { Subjects } from './subjects';

export interface EventExpiredEvent {
	subject: Subjects.EventExpired;
	data: {
		eventId: string;
	};
}
