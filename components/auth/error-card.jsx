import { FaExclamationTriangle } from "react-icons/fa";
import { CardWrapper } from "./card-wrapper";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Something went wrong"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="w-ful flex items-center justify-center">
        <FaExclamationTriangle className="h-5 w-5 text-destructive" />
      </div>
    </CardWrapper>
  );
};
