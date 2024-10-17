"use client";

import BaseButton from "@/components/dashboard/BaseButton";
// RHF
import { useFormContext } from "react-hook-form";

// Components

const WizardProgress = ({ wizard }) => {
  const { activeStep, stepCount } = wizard;

  const {
    formState: { errors },
  } = useFormContext();

  const step1Valid = !errors.sender && !errors.receiver;
  const step2Valid =
    !errors.details?.invoiceNumber &&
    !errors.details?.invoiceDate &&
    !errors.details?.dueDate;

  const step3Valid = !errors.details?.items;
  const step4Valid =
    !errors.details?.subTotal &&
    !errors.details?.totalAmount &&
    !errors.details?.discountAmount &&
    !errors.details?.taxAmount &&
    !errors.details?.shippingAmount;

  /**
   * Determines the button variant based on the given WizardStepType.
   *
   * @param {WizardStepType} step - The wizard step object
   * @returns The button variant ("destructive", "default", or "outline") based on the step's validity and active status.
   */
  const returnButtonVariant = (step) => {
    if (!step.isValid) {
      return "destructive";
    }
    if (step.id === activeStep) {
      return "default";
    } else {
      return "outline";
    }
  };

  /**
   * Checks whether the given WizardStepType has been passed or not.
   *
   * @param {WizardStepType} currentStep - The WizardStepType object
   * @returns `true` if the step has been passed, `false` if it hasn't, or `undefined` if the step is not valid.
   */
  const stepPassed = (currentStep) => {
    if (currentStep.isValid) {
      return activeStep > currentStep.id ? true : false;
    }
  };

  const steps = [
    {
      id: 0,
      label: "Bill To",
      isValid: step1Valid,
    },
    {
      id: 1,
      label: "Details",
      isValid: step2Valid,
    },
    {
      id: 2,
      label: "Line Items",
      isValid: step3Valid,
    },

    {
      id: 3,
      label: "Summary",
      isValid: step4Valid,
    },
  ];

  return (
    <div className="flex flex-wrap justify-around items-center gap-y-3">
      {steps.map((step, idx) => (
        <div key={step.id} className="flex items-center">
          <BaseButton
            variant={returnButtonVariant(step)}
            className="w-auto"
            onClick={() => {
              wizard.goToStep(step.id);
            }}
          >
            {step.id + 1} . {step.label}
          </BaseButton>

          {/* {step.id != stepCount - 1 && (
                        <div>
                            <Dot />
                        </div>
                    )} */}
        </div>
      ))}
    </div>
  );
};

export default WizardProgress;
