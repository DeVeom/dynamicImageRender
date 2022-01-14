import { readFile } from "fs/promises";

export const readJsonData = async (filePath) => {
  let data = JSON.parse(await readFile(filePath, "utf8"));
  return data;
};
