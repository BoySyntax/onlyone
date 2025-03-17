import { useState } from "react";

const SurveyForm = ({ onSubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (step === 1 && !formData.name.trim()) {
      alert("Please enter your name.");
      return;
    }
    if (step === 2 && !formData.email.trim()) {
      alert("Please enter your email.");
      return;
    }
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (!formData.feedback.trim()) {
      alert("Please provide your feedback.");
      return;
    }
    onSubmit(formData);
    setFormData({ name: "", email: "", feedback: "" });
    setStep(1);
  };

  return (
    <div>
      <div className="step-indicator">
        {[
          { num: 1, label: "Info" },
          { num: 2, label: "Contact" },
          { num: 3, label: "Feedback" },
        ].map(({ num, label }) => (
          <div key={num} className="step">
            <div className={step === num ? "active" : ""}>{num}</div>
            <span>{label}</span>
          </div>
        ))}
      </div>

      <div className="step-line"></div>

      {step === 1 && (
  <div>
    <label>What's your name? <span className="required">*</span></label>
    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleChange}
      required
      className="w-full border p-2 rounded-md mt-2"
    />
    

    <div className="input-separator"></div>


<div className="mt-4 flex justify-end w-full">
  <button onClick={nextStep} className="next-btn">
    Next <span>&#62;</span>
  </button>
</div>
  </div>
)}

{step === 2 && (
  <div>
    <label>Email <span className="required">*</span></label>
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      required
      className="w-full border p-2 rounded-md mt-2"
    />

    <div className="input-separator"></div>

    <div className="button-container">
  <button onClick={prevStep} className="back-btn">Back</button>
  <button onClick={nextStep} className="next-btn">Next <span>&#62;</span></button>
</div>

  </div>
)}

{step === 3 && (
  <div>
    <label>Feedback <span className="required">*</span></label>
    <textarea
      name="feedback"
      value={formData.feedback}
      onChange={handleChange}
      required
      className="w-full border p-2 rounded-md mt-2"
    />

    <div className="input-separator"></div>

    <div className="button-container">
  <button onClick={prevStep} className="back-btn">Back</button>
  <button onClick={handleFinalSubmit} className="submit-btn">Submit</button>
</div>
  </div>
)}

    </div>
  );
};

export default SurveyForm;
