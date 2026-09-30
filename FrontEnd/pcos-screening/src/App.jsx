import { useState } from "react";

import Home from "./pages/Home";
import Screening from "./pages/Screening";
import Chatbot from "./components/Chatbot";

function App() {
  const [page, setPage] = useState("home");

  return (
    <>
      {page === "screening" ? (
         <Screening
         onBack={() => setPage("home")} 
         />
      ) : (
        <Home onStart={() => setPage("screening")} />
      )}

      <Chatbot />
    </>
  );
}

export default App;