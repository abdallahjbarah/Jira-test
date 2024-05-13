export const email = (email) =>
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

export const amount = (val) =>
  /^\$?[0-9]?((\.[0-9]+)|([0-9]+(\.[0-9]+)?))$/g.test(val);

export const mobile = (val) =>
  /([+]?\d{1,2}[.-\s]?)?(\d{3}[.-]?){2}\d{4}/g.test(val);
export const string = (val) => /^\S[a-zA-Z\x20]{2,25}$/.test(val);
export const password = (val) =>
  /^(?=.*[A-Za-z])[A-Za-z0-9]\S{5,16}$/.test(val);
export const numbers = (val) => /^[0-9]{0,}$/.test(val);
export const isString = (val) => /^\S[a-zA-Z\x20]$/.test(val);
export const username = (val) => /^\S[a-zA-Z\x20]{2,25}$/.test(val);
/* eslint-disable */
export const url = (val) =>
  /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(
    val,
  ); //eslint-disable-line
export const positiveNumbers = (val) =>
  /^[+]?([1-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$/.test(
    val,
  );
export const validateImageFile = (imageExtension) =>
  /(jpg|jpeg|png|PNG|JPG)$/.test(imageExtension);
export const validateVideoFile = (videoExtension) =>
  /(mp4|webm)$/.test(videoExtension);
export const validateCvFile = (cvExtension) =>
  /(pdf|doc|docx)$/.test(cvExtension);

export const removeHtmlTags = (html) => {
  // Replace HTML tags with an empty string using regex
  const sanitizedText = html.replace(/<\/?[^>]+(>|$)/g, "");

  return sanitizedText;
};
export const hasLowerCase = /[a-z]/;
export const hasUpperCase = /[A-Z]/;
export const hasNumbers = /\d/;
export const hasSymbols = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
export const hasSpaces = /^[^\s]+$/;
