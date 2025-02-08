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
import { DocumentUpload } from "./steps/document-upload";
import { PersonalInfo } from "./steps/personal-info";

type CustomerType = "georgian" | "foreigner" | "legal";
type Step = "type" | "personal" | "documents" | "company" | "agreement";

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
  const steps = [FormSteps?.TYPE, FormSteps?.PERSONAL, FormSteps?.DOCUMENTS, FormSteps?.AGREEMENT, FormSteps?.PASSWORD];

  const getTotalSteps = (type: CustomerRole) => {
    switch (type) {
      case CustomerRole.LOCAL:
      case CustomerRole?.FOREIGNER:
        return 3; // personal, documents, agreement
      case CustomerRole?.LEGAL_PERSON:
        return 4; // personal, documents, company, agreement
      default:
        return 0;
    }
  };

  const getCurrentStepIndex = () => {
    if (!customerType) return 0;
    return steps.indexOf(currentStep);
  };

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

  const validatePersonalInfo = (): boolean => {
    console.log(!formData.first_name?.trim());
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
    if (!formData.mobile?.trim()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Phone number is required.",
      });
      return false;
    }
    return true;
  };

  const handleBack = () => {
    // const steps: Step[] = [
    //   "type",
    //   "personal",
    //   "documents",
    //   "company",
    //   "agreement",
    // ];
    const currentIndex = steps.indexOf(currentStep);

    if (currentIndex <= 0) {
      setCustomerType(null);
      setCurrentStep(FormSteps.TYPE);
    } else {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const validateStep = async (): Promise<boolean> => {
    if (currentStep === FormSteps?.PERSONAL) {
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
    const currentIndex = steps.indexOf(currentStep);

    if (currentIndex < steps.length - 1) {
      // Skip company step for non-legal persons
      if (customerType !== CustomerRole?.LEGAL_PERSON && steps[currentIndex + 1] === FormSteps?.AGREEMENT) {
        setCurrentStep(FormSteps?.PASSWORD);
      } else {
        setCurrentStep(steps[currentIndex + 1]);
      }
    }
  };

  const handleSubmit = async () => {
    console.log(formData);
    if (!(await validateStep())) return;
    try {
      setIsLoading(true);
      const response = await userService.register(formData as RegistrationData);
      if (response.status) {
        toast({
          title: "Success",
          description: "Registration completed successfully!",
        });
        onOpenChange(false);
      } else {
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: response.message,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred during registration. Please try again.",
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
          <DocumentUpload
            type={customerType!}
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
      // case "agreement":
      //   return (
      //     <Agreement
      //       data={formData}
      //       onChange={(data: Partial<RegistrationData>) =>
      //         setFormData((prev) => ({ ...prev, ...data }))
      //       }
      //     />
      //   );
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
          Step {getCurrentStepIndex()} of {getTotalSteps(customerType!)}
        </div>
        {currentStep !== FormSteps.AGREEMENT ? (
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
