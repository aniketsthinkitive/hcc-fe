/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from "yup";
import dayjs, { Dayjs } from "dayjs";

// Contact Information Schema
export const contactInformationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .matches(/^[A-Za-z\s]+$/, "First name can only contain letters and spaces"),

  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .matches(/^[A-Za-z\s]+$/, "Last name can only contain letters and spaces"),

  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address")
    .max(100, "Email must be less than 100 characters"),

  phone: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^\(\d{3}\) \d{3}-\d{4}$/,
      "Please enter a valid phone number in format (XXX) XXX-XXXX",
    ),

  dateOfBirth: yup
    .mixed<Dayjs | null>()
    .required("Date of birth is required")
    .test("date-validation", "Please select a valid date", function (value) {
      if (!value) return false;
      return dayjs.isDayjs(value) && value.isValid();
    })
    .test(
      "age-validation",
      "You must be at least 18 years old",
      function (value) {
        if (!value || !dayjs.isDayjs(value)) return false;

        const today = dayjs();
        const age = today.diff(value, "year");

        return age >= 18;
      },
    ),
});

// Mailing Address Schema
export const mailingAddressSchema = yup.object().shape({
  addressLine1: yup
    .string()
    .required("Address line 1 is required")
    .min(5, "Address must be at least 5 characters")
    .max(100, "Address must be less than 100 characters"),

  addressLine2: yup
    .string()
    .max(100, "Address line 2 must be less than 100 characters"),

  city: yup
    .string()
    .required("City is required")
    .min(2, "City must be at least 2 characters")
    .max(50, "City must be less than 50 characters")
    .matches(/^[A-Za-z\s]+$/, "City can only contain letters and spaces"),

  state: yup.string().required("State is required"),

  county: yup.string().required("County is required"),

  zipCode: yup
    .string()
    .required("Zip code is required")
    .matches(
      /^\d{5}(-\d{4})?$/,
      "Please enter a valid zip code (XXXXX or XXXXX-XXXX)",
    ),
});

// Complete Enrollment Schema
export const enrollmentSchema = yup.object().shape({
  preferredLanguage: yup
    .string()
    .required("Please select a preferred language")
    .oneOf(["en", "es"], "Please select a valid language option"),

  contactInfo: contactInformationSchema,

  mailingAddress: mailingAddressSchema,

  isCertified: yup
    .boolean()
    .oneOf(
      [true],
      "You must certify that you are the person completing this form",
    ),
});

// Type definitions for form data
export interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Dayjs | null;
}

export interface MailingAddress {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  county: string;
  zipCode: string;
}

export interface EnrollmentFormData {
  preferredLanguage: string;
  contactInfo: ContactInfo;
  mailingAddress: MailingAddress;
  isCertified: boolean;
}

// Validation helper functions
export const validateContactInfo = async (data: ContactInfo) => {
  try {
    await contactInformationSchema.validate(data, { abortEarly: false });
    return { isValid: true, errors: {} };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const errors: Record<string, string> = {};
      error.inner.forEach((err) => {
        if (err.path) {
          errors[err.path] = err.message;
        }
      });
      return { isValid: false, errors };
    }
    return { isValid: false, errors: {} };
  }
};

export const validateMailingAddress = async (data: MailingAddress) => {
  try {
    await mailingAddressSchema.validate(data, { abortEarly: false });
    return { isValid: true, errors: {} };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const errors: Record<string, string> = {};
      error.inner.forEach((err) => {
        if (err.path) {
          errors[err.path] = err.message;
        }
      });
      return { isValid: false, errors };
    }
    return { isValid: false, errors: {} };
  }
};

export const validateEnrollment = async (data: EnrollmentFormData) => {
  try {
    await enrollmentSchema.validate(data, { abortEarly: false });
    return { isValid: true, errors: {} };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const errors: Record<string, any> = {};
      error.inner.forEach((err) => {
        if (err.path) {
          const pathParts = err.path.split(".");
          if (pathParts.length === 1) {
            errors[err.path] = err.message;
          } else if (pathParts.length === 2) {
            if (!errors[pathParts[0]]) {
              errors[pathParts[0]] = {};
            }
            errors[pathParts[0]][pathParts[1]] = err.message;
          }
        }
      });
      return { isValid: false, errors };
    }
    return { isValid: false, errors: {} };
  }
};
