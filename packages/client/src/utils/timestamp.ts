const WEEK_MS = 1000 * 60 * 60 * 24 * 7;

export const isNew = (createdMS: number = WEEK_MS) => {
  const now = Date.now();
  const created = createdMS;
  return now - created < WEEK_MS;
};
