import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown"; 
import { sendChatMessage } from "../api/chatApi";
import "./Chatbot.css";

function Chatbot() {

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text:
        "Hi! I'm your PCOS Screening Assistant. How can I help you?"
    }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);


  /* =========================
     LISTEN FOR XAI CLICKS
  ========================= */

  useEffect(() => {

    const handleXaiClick = (event) => {

      const message = event.detail;

      setInput(message);

    };


    window.addEventListener(
      "openChatWithMessage",
      handleXaiClick
    );


    return () => {

      window.removeEventListener(
        "openChatWithMessage",
        handleXaiClick
      );

    };

  }, []);


  /* =========================
     SEND MESSAGE
  ========================= */

  const sendMessage = async () => {

    if (!input.trim() || loading) return;

    const userMessage = input.trim();

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage
      }
    ]);

    setInput("");
    setLoading(true);


    try {

      const data = await sendChatMessage(userMessage);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.response
        }
      ]);

    } catch (error) {

      console.error("Chat error:", error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            "Sorry, I couldn't connect to the AI assistant right now. Please try again."
        }
      ]);

    } finally {

      setLoading(false);

    }

  };


  return (

    <aside className="chatbot-sidebar">

      {/* HEADER */}

      <div className="chatbot-header">

        <div className="chatbot-icon">
          ✦
        </div>


        <div>

          <h3>
            PCOS Assistant
          </h3>

          <p>
            AI Screening Support
          </p>

        </div>


        <span className="online-dot"></span>

      </div>


      {/* MESSAGES */}

      <div className="chatbot-messages">

        {messages.map((message, index) => (

          <div
            key={index}
            className={`chat-message ${message.sender}`}
          >
            <ReactMarkdown>
            {message.text}
            </ReactMarkdown>
          </div>

        ))}


        {loading && (

          <div className="chat-message bot">
            Thinking...
          </div>

        )}

      </div>


      {/* INPUT */}

      <div className="chatbot-input-area">

        <input
          type="text"
          placeholder="Ask about PCOS..."
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
          onKeyDown={(e) => {

            if (e.key === "Enter") {
              sendMessage();
            }

          }}
          disabled={loading}
        />


        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
        >
          ➤
        </button>

      </div>

    </aside>

  );
}

export default Chatbot;