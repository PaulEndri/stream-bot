import TwitchController from '../Controllers/Twitch';
import UtilityController from '../Controllers/Utility';

export default [
	{
		route: 'twitch',
		method: 'GET',
		action: TwitchController.get
	},
	{
		route: 'twitch',
		method: 'POST',
		action: TwitchController.post
	},
	{
		route: 'ping',
		method: 'GET',
		action: UtilityController.ping
	}
];
