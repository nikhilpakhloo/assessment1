const { DateTime } = require("luxon");
import { formatToLocalTime } from "../Utils/Helpers";

describe("formatToLocalTime function", () => {
  test("formats Unix timestamp to local time correctly", () => {
    const timestamp = 1625894465;
    const offset = 10800;

    const expectedFormat = "cccc, dd LLL yyyy' | Local time: 'hh:mm a";

    const expectedLocalTime = DateTime.fromSeconds(timestamp + offset, {
      zone: "utc",
    }).toFormat(expectedFormat);

    const formattedTime = formatToLocalTime(timestamp, offset);
    console.log("Formatted Time:", formattedTime);
    console.log("Expected Local Time:", expectedLocalTime);

    expect(formattedTime).toBe(expectedLocalTime);
  });
});
