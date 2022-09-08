import { dateFormat } from "./dateFormat";

test("dateFromat returns date in the following format: year-monts-day when given a timestamp input", () => {
  expect(dateFormat("2022-09-06T14:04:15.075Z")).toBe("2022-09-06");
  expect(dateFormat("2019-07-23T15:04:15.075Z")).toBe("2019-07-23");
  expect(dateFormat("2023-09-01T14:04:15.075Z")).toBe("2023-09-01");
});
