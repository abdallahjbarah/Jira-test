import * as Yup from 'yup';
import {
  hasLowerCase,
  hasUpperCase,
  hasNumbers,
  hasSymbols,
  hasSpaces,
  phoneNumber,
} from './regex';

const passwordSchema = (requiredMessage) => {
  return Yup.string()
    .min(8, 'Weak password. Must contain at least 8 characters.')
    .max(
      50,
      'Too Long password. The password must be between 8 and 50 characters long.',
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

const isValidPasswordSchema = (requiredMessage) => {
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

// SignUp form
export const SignUpSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Business email is required'),
  password: passwordSchema('Password is required'),
  phoneNumber: Yup.string().required('Phone Number is required'),
  companyName: Yup.string().required('Company Name is required'),
  numberOfUnits: Yup.number()
    .min(1, 'The Number Of Units number must be greater than 1')
    .required('Number Of Units is required'),
});

// SignIn
export const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: isValidPasswordSchema('Password is required'),
});

// Forget Password
export const ForgetPasswordEmailSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

// Verification Code
export const VerificationCodeSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  code: Yup.number().required('Code is required'),
});

// Reset Password Forget
export const resetPasswordForgotSchema = Yup.object().shape({
  newPassword: passwordSchema('New Password is required'),

  ConfirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

// Change Password
export const changePasswordSchema = Yup.object().shape({
  oldPassword: isValidPasswordSchema('Old Password is required').notOneOf(
    [Yup.ref('newPassword'), null],
    "Old Password and new Password can't be same.",
  ),

  newPassword: passwordSchema('New Password is required'),

  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

// Contact Us Form
export const contactUsSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().required('Email is required'),
  phone: Yup.string().required('Phone is required'),
  message: Yup.string().required('Message is required'),
});

