import { Context } from 'koa';
import Aidyn from 'aidyn';
import TwitchSubscriptionService from '../Services/Twitch/Subscription';

const AidynInjectorMiddleware = (aidyn: Aidyn) => async (ctx: Context, next: Function) => {
	ctx.aidynInstance = aidyn;
	ctx.subscriptionService = new TwitchSubscriptionService(aidyn);

	return next();
};

export default AidynInjectorMiddleware;
