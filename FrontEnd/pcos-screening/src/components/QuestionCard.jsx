import { Check } from "lucide-react";

function QuestionCard({ question, value, onChange }) {
  const handleNumberChange = (e) => {
    const inputValue = e.target.value;

    if (inputValue === "") {
      onChange("");
      return;
    }

    const numberValue = Number(inputValue);

    if (numberValue < 0) {
      return;
    }

    onChange(inputValue);
  };

  return (
    <div className="question-card">
      <div className="question-number">
        Question {question.id}
      </div>

      <h2>{question.question}</h2>

      {question.type === "number" && (
        <div className="number-input-wrapper">
          <input
            type="number"
            value={value}
            min={question.min}
            max={question.max}
            step={question.step || "1"}
            placeholder={question.placeholder}
            onChange={handleNumberChange}
          />

          {question.unit && (
            <span className="input-unit">{question.unit}</span>
          )}
        </div>
      )}

      {question.type === "yesno" && (
        <div className="yes-no-options">
          <button
            type="button"
            className={value === "Yes" ? "option selected" : "option"}
            onClick={() => onChange("Yes")}
          >
            <span>Yes</span>

            {value === "Yes" && <Check size={20} />}
          </button>

          <button
            type="button"
            className={value === "No" ? "option selected" : "option"}
            onClick={() => onChange("No")}
          >
            <span>No</span>

            {value === "No" && <Check size={20} />}
          </button>
        </div>
      )}
    </div>
  );
}

export default QuestionCard;