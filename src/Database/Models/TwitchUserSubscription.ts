import { Document, Schema, Model, model } from 'mongoose';
import ITwitchUserSubscription from '../../Interfaces/Database/ITwitchUserSubscription';

const { Types } = Schema;

export interface ITwitchUserSubscriptionModel extends ITwitchUserSubscription, Document {}

export const TwitchUserSubscriptionSchema: Schema = new Schema({
	Deleted: {
		type: Types.Boolean,
		default: false
	},
	Validated: {
		type: Types.Boolean,
		default: false
	},
	UserName: Types.String,
	GuildId: [ Types.String ],
	UserId: {
		type: Types.String,
		unique: true
	},
	CreatedAt: {
		type: Types.Date,
		default: new Date()
	},
	UpdatedAt: Types.Date
});

TwitchUserSubscriptionSchema.pre('save', (next) => {
	this.UpdatedAt = new Date();
	next();
});

const TwitchUserSubscription: Model<ITwitchUserSubscriptionModel> = model<
	ITwitchUserSubscriptionModel
>('twitchusersubscription', TwitchUserSubscriptionSchema);

export default TwitchUserSubscription;
