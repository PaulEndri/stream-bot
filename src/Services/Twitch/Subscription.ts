import { ITwitchStream } from '../../Interfaces/Twitch/StreamResponse';
import TwitchUserSubscriptionDataService from '../Data/TwitchUserSubscription';
import Aidyn from 'aidyn';
import ConfigurationDataService from '../Data/Configuration';
import { TextChannel, RichEmbed } from 'discord.js';
import TwitchApiService from './Api';
import { ITwitchGame } from '../../Interfaces/Twitch/GameResponse';
import LogDataService from '../Data/Log';

export default class TwitchSubscriptionService {
	private botInstance: Aidyn;
	private apiService: TwitchApiService;

	constructor(aidyn: Aidyn) {
		this.botInstance = aidyn;
		this.apiService = new TwitchApiService();
	}

	public async handleResponse(streamData: ITwitchStream) {
		const user = await TwitchUserSubscriptionDataService.GetById(streamData.user_id);
		const game = await this.apiService.GetGame(streamData.game_id);

		if (!user || !game) {
			return;
		}

		const configurations = await ConfigurationDataService.GetEnabledConfigurations(
			user.GuildId
		);

		const channels = configurations.map((config) => config.Channel);
		const embed = this.generateEmbed(streamData, game);

		return channels.map((channelId) => {
			const channel = this.botInstance.Context.Client.channels.get(channelId) as TextChannel;

			return channel.send(embed).catch((e) => {
				return LogDataService.SaveLog({
					User: 'Twitch',
					Channel: channelId,
					Command: `Automatic Channel Update for user ${streamData.user_name}`,
					Success: false,
					Response: e.message
				});
			});
		});
	}

	private generateEmbed(streamData: ITwitchStream, game: ITwitchGame) {
		const url = `https://www.twitch.tv/${streamData.user_name}`;

		const embed = new RichEmbed({
			title: streamData.title,
			url,
			description: `${streamData.user_name} just went live! Visit them over at ${url}`
		});

		embed.addField('Now Playing', game.name);

		return embed;
	}
}
