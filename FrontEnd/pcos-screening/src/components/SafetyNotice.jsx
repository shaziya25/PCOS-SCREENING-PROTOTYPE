import { ShieldAlert } from "lucide-react";

function SafetyNotice() {
  return (
    <div className="safety-notice">
      <ShieldAlert size={20} />

      <p>
        <strong>Important:</strong> This tool is intended for research and
        early screening purposes only. It does not provide a medical
        diagnosis. Please consult a qualified healthcare professional for
        medical evaluation.
      </p>
    </div>
  );
}

export default SafetyNotice;