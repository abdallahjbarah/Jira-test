export const email = (email: string): boolean =>
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

export const amount = (val: string): boolean =>
  /^\$?[0-9]?((\.[0-9]+)|([0-9]+(\.[0-9]+)?))$/g.test(val);

export const mobile = (val: string): boolean =>
  /([+]?\d{1,2}[.-\s]?)?(\d{3}[.-]?){2}\d{4}/g.test(val);

export const string = (val: string): boolean =>
  /^\S[a-zA-Z\x20]{2,25}$/.test(val);

export const password = (val: string): boolean =>
  /^(?=.*[A-Za-z])[A-Za-z0-9]\S{5,16}$/.test(val);

export const numbers = (val: string): boolean => /^[0-9]{0,}$/.test(val);

export const isString = (val: string): boolean => /^\S[a-zA-Z\x20]$/.test(val);

export const username = (val: string): boolean =>
  /^\S[a-zA-Z\x20]{2,25}$/.test(val);

export const url = (val: string): boolean =>
  /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(
    val,
  );

export const positiveNumbers = (val: string): boolean =>
  /^[+]?([1-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$/.test(
    val,
  );

export const validateImageFile = (imageExtension: string): boolean =>
  /(jpg|jpeg|png|PNG|JPG)$/.test(imageExtension);

export const validateVideoFile = (videoExtension: string): boolean =>
  /(mp4|webm)$/.test(videoExtension);

export const validateCvFile = (cvExtension: string): boolean =>
  /(pdf|doc|docx)$/.test(cvExtension);

export const removeHtmlTags = (html: string): string => {
  const sanitizedText = html.replace(/<\/?[^>]+(>|$)/g, '');
  return sanitizedText;
};

export const hasLowerCase = /[a-z]/;
export const hasUpperCase = /[A-Z]/;
export const hasNumbers = /\d/;
export const hasSymbols = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
export const hasSpaces = /^[^\s]+$/;
