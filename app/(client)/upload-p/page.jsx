"use client";
import axios from "axios";
import { useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(false);

  const handleButtonClick = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/test");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <button
        onClick={handleButtonClick}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Call API
      </button>
      {loading && <p>Updating..</p>}
      {loading && (
        <div className="flex items-center justify-center min-h-[40vh]">
          <div
            className="w-8 h-8 border-4 border-t-4 border-blue-500 rounded-full animate-spin"
            role="status"
          ></div>
        </div>
      )}
    </div>
  );
}
