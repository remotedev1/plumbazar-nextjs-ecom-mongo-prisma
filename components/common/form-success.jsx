import { FaCheckCircle  } from "react-icons/fa";

export const FormSuccess = ({ message }) => {
  if (!message) return null;
  return (
    <div className="bg-emerald-500/10 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <FaCheckCircle  className="h-5 w-5" />
      <p>{message}</p>
    </div>
  );
};
