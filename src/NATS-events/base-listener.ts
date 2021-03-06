import nats, { Message, Stan } from 'node-nats-streaming';
import { Subjects } from './subjects';

interface NatsEvent {
	subject: Subjects;
	data: any;
}

export abstract class Listener<T extends NatsEvent> {
	abstract subject: T['subject']; //name of the channel this Listener is going to listen to
	abstract queueGroupName: string;
	abstract onMessage(data: T['data'], msg: Message): void; //run when a message is received
	protected client: Stan; //pre-initialized NATS Client
	protected ackWait = 5 * 1000; //5 seconds - no of seconds this listener has to ack a message

	constructor(client: Stan) {
		this.client = client;
	}

	subscriptionOptions() {
		return this.client
			.subscriptionOptions()
			.setDeliverAllAvailable()
			.setManualAckMode(true)
			.setAckWait(this.ackWait)
			.setDurableName(this.queueGroupName);
	}

	listen() {
		//setup subscription
		//stan.subscribe(<channel name>, <queue group name>)
		const subscription = this.client.subscribe(
			this.subject,
			this.queueGroupName,
			this.subscriptionOptions()
		);

		subscription.on('message', (msg: Message) => {
			console.log(`Message received: ${this.subject} / ${this.queueGroupName}`);

			const parseData = this.parseMessage(msg);
			this.onMessage(parseData, msg);
		});
	}

	parseMessage(msg: Message) {
		const data = msg.getData();
		return typeof data === 'string'
			? JSON.parse(data)
			: JSON.parse(data.toString('utf8'));
	}
}
