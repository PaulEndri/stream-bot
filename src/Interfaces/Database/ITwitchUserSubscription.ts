export default interface ITwitchUserSubscription {
	Deleted: boolean;
	Validated: boolean;
	UserName: string;
	GuildId: string[];
	UserId: string;
};
