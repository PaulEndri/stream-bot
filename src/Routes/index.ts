import TwitchController from '../Controllers/Twitch';

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
	}
];
