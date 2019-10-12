import { Document, Schema, Model, model } from 'mongoose';
import IConfiguration from '../../Interfaces/Database/IConfiguration';

const { Types } = Schema;

export interface IConfigurationModel extends IConfiguration, Document {}

export const ConfigurationSchema: Schema = new Schema({
	Channel: Types.String,
	Enabled: Types.Boolean,
	GuildId: Types.String
});

const Configuration: Model<IConfigurationModel> = model<IConfigurationModel>(
	'configuration',
	ConfigurationSchema
);

export default Configuration;
