export enum TicketStatus {
	//When the tickets are available
	Available = 'available',

	//When the tickets has been sold out (users have successfully created payments)
	SoldOut = 'soldout',

	//When event has ended
	EventEnded = 'event:ended',
}
