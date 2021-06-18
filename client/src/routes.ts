const isProduction = process.env.NODE_ENV === "production";

const PRODUCTION_URL = isProduction
  ? "https://protected-lowlands-77940.herokuapp.com"
  : "";

export const COINS = `${PRODUCTION_URL}/api/v1/crypto`;
export const SEARCH = `${PRODUCTION_URL}/api/v1/search`;
