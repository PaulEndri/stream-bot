import Aidyn, { Commands } from 'aidyn';
import LocalCommands from './Commands';
import Koa from 'koa';
import KoaRouter from 'koa-better-router';
import Routes from './Routes';
import BodyParser from 'koa-body-parser';
import AidynInjectorMiddleware from './Middleware/AidynInjector';
import { USERS } from './constants';

const app = new Koa();
const Router = KoaRouter({ prefix: '/api' });

app.use(BodyParser());

Routes.forEach(({ method, route, action }) => {
	Router.addRoute(method, route, action);
});

const aidyn = new Aidyn({
	Logging: 1,
	ConnectionString: process.env.CONNECTION_STRING,
	BotToken: process.env.BOT_TOKEN,
	Owner: USERS.PAUL_ENDRI,
	Prefix: '%'
});

aidyn.Start({ ...Commands, ...LocalCommands }).then((aidynInstance) => {
	app.use(AidynInjectorMiddleware(aidynInstance));
	app.use(Router.middleware());

	app.listen(process.env.PORT, () => {
		console.log(`App succesfully started on port ${process.env.PORT}`);
	});
});
