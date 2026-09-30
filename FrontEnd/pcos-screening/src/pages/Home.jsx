import {
  ArrowRight,
  Brain,
  ClipboardCheck,
  ShieldCheck,
  Activity,
} from "lucide-react";

function Home({ onStart }) {
  return (
    <div className="home-page">
      <nav className="navbar">
        <div className="brand">
          <div className="brand-icon">
            <Brain size={24} />
          </div>

          <span>PCOS Screening</span>
        </div>

        <span className="research-badge">
          MCA Research Prototype
        </span>
      </nav>

      <main className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <Activity size={17} />
            AI + Healthcare Research
          </div>

          <h1>
            AI-Based Early
            <span> PCOS Screening</span>
          </h1>

          <p className="hero-subtitle">
            An ML-powered questionnaire for early PCOS screening
            using non-invasive demographic, menstrual, symptom,
            and lifestyle information.
          </p>

          <p className="hero-description">
            This prototype uses a machine-learning model to analyze
            selected health and lifestyle factors and provide an
            early PCOS screening result. It is intended for research
            and educational purposes only and does not replace
            professional medical diagnosis.
          </p>

          <button
            type="button"
            className="start-button"
            onClick={onStart}
          >
            Start Screening
            <ArrowRight size={20} />
          </button>

          <div className="trust-items">
            <div>
              <ShieldCheck size={19} />
              <span>Research-focused</span>
            </div>

            <div>
              <ClipboardCheck size={19} />
              <span>11 screening factors</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-card">
            <div className="visual-icon">
              <Brain size={38} />
            </div>

            <h3>ML-Assisted Screening</h3>

            <p>
              Structured health and lifestyle information can be
              evaluated by a machine-learning model for research
              purposes.
            </p>

            <div className="visual-line">
              <span />
              <span />
              <span />
            </div>

            <div className="visual-stat">
              <strong>11</strong>
              <small>Input Features</small>
            </div>
          </div>
        </div>
      </main>

      <footer className="home-footer">
        <ShieldCheck size={17} />

        <span>
          For research and educational use only • Not a medical
          diagnosis
        </span>
      </footer>
    </div>
  );
}

export default Home;