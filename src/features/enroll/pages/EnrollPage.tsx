/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PreferredLanguage from "../components/PreferredLanguage";
import PreamblePage from "../components/PreamblePage";
import ContactInformation from "../components/ContactInformation";
import MailingAddress from "../components/MailingAddress";
import {
  contactInformationSchema,
  mailingAddressSchema,
  type EnrollmentFormData,
  type ContactInfo,
  type MailingAddress as MailingAddressType,
} from "../validation/enrollmentSchemas";
import { Dayjs } from "dayjs";

const EnrollPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCertified, setIsCertified] = useState(false);
  const [contactErrors, setContactErrors] = useState<Record<string, string>>(
    {},
  );
  const [addressErrors, setAddressErrors] = useState<Record<string, string>>(
    {},
  );

  const { setValue, watch } = useForm<EnrollmentFormData>({
    defaultValues: {
      preferredLanguage: "",
      contactInfo: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth: null,
      },
      mailingAddress: {
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        county: "",
        zipCode: "",
      },
      isCertified: false,
    },
  });

  const formData = watch();

  // Step navigation handlers
  const handleNext = async () => {
    if (currentStep === 0) {
      // Language selection step - no validation needed
      setCurrentStep(1);
    } else if (currentStep === 1) {
      // Preamble step - no validation needed
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // Contact information step - validate before proceeding
      const contactData = formData.contactInfo;
      console.log("Validating contact data:", contactData);
      try {
        await contactInformationSchema.validate(contactData, {
          abortEarly: false,
        });
        console.log("Validation passed, proceeding to next step");
        setContactErrors({});
        setCurrentStep(3);
      } catch (error: any) {
        console.log("Validation failed:", error);
        if (error.inner) {
          const errors: Record<string, string> = {};
          error.inner.forEach((err: any) => {
            if (err.path) {
              errors[err.path] = err.message;
            }
          });
          console.log("Setting contact errors:", errors);
          setContactErrors(errors);
        }
      }
    } else if (currentStep === 3) {
      // Mailing address step - validate before proceeding
      const addressData = formData.mailingAddress;
      try {
        await mailingAddressSchema.validate(addressData, { abortEarly: false });
        setAddressErrors({});
        // For now, just show success message since we're not implementing submission yet
        alert(
          "Form completed successfully! (Submission will be implemented later)",
        );
      } catch (error: any) {
        if (error.inner) {
          const errors: Record<string, string> = {};
          error.inner.forEach((err: any) => {
            if (err.path) {
              errors[err.path] = err.message;
            }
          });
          setAddressErrors(errors);
        }
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Field change handlers
  const handleLanguageSelect = (language: string) => {
    setValue("preferredLanguage", language);
  };

  const handleContactFieldChange = (
    field: keyof ContactInfo,
    value: string | Dayjs | null,
  ) => {
    setValue(`contactInfo.${field}` as any, value);
    // Clear error for this field when user starts typing
    if (contactErrors[field]) {
      setContactErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleAddressFieldChange = (
    field: keyof MailingAddressType,
    value: string,
  ) => {
    setValue(`mailingAddress.${field}` as any, value);
    // Clear error for this field when user starts typing
    if (addressErrors[field]) {
      setAddressErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleCertificationChange = (certified: boolean) => {
    setIsCertified(certified);
    setValue("isCertified", certified);
  };

  // Render current step
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PreferredLanguage
            selectedLanguage={formData.preferredLanguage}
            onLanguageSelect={handleLanguageSelect}
            onNext={handleNext}
          />
        );
      case 1:
        return <PreamblePage onBack={handleBack} onNext={handleNext} />;
      case 2:
        return (
          <ContactInformation
            contactInfo={formData.contactInfo}
            onFieldChange={handleContactFieldChange}
            onBack={handleBack}
            onNext={handleNext}
            errors={contactErrors}
            isCertified={isCertified}
            onCertificationChange={handleCertificationChange}
          />
        );
      case 3:
        return (
          <MailingAddress
            mailingAddress={formData.mailingAddress}
            onFieldChange={handleAddressFieldChange}
            onBack={handleBack}
            onNext={handleNext}
            errors={addressErrors}
          />
        );
      default:
        return null;
    }
  };

  return <div>{renderCurrentStep()}</div>;
};

export default EnrollPage;
