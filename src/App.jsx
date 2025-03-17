import { useState } from "react";
import SurveyForm from "./surveyForm";
import { supabase } from "./supaBaseClient";
import "./index.css";

const App = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        throw new Error("Supabase credentials are missing in the .env file");
      }

      const { data, error } = await supabase.from("survey_responses").insert([formData]);

      if (error) {
        console.error("Supabase Insert Error:", error.message);
        throw new Error("Failed to save data. Check Supabase settings.");
      }

      console.log("Inserted Data:", data);

      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="container"> 
      <h1 className="text-2xl font-bold text-center">Share Your Feedback</h1>
      <p className="text-gray-500 text-center mb-4">Your insight is highly appreciated!</p>
      <SurveyForm onSubmit={handleSubmit} />
      {showPopup && (
  <div className="popup">
    Submitted successfully!
  </div>
)}

    </div>
  </div>
);
};

export default App;
