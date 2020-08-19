export enum OrderStatus {
	//When the order has been created
	Created = 'created',

	//When user has cancelled the order
	//The order expires before payment
	Cancelled = 'cancelled',

	//the order has successfully calculated the total price
	AwaitingPayment = 'awaiting:payment',

	//the user has provided payment successfully
	Complete = 'complete',
}
