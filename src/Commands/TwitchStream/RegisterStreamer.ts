import { Command } from 'aidyn';
import { Message } from 'discord.js';
import TwitchApiService from '../../Services/Twitch/Api';
import ConfigurationDataService from '../../Services/Data/Configuration';
import { USERS, GUILDS } from '../../constants';
import TwitchUserSubscriptionDataService from '../../Services/Data/TwitchUserSubscription';

export default class RegisterStreamer extends Command {
	static NAME = 'RegisterStreamer';
	static NAMESPACE = 'twitchStream';
	static USERS = [ USERS.PAUL_ENDRI ];
	public AllowedGuilds = [ GUILDS.TEST ];

	public Arguments = [ { name: 'user', type: 'twitch user id' } ];

	public Blurb = 'Add a new streamer';
	public Parametrized = true;
	public CooldownRate = 1000;

	public constructor(channels: string[], roles: string[], users: string[], dbRequired = false) {
		super(channels, roles, RegisterStreamer.USERS, dbRequired);

		console.log('[DROPPED] Users', RegisterStreamer.NAME, users);
	}

	public async Run(message: Message, args): Promise<any> {
		const configuration = await ConfigurationDataService.GetEnabledConfigurations([
			message.guild.id
		]);

		if (configuration.length === 0 || configuration[0].Enabled !== true) {
			return message.channel.send(
				'[WARNING] Server is not enabled, please use %help toggleStreams for more details'
			);
		}

		const twitchApi = new TwitchApiService();

		try {
			const user = await twitchApi.SubscribeToStream(args.user);
			await TwitchUserSubscriptionDataService.Save(user, message.guild.id);
		} catch (e) {
			return message.channel.send(`[ERROR] Unable to register streamer: ${e.message}`);
		}

		return message.channel.send('[SUCCESS] ');
	}
}
