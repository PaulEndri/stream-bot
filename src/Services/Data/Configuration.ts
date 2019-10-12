import Configuration from '../../Database/Models/Configuration';
import IConfiguration from '../../Interfaces/Database/IConfiguration';

export default class ConfigurationDataService {
	static async SaveConfiguration(config: IConfiguration) {
		const existingConfig = await Configuration.findOne({ GuildId: config.GuildId });

		if (existingConfig) {
			existingConfig.Enabled = config.Enabled !== undefined ? config.Enabled : config.Enabled;
			existingConfig.Channel = config.Channel || existingConfig.Channel;

			return await existingConfig.save();
		}

		return await new Configuration(config).save();
	}

	static async GetEnabledConfigurations(guild: string[]) {
		const configs = await Configuration.find({
			GuildId: { $in: guild },
			Enabled: true
		});

		return configs;
	}
}
