import { FaExclamationTriangle } from "react-icons/fa";

export const FormError = ({ message }) => {
  if (!message) return null;
  return (
    <div className="bg-destructive/10 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <FaExclamationTriangle className="h-5 w-5" />
      <p>{message}</p>
    </div>
  );
};
