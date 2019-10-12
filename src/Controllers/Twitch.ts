import { Context } from 'koa';
import ITwitchStreamResponse from '../Interfaces/Twitch/StreamResponse';
import TwitchSubscriptionService from '../Services/Twitch/Subscription';

export default class TwitchController {
	/**
     * Will only ever get called from Twitch directly as a verification.
     * @param ctx Context
     */
	public static async get(ctx: Context) {
		const challenge = ctx.request.query['hub.challenge'];

		ctx.status = 200;
		ctx.body = challenge;
	}

	public static async post(ctx: Context) {
		const streamResponse = ctx.request.body as ITwitchStreamResponse;
		const service = ctx.subscriptionService as TwitchSubscriptionService;

		if (streamResponse.data.length !== 0) {
			try {
				await service.handleResponses(streamResponse);
			} catch (e) {
				console.error(e);
			}
		}

		ctx.status = 200;
		ctx.body = 'OK';
	}
}
