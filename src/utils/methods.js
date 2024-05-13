import {
  MAX_SIZE_IMAGE,
  MAX_SIZE_VIDEO,
  USERS_ACCEPT_IMAGES_TYPES,
  USERS_ACCEPT_VIDEO_TYPES,
  USER_DETAILS,
} from "./constants";

const dayjs = require("dayjs");

const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");

dayjs.extend(utc);
dayjs.extend(timezone);

export const customTimeStampToDate = (date, format) =>
  dayjs(date).format(format);

export const customDateToTimeStamp = (dateString, dateFormat) =>
  dayjs(dateString, { format: dateFormat }).valueOf();

export const customConvertTime24HoursTo12 = (stringTime24) => {
  try {
    // Check correct time format and split into components
    stringTime24 = stringTime24
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [stringTime24];

    if (stringTime24.length > 1) {
      // If time format correct
      stringTime24 = stringTime24.slice(1); // Remove full string match value
      stringTime24[5] = +stringTime24[0] < 12 ? "AM" : "PM"; // Set AM/PM
      stringTime24[0] = +stringTime24[0] % 12 || 12; // Adjust hours
    }
    return stringTime24.join(""); // return adjusted time or original string
  } catch (error) {
    return "";
  }
};

// https://day.js.org/docs/en/manipulate/add
export const addToObjectDate = (objectDate, unit, number) => {
  const Date = dayjs(objectDate);
  const result = Date.add(number, unit);
  return result.$d;
};

export function capitalizeFirstLetterOfEachWord(input) {
  try {
    return input?.replace(/\b\w/g, (match) => match.toUpperCase());
  } catch (error) {
    return "";
  }
}
export function convertTimezoneToOffset(timezoneName) {
  const now = dayjs();
  const offset = now.tz(timezoneName).utcOffset();
  const offsetHours = Math.floor(Math.abs(offset) / 60);
  const offsetMinutes = Math.abs(offset) % 60;

  const sign = offset >= 0 ? "+" : "-";
  const formattedOffset = `${sign}${offsetHours
    .toString()
    .padStart(2, "0")}:${offsetMinutes.toString().padStart(2, "0")}`;

  return `GMT${formattedOffset}`;
}

export function timeToMilliseconds(time) {
  const [hours, minutes] = time.split(":");
  const totalMilliseconds =
    (parseInt(hours, 10) * 60 + parseInt(minutes, 10)) * 60 * 1000;
  return totalMilliseconds;
}
export function measurePasswordStrength(password) {
  const commonPatterns = [
    "password",
    "123456",
    "qwerty",
    "admin",
    "letmein",
    "welcome",
    "password123",
    "iloveyou",
    "football",
    "abc123",
    "monkey",
    "123123",
    "sunshine",
    "1234",
    "superman",
    "batman",
    "shadow",
    "dragon",
    "mustang",
    "trustno1",
    "access",
    "master",
    "killer",
    "123qwe",
    "qwertyuiop",
    "login",
    "solo",
    "passw0rd",
    "starwars",
    "michael",
    "bailey",
    "12345",
    "p@ssw0rd",
    "welcome1",
    "123abc",
    "baseball",
    "thomas",
    "summer",
    "iloveyou1",
    "ashley",
    "buster",
    "harley",
    "rocky",
    "charlie",
    "pepper",
    "george",
    "maggie",
    "jordan",
    "1qaz2wsx",
    "abcdef",
    "000000",
    "qazwsx",
    "password1",
    "trustme",
  ];

  if (password.length < 8) {
    return {
      score: 1,
      description: "Weak",
      suggestions: "Weak password. Must contain at least 8 characters.",
    };
  }

  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSymbols = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password);
  const containsSpaces = /\s/.test(password);

  if (containsSpaces) {
    return {
      score: 1,
      description: "Weak",
      suggestions: "The password must not contain spaces.",
    };
  }

  const characterTypes = [hasLowerCase, hasUpperCase, hasNumbers, hasSymbols];
  const numCharacterTypes = characterTypes.filter(Boolean).length;

  if (numCharacterTypes <= 3) {
    return {
      score: 2,
      description: "Moderate",
      suggestions:
        "Not a very strong password. Must contain at least 1 letter.",
    };
  }

  return {
    score: 3,
    description: "Strong",
    suggestions: "Great! You have a strange password.",
  };
}

export function getRandomNumber(min = 1, max = 1000) {
  return Math.random() * (max - min) + min;
}

export function isTimestamp(value) {
  const timestamp = Date.parse(value);
  return !isNaN(timestamp);
}

export const calculateAgeFromTimestamp = (timestamp) => {
  try {
    const age =
      Number(new Date().getFullYear()) -
      Number(customTimeStampToDate(timestamp, "YYYY"));
    return age;
  } catch (error) {
    return "NaN";
  }
};
export const generateQueryString = (properties) => {
  if (!properties) {
    return "";
  }

  const validProperties = Object.entries(properties)
    .filter(([key, value]) => value) // Filter out properties with falsy values
    .map(([key, value]) => `${key}=${value}`); // Create query string for each property

  return validProperties.join("&"); // Join query strings with '&'
};

export const stopPropagation = (e) => {
  e.stopPropagation();
};

export const convertDecimalTime = (decimalTime) => {
  let hours = Math.floor(decimalTime); // Get the whole number part as hours
  let minutes = Math.round((decimalTime % 1) * 60); // Convert the decimal part to minutes

  let result = "";

  if (hours > 0) {
    result += `${hours}h`; // Add hours to the result if there are any
  }

  if (minutes > 0) {
    if (result !== "") {
      result += " "; // Add a space if both hours and minutes are present
    }
    result += `${minutes}m`; // Add minutes to the result
  }

  return result !== "" ? result : "0m"; // Return '0m' if no time is present
};

export const removeDuplicateObjects = (arr) => {
  const uniqueObjects = Array.from(new Set(arr.map(JSON.stringify))).map(
    JSON.parse,
  );
  return uniqueObjects;
};

export const downloadPDF = (pdfUrl) => {
  const link = document.createElement("a");
  link.href = pdfUrl;
  link.target = "_blank"; // Open in a new tab/window if supported by the browser
  link.setAttribute("download", "download"); // Add the download attribute to force download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const cleanObject = (obj) => {
  const cleanedObj = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== "" && value !== null && value !== undefined && value !== 0) {
      cleanedObj[key] = value;
    }
  }
  return cleanedObj;
};

export const checkValidImage = (type, size) => {
  if (!USERS_ACCEPT_IMAGES_TYPES.includes(type)) {
    return `The image type must be one of the following types ${USERS_ACCEPT_IMAGES_TYPES}`;
  } else if (size > MAX_SIZE_IMAGE) {
    return `The image size must be less than ${MAX_SIZE_IMAGE} bytes`;
  } else {
    return false;
  }
};

export const checkValidVideo = (type, size) => {
  if (!USERS_ACCEPT_VIDEO_TYPES.includes(type)) {
    return `The image type must be one of the following types ${USERS_ACCEPT_VIDEO_TYPES}`;
  } else if (size > MAX_SIZE_VIDEO) {
    return `The image size must be less than ${MAX_SIZE_VIDEO} bytes`;
  } else {
    return false;
  }
};

export const getStoredUserData = () => {
  const userDataJSON = localStorage.getItem(USER_DETAILS);
  return userDataJSON ? JSON.parse(userDataJSON) : null;
};

export const saveAccessToken = (accessToken) => {
  const userData = getStoredUserData();
  if (userData) {
    userData.accessToken = accessToken;
    localStorage.setItem(USER_DETAILS, JSON.stringify(userData));
  }
};

export const getAuthToken = () => {
  const userData = getStoredUserData();
  return userData ? userData.token : null;
};