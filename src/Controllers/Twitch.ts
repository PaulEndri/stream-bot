import { Context } from 'koa';
import ITwitchStreamResponse from '../Interfaces/Twitch/StreamResponse';

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
		const { data } = ctx.body as ITwitchStreamResponse;

		if (data.length === 0) {
			ctx.status = 200;

			return;
		}
	}
}
