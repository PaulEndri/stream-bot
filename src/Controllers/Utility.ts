import { Context } from 'koa';

export default class UtilityController {
	public static async ping(ctx: Context) {
		ctx.status = 200;
		ctx.body = 'OK';
	}
}
