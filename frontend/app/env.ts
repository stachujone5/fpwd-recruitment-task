export function getEnv() {
  const url = process.env.EXCHANGE_API_URL;

  if (!url) {
    throw new Error("EXCHANGE_API_URL environment variable is not set!");
  }

  return { EXCHANGE_API_URL: url };
}
