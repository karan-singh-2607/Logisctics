"use client";

import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer2";
import { toast } from "@/hooks/use-toast";
import { userService } from "@/lib/axios/services/user.service";
import {
  CustomerRole,
  FormSteps,
  RegistrationData,
  RegistrationValidateData,
} from "@/lib/axios/types";
import { useState } from "react";
import { CustomerType } from "./customer-type";
import { StepIndicator } from "./step-indicator";
import { DocumentNumber } from "./steps/document-number";
import { PersonalInfo } from "./steps/personal-info";
import { Agreement } from "./steps/agreement";
import { PasswordForm } from "./steps/password-form";

interface RegistrationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RegistrationForm({
  open,
  onOpenChange,
}: RegistrationFormProps) {
  const [customerType, setCustomerType] = useState<CustomerRole | null>(null);
  const [currentStep, setCurrentStep] = useState<FormSteps>(FormSteps?.TYPE);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<RegistrationData>>({});
  const steps = [
    FormSteps?.TYPE,
    FormSteps?.PERSONAL,
    FormSteps?.DOCUMENTS,
    FormSteps?.AGREEMENT,
    FormSteps?.PASSWORD,
  ];

  const getTotalSteps = (type: CustomerRole): number => 5;
  const getCurrentStepIndex = (): number => {
    return steps.indexOf(currentStep);
  };

  // const getCurrentStepIndex = () => {
  //   if (!customerType) return 0;
  //   return steps.indexOf(currentStep);
  // };

  const getCustomerRole = (type: CustomerRole): CustomerRole => {
    switch (type) {
      case CustomerRole.LOCAL:
        return CustomerRole.LOCAL;
      case CustomerRole.FOREIGNER:
        return CustomerRole.FOREIGNER;
      case CustomerRole?.LEGAL_PERSON:
        return CustomerRole.LEGAL_PERSON;
    }
  };

  const handleCustomerTypeSelect = (type: CustomerRole) => {
    console.log(type);
    setCustomerType(type);
    setFormData((prev) => ({ ...prev, type: getCustomerRole(type) }));
    setCurrentStep(FormSteps?.PERSONAL);
  };

// Example validation functions:

const validatePersonalInfo = (): boolean => {
  if (!formData.first_name?.trim()) {
    toast({
      variant: "destructive",
      title: "Validation Error",
      description: "First name is required.",
    });
    return false;
  }
  if (!formData.last_name?.trim()) {
    toast({
      variant: "destructive",
      title: "Validation Error",
      description: "Last name is required.",
    });
    return false;
  }
  if (!formData.email?.trim()) {
    toast({
      variant: "destructive",
      title: "Validation Error",
      description: "Email is required.",
    });
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    toast({
      variant: "destructive",
      title: "Validation Error",
      description: "Invalid email format.",
    });
    return false;
  }
  // Validate email length (example: at least 5 and at most 254 characters)
  if (formData.email.length < 5 || formData.email.length > 254) {
    toast({
      variant: "destructive",
      title: "Validation Error",
      description: "Email length is invalid.",
    });
    return false;
  }
  // Validate mobile presence
  if (!formData.mobile?.trim()) {
    toast({
      variant: "destructive",
      title: "Validation Error",
      description: "Phone number is required.",
    });
    return false;
  }
  // Validate mobile format: only digits allowed, e.g. between 7 and 15 digits
  const mobileRegex = /^[0-9]{7,15}$/;
  if (!mobileRegex.test(formData.mobile)) {
    toast({
      variant: "destructive",
      title: "Validation Error",
      description:
        "Invalid mobile number format.",
    });
    return false;
  }
  return true;
};

const validateDocument = (): boolean => {
  // Check document is provided
  if (!formData.document?.trim()) {
    toast({
      variant: "destructive",
      title: "Document Number Required",
      description: "Document number is required to proceed.",
    });
    return false;
  }
  // Validate document: only alphanumeric characters allowed
  const docRegex = /^[a-zA-Z0-9]+$/;
  if (!docRegex.test(formData.document)) {
    toast({
      variant: "destructive",
      title: "Validation Error",
      description: "Document number must be alphanumeric.",
    });
    return false;
  }
  // Validate document length (example: between 5 and 20 characters)
  if (formData.document.length < 5 || formData.document.length > 20) {
    toast({
      variant: "destructive",
      title: "Validation Error",
      description: "Document number must be between 5 and 20 characters.",
    });
    return false;
  }
  return true;
};


  const validateAfterAgreement = async (): Promise<boolean> => {
    console.log(formData);
    if (!formData.terms || !formData.marketing || !formData.dataProcessing) {
      toast({
        variant: "destructive",
        title: "Agreement Required",
        description: `You must agree to the ${
          !formData?.terms
            ? " terms and conditions"
            : !formData?.marketing
            ? "marketing communications"
            : !formData?.dataProcessing
            ? "consent to the processing of my personal data"
            : ""
        } to proceed.`,
      });
      return false;
    }
    const validate = await validateStep();
    console.log(validate);
    return true;
  };

  const handleBack = () => {
    const currentIndex = steps.indexOf(currentStep);

    if (currentIndex <= 0) {
      setCustomerType(null);
      setCurrentStep(FormSteps.TYPE);
    } else {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const validateStep = async (): Promise<boolean> => {
    // Check if the user agreed to terms (assuming the Agreement component sets formData.terms to true)
    if (currentStep === FormSteps?.AGREEMENT) {
      try {
        setIsLoading(true);
        const validationData: RegistrationValidateData = {
          type: formData.type!,
          first_name: formData.first_name!,
          last_name: formData.last_name!,
          document: formData.document!,
          mobile: formData.mobile!,
          email: formData.email!,
        };

        const response = await userService.validateRegistration(validationData);

        if (!response.status) {
          toast({
            variant: "destructive",
            title: "Validation Error",
            description: response.message,
          });
          return false;
        }

        return true;
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "An error occurred during validation. Please try again.",
        });
        return false;
      } finally {
        setIsLoading(false);
      }
    }
    return true;
  };

  const handleNext = async () => {
    console.log(currentStep);
    if (currentStep === FormSteps?.PERSONAL && !validatePersonalInfo()) {
      return;
    }
    if (currentStep === FormSteps?.DOCUMENTS && !validateDocument()) {
      return;
    }
    if (currentStep === FormSteps.AGREEMENT) {
      const valid = await validateAfterAgreement();
      console.log(valid);
      if (!valid) return;
    }
    // Proceed to next step
    const steps: FormSteps[] = [
      FormSteps.TYPE,
      FormSteps.PERSONAL,
      FormSteps.DOCUMENTS,
      FormSteps.AGREEMENT,
      FormSteps.PASSWORD,
    ];
    const currentIndex = steps.indexOf(currentStep);

    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handleSubmit = async () => {
    console.log(formData);
    try {
      setIsLoading(true);
      const registrationData = {
        ...formData,
        password: formData.password, // collected in password step
        password_confirmation: formData.password_confirmation,
      };
      const response = await userService.register(
        registrationData as RegistrationData
      );
      console.log('data->',response.message);
      if (response.status) {
        toast({
          title: "Success",
          description: response.message||"Registration completed successfully!",
        });
        onOpenChange(false);
      } else {
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: response.message,
        });
      }
    } catch (error:any) {
      console.log(error?.response.data.message);
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.response?.data?.message || "An error occurred during registration. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case FormSteps?.TYPE:
        return <CustomerType onSelectType={handleCustomerTypeSelect} />;
      case FormSteps?.PERSONAL:
        return (
          <PersonalInfo
            type={customerType!}
            data={formData}
            onChange={(data: Partial<RegistrationData>) =>
              setFormData((prev) => ({ ...prev, ...data }))
            }
          />
        );
      case FormSteps?.DOCUMENTS:
        return (
          <DocumentNumber
            data={formData}
            onChange={(data: Partial<RegistrationData>) =>
              setFormData((prev) => ({ ...prev, ...data }))
            }
          />
        );
      // case "company":
      //   return customerType === "legal" ? (
      //     <CompanyDetails
      //       data={formData}
      //       onChange={(data: Partial<RegistrationData>) =>
      //         setFormData((prev) => ({ ...prev, ...data }))
      //       }
      //     />
      //   ) : null;
      case FormSteps.AGREEMENT:
        return (
          <Agreement
            data={formData}
            onChange={(data: Partial<RegistrationData>) =>
              setFormData((prev) => ({ ...prev, ...data }))
            }
          />
        );
      case FormSteps.PASSWORD:
        return (
          <PasswordForm
            data={formData}
            onChange={(data: Partial<RegistrationData>) =>
              setFormData((prev) => ({ ...prev, ...data }))
            }
          />
        );

      default:
        return null;
    }
  };

  const renderNavigation = () => {
    if (currentStep === FormSteps?.TYPE) return null;

    return (
      <div className="flex items-center justify-between mt-8 pt-4 border-t">
        <Button
          variant="ghost"
          onClick={handleBack}
          disabled={isLoading}
          className="bg-secondary text-white"
        >
          Back
        </Button>
        <div className="text-sm text-gray-500">
          Step {getCurrentStepIndex()} of{" "}
          {customerType ? getTotalSteps(customerType) : 0}
        </div>
        {currentStep !== FormSteps.PASSWORD ? (
          <Button onClick={handleNext} disabled={isLoading}>
            {isLoading ? "Loading..." : "Continue"}
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-secondary hover:bg-secondary/90"
          >
            {isLoading ? "Submitting..." : "Complete Registration"}
          </Button>
        )}
      </div>
    );
  };
  console.log(currentStep, customerType);
  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      title={
        currentStep === FormSteps.TYPE
          ? "Choose Customer Type"
          : `Registration - Step ${getCurrentStepIndex()}`
      }
    >
      <div className="relative h-full">
        {customerType && (
          <StepIndicator
            totalSteps={getTotalSteps(customerType)}
            currentStep={getCurrentStepIndex() - 1}
          />
        )}
        <div className="p-4">{renderStep()}</div>
        {renderNavigation()}
      </div>
    </Drawer>
  );
}
