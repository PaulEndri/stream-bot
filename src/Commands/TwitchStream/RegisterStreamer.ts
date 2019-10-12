import { Command } from 'aidyn';
import { Message } from 'discord.js';
import TwitchApiService from '../../Services/Twitch/Api';
import ConfigurationDataService from '../../Services/Data/Configuration';

export default class RegisterStreamer extends Command {
	static NAME = 'RegisterStreamerStreamer';
	static NAMESPACE = 'twitchStream';
	static USERS = [ '108688397819707392' ];
	public AllowedGuilds = [ '276971523338928130' ];

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
			await twitchApi.SubscribeToStream(args.user);
		} catch (e) {
			return message.channel.send(`[ERROR] Unable to register streamer: ${e.message}`);
		}

		return message.channel.send('[SUCCESS] Streamer Succesfully Registered');
	}
}
