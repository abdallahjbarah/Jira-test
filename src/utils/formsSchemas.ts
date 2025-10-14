import * as Yup from 'yup';
import {
  hasLowerCase,
  hasNumbers,
  hasSpaces,
  hasSymbols,
  hasUpperCase,
} from './regex';

const passwordSchema = (requiredMessage: string): Yup.StringSchema => {
  return Yup.string()
    .min(8, 'Weak password. Must contain at least 8 characters.')
    .max(
      50,
      'Too Long password. The password must be between 8 and 50 characters long.'
    )
    .matches(hasSpaces, {
      message: 'The password must not contain spaces.',
    })
    .matches(hasUpperCase, {
      message:
        'Not a very strong password. Must contain at least 1 uppercase letter.',
    })
    .matches(hasLowerCase, {
      message:
        'Not a very strong password. Must contain at least 1 lowercase letter.',
    })
    .matches(hasLowerCase, {
      message:
        'Not a very strong password. Must contain at least 1 lowercase letter.',
    })
    .matches(hasNumbers, {
      message: 'Not a very strong password. Must contain at least 1 number.',
    })
    .matches(hasSymbols, {
      message:
        'Not a very strong password. Must contain at least 1 special character.',
    })
    .required(requiredMessage);
};

const isValidPasswordSchema = (requiredMessage: string): Yup.StringSchema => {
  return Yup.string()
    .min(8, 'Invalid Password')
    .max(50, 'Invalid Password')
    .matches(hasSpaces, {
      message: 'Invalid Password',
    })
    .matches(hasUpperCase, {
      message: 'Invalid Password',
    })
    .matches(hasLowerCase, {
      message: 'Invalid Password',
    })
    .matches(hasLowerCase, {
      message: 'Invalid Password',
    })
    .matches(hasNumbers, {
      message: 'Invalid Password',
    })
    .matches(hasSymbols, {
      message: 'Invalid Password',
    })
    .required(requiredMessage);
};

export const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: passwordSchema('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  phoneNumber: Yup.string().required('Phone Number is required'),
  countryCode: Yup.string(),
  agreeToTerms: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('You must accept the terms and conditions'),
});

export const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: isValidPasswordSchema('Password is required'),
});

export const ForgetPasswordEmailSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

export const VerificationCodeSchema = Yup.object().shape({
  code: Yup.number().required('Code is required'),
});

export const resetPasswordForgotSchema = Yup.object().shape({
  newPassword: passwordSchema('New Password is required'),
  ConfirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm Password is required'),
});

export const changePasswordSchema = Yup.object().shape({
  oldPassword: isValidPasswordSchema('Old Password is required').notOneOf(
    [Yup.ref('newPassword')],
    "Old Password and new Password can't be same."
  ),
  newPassword: passwordSchema('New Password is required'),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm Password is required'),
});

export const contactUsSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().required('Email is required'),
  phoneNumber: Yup.string().required('Phone is required'),
  message: Yup.string().required('Message is required'),
});

export const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
    ),
  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});

export const personalInfoSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: Yup.string().required('Phone number is required'),
  birthdate: Yup.date().nullable(),
  gender: Yup.object().shape({
    value: Yup.string().required('Gender is required'),
    label: Yup.string().required('Gender is required'),
  }),
  nationality: Yup.object().shape({
    value: Yup.string().required('Nationality is required'),
    label: Yup.string().required('Nationality is required'),
  }),
  country: Yup.object().shape({
    value: Yup.string().required('Country is required'),
    label: Yup.string().required('Country is required'),
  }),
  city: Yup.object().shape({
    value: Yup.string().required('City is required'),
    label: Yup.string().required('City is required'),
  }),
});

export const currencySchema = Yup.object().shape({
  currency: Yup.string().required('Currency is required'),
});
