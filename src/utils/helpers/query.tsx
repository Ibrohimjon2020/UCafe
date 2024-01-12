export const queryMaker = (query: string) =>
  Object.fromEntries(
    (query || "")
      .replace("?", "")
      .split("&")
      .map((el) => el.split("="))
  );

export const queryStringify = (query: object, changings = {}) => {
  const newQuery = { ...query, ...changings };
  return Object.entries(newQuery)
    .map((el) => el[0] && `${el[0]}=${el[1] ?? ""}`)
    .join("&");
};
