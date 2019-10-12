import ToggleStreams from './ToggleStreams';
import RegisterStreamer from './RegisterStreamer';

const TwitchStream = {
	[ToggleStreams.NAME]: ToggleStreams,
	[RegisterStreamer.NAME]: RegisterStreamer
};

export default TwitchStream;
