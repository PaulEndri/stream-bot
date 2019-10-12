import { TWITCH } from '../../constants';
import fetch from 'node-fetch';
import ITwitchUserResponse, { ITwitchUser } from '../../Interfaces/Twitch/UserResponse';
import ITwitchGameResponse, { ITwitchGame } from '../../Interfaces/Twitch/GameResponse';

interface TwitchApiHeaders {
	'Client-ID': string;
	'Content-Type': string;
}

export default class TwitchApiService {
	private headers: TwitchApiHeaders;

	constructor() {
		this.headers = {
			'Client-ID': process.env.TWITCH_CLIENT_ID,
			'Content-Type': 'application/json'
		};
	}

	public async GetGame(id: string): Promise<ITwitchGame> {
		const gameResponse = await fetch(`${TWITCH.GET_GAME}?id=${id}`);
		const { data } = (await gameResponse.json()) as ITwitchGameResponse;

		if (data.length > 1 || data.length === 0) {
			throw new Error('Multiple or No Games Found With Provided Name');
		}

		return data[0];
	}

	public async SubscribeToStream(userName: string): Promise<null> {
		const user = await this.GetUserData(userName);

		const subscriptionData = {
			'hub.callback': `http:${process.env.HOSTNAME}/api/twitch`,
			'hub.mode': 'subscribe',
			'hub.topic': `${TWITCH.GET_STREAM}?user_id${user.id}`,
			'hub.lease_seconds': 864000
		};

		const response = await fetch(TWITCH.SUBSCRIBE, {
			headers: this.headers,
			body: JSON.stringify(subscriptionData),
			method: 'POST'
		});

		await response;

		return;
	}

	private async GetUserData(userName: string): Promise<ITwitchUser> {
		const userResponse = await fetch(`${TWITCH.GET_USER}?login=${userName}`, {
			headers: this.headers
		});
		const { data } = (await userResponse.json()) as ITwitchUserResponse;

		if (data.length > 1 || data.length === 0) {
			throw new Error('Multiple or No Users Found With Provided Name');
		}

		return data[0];
	}
}
