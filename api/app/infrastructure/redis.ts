import redis from "redis";
import { promisify } from "util";

class Cache {
  private client: redis.RedisClient;
  private _getAsync: (key: string) => Promise<string | null>;
  private _setAsync: (
    key: string,
    value: any,
    mode: "EX",
    duration: number
  ) => Promise<"OK">;

  constructor(clientUrl?: string) {
    if (clientUrl) {
      this.client = redis.createClient({
        url: clientUrl,
      });
    } else {
      this.client = redis.createClient();
    }

    this._setAsync = promisify(this.client.set).bind(this.client) as any;
    this._getAsync = promisify(this.client.get).bind(this.client) as any;
  }

  async getAsync<T>(key: string) {
    const result = await this._getAsync(key);

    if (result) {
      return JSON.parse(result) as T;
    }

    return null;
  }

  async setAsync<T>(key: string, value: any, mode: "EX", duration: number) {
    this._setAsync(key, JSON.stringify(value), mode, duration);
  }
}

export default new Cache(process.env.REDISCLOUD_URL);
