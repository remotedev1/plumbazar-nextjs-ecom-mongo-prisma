"use client";


// React Wizard
import { useWizard } from "react-use-wizard";
import WizardProgress from "./WizardProgress";
import WizardNavigation from "./WizardNavigation";




const WizardStep = ({ children }) => {
    const wizard = useWizard();
    return (
        <div className="min-h-[25rem]">
            <WizardProgress wizard={wizard} />
            <div className="my-7">{children}</div>
            <WizardNavigation />
        </div>
    );
};

export default WizardStep;