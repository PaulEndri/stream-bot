import { Command } from 'aidyn';
import { Message } from 'discord.js';
import ConfigurationDataService from '../../Services/Data/Configuration';
import { USERS, GUILDS } from '../../constants';

interface ToggleStreamArgs {
	enabled: 'true' | 'false';
	channel: string;
}

export default class ToggleStream extends Command {
	static NAME = 'toggleStreams';
	static NAMESPACE = 'twitchStream';
	static USERS = [ USERS.PAUL_ENDRI ];
	public AllowedGuilds = [ GUILDS.TEST ];

	public Blurb = 'Toggle Twitch Streaming Functionality on Current Server';
	public Parametrized = true;
	public CooldownRate = 1000;
	public Arguments = [
		{ name: 'enabled', type: 'boolean', text: 'True or False to enable/disable' },
		{ name: 'channel', type: '#channel', text: 'Text Channel' }
	];

	public constructor(channels: string[], roles: string[], users: string[], dbRequired = false) {
		super(channels, roles, ToggleStream.USERS, dbRequired);

		console.log('[DROPPED] Users', ToggleStream.NAME, users);
	}

	public async Run(message: Message, args: ToggleStreamArgs) {
		const config = {
			GuildId: message.guild.id,
			Enabled: undefined,
			Channel: undefined
		};

		if (!args.enabled && !args.channel) {
			return message.channel.send('[ERROR] The --enabled or --channel flags must be passed');
		}

		if (args.enabled && [ 'true', 'false' ].indexOf(args.enabled.toLowerCase()) < 0) {
			return message.channel.send('[ERROR] --enabled accepts only true or false');
		} else if (args.enabled) {
			config.Enabled = args.enabled.toLowerCase() === 'true';
		}

		if (args.channel && !message.guild.channels.get(args.channel.replace(/\D/g, ''))) {
			return message.channel.send(
				'[ERROR] --channel must be passed a valid channel reference'
			);
		} else if (args.channel) {
			config.Channel = args.channel.replace(/\D/g, '');
		}

		try {
			await ConfigurationDataService.SaveConfiguration(config);
		} catch (e) {
			return message.channel.send(
				`[FAILURE] Configuration update failed with message: ${e.message}`
			);
		}

		return message.channel.send('[SUCCESS] Configuration Updated');
	}
}
