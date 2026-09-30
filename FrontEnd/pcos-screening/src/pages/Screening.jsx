import { useState } from "react";
import { ArrowLeft, ArrowRight, Brain } from "lucide-react";

import { submitScreening } from "../api/screeningApi";
import { questions } from "../data/questions";

import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";
import SafetyNotice from "../components/SafetyNotice";


function Screening({ onBack }) {

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [screeningResult, setScreeningResult] = useState(null);

  const [responses, setResponses] = useState({
    Age_Years: "",
    BMI: "",
    Cycle_Regularity: "",
    Menstrual_Duration_Days: "",
    Weight_Gain: "",
    Hair_Growth: "",
    Skin_Darkening: "",
    Hair_Loss: "",
    Pimples: "",
    Fast_Food: "",
    Regular_Exercise: "",
  });


  const question = questions[currentQuestion];

  const currentValue = responses[question.field];


  // -----------------------------
  // Update answer
  // -----------------------------

  const updateResponse = (value) => {

    setResponses((previous) => ({
      ...previous,
      [question.field]: value,
    }));

  };


  // -----------------------------
  // Validate current question
  // -----------------------------

  const validateCurrentQuestion = () => {

    if (currentValue === "" || currentValue === null) {

      return "Please answer this question before continuing.";

    }


    if (question.type === "number") {

      const numericValue = Number(currentValue);


      if (Number.isNaN(numericValue)) {

        return "Please enter a valid number.";

      }


      if (numericValue < 0) {

        return "Negative values are not allowed.";

      }


      if (
        question.min !== undefined &&
        numericValue < question.min
      ) {

        return `Please enter a value of at least ${question.min}.`;

      }


      if (
        question.max !== undefined &&
        numericValue > question.max
      ) {

        return `Please enter a value of at most ${question.max}.`;

      }

    }


    return null;

  };


  // -----------------------------
  // Next question
  // -----------------------------

  const handleNext = () => {

    const error = validateCurrentQuestion();


    if (error) {

      alert(error);

      return;

    }


    if (currentQuestion < questions.length - 1) {

      setCurrentQuestion((previous) => previous + 1);

    }

  };


  // -----------------------------
  // Back button
  // -----------------------------

  const handleBack = () => {

    if (currentQuestion === 0) {

      onBack();

      return;

    }


    setCurrentQuestion((previous) => previous - 1);

  };


  // -----------------------------
  // Submit screening
  // -----------------------------

  const handleAnalyze = async () => {

    const error = validateCurrentQuestion();


    if (error) {

      alert(error);

      return;

    }


    try {

      const result = await submitScreening(responses);


      console.log("ML Result:", result);


      setScreeningResult(result);

    } catch (error) {

      console.error("API error:", error);

      alert("Unable to connect to the backend.");

    }

  };


  // =========================================================
  // RESULT SCREEN
  // =========================================================

  if (screeningResult) {

    const isPCOS =
      screeningResult.prediction === "PCOS";


    return (

      <div className="screening-page">


        {/* ---------------- HEADER ---------------- */}

        <header className="screening-header">

          <div className="brand">

            <div className="brand-icon">

              <Brain size={24} />

            </div>

            <span>PCOS Screening</span>

          </div>

        </header>



        {/* ---------------- RESULT ---------------- */}

        <main className="screening-container">


          <div className="result-card">


            <span className="section-label">

              SCREENING RESULT

            </span>


            <h1>

              Your Screening Result

            </h1>



            {/* Prediction */}

            <div
              className={`result-status ${
                isPCOS
                  ? "result-positive"
                  : "result-negative"
              }`}
            >

              {isPCOS
                ? "PCOS"
                : "No PCOS"}

            </div>



            {/* Probability */}

            <div className="probability-section">

              <p>
                Model output — PCOS-class probability
              </p>


              <div className="probability-value">

                {screeningResult.probability}%

              </div>


              <p className="probability-note">

                This percentage is the model's estimated
                probability for the PCOS class based on
                the information provided. It is not a
                medical risk percentage or diagnosis.

              </p>

            </div>



            {/* Result message */}

            <div className="result-message">

              {isPCOS ? (

                <p>

                  The screening model identified a pattern
                  associated with the PCOS class in the
                  provided responses.

                </p>

              ) : (

                <p>

                  The screening model did not identify a
                  strong PCOS pattern in the provided
                  responses.

                </p>

              )}

            </div>



            {/* =================================================
                XAI SECTION
            ================================================= */}

<div className="xai-section">

  <div className="xai-header">
    <span className="section-label">
      MODEL EXPLANATION
    </span>

    <h2>Why did the model give this result?</h2>

    <p className="xai-description">
      These values show how each response influenced the
      machine-learning model's prediction for this specific
      screening. They represent model behavior, not medical
      risk factors or causes of PCOS.
    </p>
  </div>

  <div className="xai-list">

    {screeningResult.explanation?.slice(0, 6).map(
      (item, index) => (

        <div
          className="xai-item"
          key={`${item.feature}-${index}`}
          onClick={() => {

            const message =
              `Explain why ${item.feature} influenced my PCOS screening result and what "${item.direction}" means.`;

            window.dispatchEvent(
              new CustomEvent(
                "openChatWithMessage",
                {
                  detail: message
                }
              )
            );

          }}
        >

          <div className="xai-info">

            <span className="xai-feature">
              {item.feature}
            </span>

            <span
              className={
                item.direction === "toward PCOS"
                  ? "xai-direction toward"
                  : "xai-direction away"
              }
            >

              {item.direction === "toward PCOS"
                ? "Increased the model's PCOS output"
                : "Decreased the model's PCOS output"}

            </span>

          </div>

          <div className="xai-value">

            {item.contribution > 0 ? "+" : ""}
            {item.contribution}

          </div>

        </div>

      )
    )}

  </div>

</div>
   

            {/* =================================================
                SAFETY WARNING
            ================================================= */}

            <div className="result-warning">

              <strong>
                Important:
              </strong>


              <p>

                This result is generated by a
                machine-learning screening model and
                is not a medical diagnosis. Please consult
                a qualified healthcare professional for
                clinical evaluation.

              </p>

            </div>



            {/* =================================================
                ACTIONS
            ================================================= */}

            <div className="result-actions">


              <button
                type="button"
                className="primary-button"

                onClick={() => {

                  setScreeningResult(null);

                  setCurrentQuestion(0);

                }}
              >

                Take Screening Again

              </button>


            </div>


          </div>


        </main>

      </div>

    );

  }



  // =========================================================
  // QUESTIONNAIRE SCREEN
  // =========================================================

  return (

    <div className="screening-page">


      {/* ---------------- HEADER ---------------- */}

      <header className="screening-header">

        <div className="brand">

          <div className="brand-icon">

            <Brain size={24} />

          </div>

          <span>
            PCOS Screening
          </span>

        </div>

      </header>



      {/* ---------------- MAIN ---------------- */}

      <main className="screening-container">


        {/* Introduction */}

        <div className="screening-intro">


          <span className="section-label">

            RESEARCH PROTOTYPE

          </span>


          <h1>

            PCOS Early Screening

          </h1>


          <p>

            Please answer the following questions based
            on your usual/current condition. This
            questionnaire is designed for research-based
            early screening.

          </p>


        </div>



        {/* Progress */}

        <ProgressBar
          current={currentQuestion + 1}
          total={questions.length}
        />



        {/* Question */}

        <QuestionCard
          question={question}
          value={currentValue}
          onChange={updateResponse}
        />



        {/* Navigation */}
    
        <div className="navigation-buttons">


          <button
            type="button"
            className="secondary-button"
            onClick={handleBack}
          >

            <ArrowLeft size={18} />

            Back

          </button>



          {currentQuestion <
          questions.length - 1 ? (

            <button
              type="button"
              className="primary-button"
              onClick={handleNext}
            >

              Next

              <ArrowRight size={18} />

            </button>

          ) : (

            <button
              type="button"
              className="primary-button"
              onClick={handleAnalyze}
            >

              Analyze My Screening

              <ArrowRight size={18} />

            </button>

          )}


        </div>



        {/* Safety notice */}

        <SafetyNotice />


      </main>


    </div>

  );

}


export default Screening;