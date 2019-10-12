import Logs from '../../Database/Models/Logs';

export default class LogDataService {
	public static async SaveLog(data) {
		return await new Logs(data);
	}
}
