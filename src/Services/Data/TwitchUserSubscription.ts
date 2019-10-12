import TwitchUserSubscription from '../../Database/Models/TwitchUserSubscription';
import { ITwitchUser } from '../../Interfaces/Twitch/UserResponse';

export default class TwitchUserSubscriptionDataService {
	public static async Save(user: ITwitchUser, guildId: string) {
		const existingUser = await TwitchUserSubscription.findOne({ UserId: user.id });

		if (existingUser && existingUser.GuildId.indexOf(guildId) < 0) {
			existingUser.GuildId.push(guildId);

			return existingUser.save();
		} else if (existingUser) {
			return null;
		}

		const subscription = new TwitchUserSubscription({
			UserName: user.login,
			GuildId: [ guildId ],
			UserId: user.id
		});

		return await subscription.save();
	}

	public static async GetById(userId: string) {
		return await TwitchUserSubscription.findOne({ UserId: userId });
	}

	public static async Delete(name: string, guildId: string) {
		return await TwitchUserSubscription.deleteOne({ GuildId: guildId, UserName: name });
	}
}
