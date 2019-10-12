export const TWITCH = {
	GET_USER: 'https://api.twitch.tv/helix/users',
	GET_GAME: 'https://api.twitch.tv/helix/games',
	GET_STREAM: 'https://api.twitch.tv/helix/streams',
	SUBSCRIBE: 'https://api.twitch.tv/helix/webhooks/hub'
};

export const USERS = {
	PAUL_ENDRI: '180105971408830464',
	OWNER: process.env.GUILD_OWNER
};

export const GUILDS = {
	PROD: process.env.GUILD_ID,
	TEST: process.env.GUILD_TEST_ID
};
