import { Context } from 'koa';
import Aidyn from 'aidyn';

const AidynInjectorMiddleware = (aidyn: Aidyn) => async (ctx: Context, next: Function) => {
	ctx.aidynInstance = aidyn;

	return next();
};

export default AidynInjectorMiddleware;
