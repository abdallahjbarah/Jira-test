import timezone from "dayjs/plugin/timezone";
import { getUserSession } from "@utils/methods";
import dayjs from "dayjs";
import { DateTime, Settings } from "luxon";

dayjs.extend(timezone);

const userData = getUserSession();

dayjs.tz.setDefault(userData?.timezone || dayjs.tz.guess());

Settings.defaultZone = userData?.timezone;
DateTime.local().setZone(userData?.timezone);

// Intl.DateTimeFormat = Intl.DateTimeFormat(undefined, {
//   timeZone: userData?.timezone,
// });

const DayJSProvider = ({ children }) => {
  return children;
};

export default DayJSProvider;
