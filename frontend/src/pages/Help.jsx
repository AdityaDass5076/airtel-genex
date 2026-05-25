import { useState } from "react";
import {
  Bot, Send, Sparkles, User, Cpu, Network, FileText, UploadCloud,
  ShieldCheck, HelpCircle
} from "lucide-react";
import "./Help.css";

const quickPrompts = [
  "How do I use Airtel GenEx?",
  "What files should I upload?",
  "How does DWG/DXF extraction work?",
  "What is MWO?",
  "Explain OSP and ODN",
  "Why are quantities showing zero?",
];

function getArtemisReply(question) {
  const q = question.toLowerCase();

  if (q.includes("use") || q.includes("workflow")) {
    return "To use Airtel GenEx: first create a project, fill project details, upload the DXF design, process extraction, verify quantities, then generate and download BOQ, BOM, MWO, OSP/ODN, OH Accessories and FTTH reports.";
  }

  if (q.includes("upload") || q.includes("file") || q.includes("dwg") || q.includes("dxf")) {
    return "For best results, upload a DXF file exported from AutoCAD. DWG should be converted to DXF first. The system reads text, blocks, layers, cable labels, FAT/OTB/ODF symbols and BOM information from the drawing.";
  }

  if (q.includes("zero") || q.includes("not reading") || q.includes("quantity")) {
    return "If quantities show zero, check whether the DXF contains proper text labels like 24F Cable, 12F Cable, FAT, OTB, Splitter, Duct, Pole, Closure etc. Also verify that layers and block names are not unnamed or exploded incorrectly.";
  }

  if (q.includes("mwo")) {
    return "MWO means Material Work Order. In GenEx, it is generated using project details and extracted quantities such as cable length, splitters, FAT/FMS, duct, trench, poles and HP count.";
  }

  if (q.includes("osp") || q.includes("odn")) {
    return "OSP means Outside Plant and ODN means Optical Distribution Network. In FTTH planning, these include fiber routes, ducts, poles, splitters, FAT boxes, OTBs, ODFs, closures and cable distribution.";
  }

  if (q.includes("boq") || q.includes("bom")) {
    return "BOQ is Bill of Quantity and BOM is Bill of Material. GenEx extracts material quantities from the drawing and maps them with item codes, unit prices and final costs.";
  }

  if (q.includes("ftth")) {
    return "FTTH means Fiber To The Home. In GenEx, FTTH Details include GIS code, M6 code, site address, home pass count, GPON cards, OLT type, GPON ports and total cost.";
  }

  if (q.includes("verify") || q.includes("validation")) {
    return "The Verification page checks whether project details, uploaded DXF data, extracted BOM items, cable length, splitters and HP count are available before final report generation.";
  }

  return "I am Artemis, your Airtel GenEx assistant. I can help with project setup, DXF upload, telecom material extraction, BOQ/BOM/MWO generation, OSP/ODN planning, OH accessories, FTTH details and verification.";
}

function Help() {
  const [messages, setMessages] = useState([
    {
      sender: "artemis",
      text: "Hello Aditya, I am Artemis — your Airtel GenEx AI Assistant. Ask me anything about the app, FTTH planning, DXF extraction, BOQ, BOM, MWO, OSP/ODN or verification.",
    },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = (text = input) => {
    if (!text.trim()) return;

    const userMsg = { sender: "user", text };
    const botMsg = { sender: "artemis", text: getArtemisReply(text) };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="help-page">
      <div className="help-header">
        <div>
          <h1>Artemis AI Assistant</h1>
          <p>Your built-in guide for Airtel GenEx, FTTH planning and telecom document automation.</p>
        </div>

        <div className="ai-status">
          <Sparkles size={20} />
          Online
        </div>
      </div>

      <div className="help-layout">
        <div className="assistant-panel">
          <div className="assistant-hero">
            <div className="artemis-orb">
              <Bot size={58} />
            </div>

            <h2>Artemis</h2>
            <p>FTTH Planning Intelligence Assistant</p>
          </div>

          <div className="capability-grid">
            <Cap icon={<UploadCloud />} title="Upload Help" />
            <Cap icon={<Network />} title="OSP / ODN" />
            <Cap icon={<FileText />} title="BOQ / BOM / MWO" />
            <Cap icon={<ShieldCheck />} title="Verification" />
          </div>

          <div className="quick-card">
            <h3>Quick Questions</h3>

            {quickPrompts.map((prompt) => (
              <button key={prompt} onClick={() => sendMessage(prompt)}>
                <HelpCircle size={15} />
                {prompt}
              </button>
            ))}
          </div>
        </div>

        <div className="chat-card">
          <div className="chat-top">
            <div>
              <h2>Ask Artemis</h2>
              <p>Converse with the assistant for app and telecom guidance.</p>
            </div>

            <Cpu className="cpu-icon" />
          </div>

          <div className="chat-window">
            {messages.map((msg, index) => (
              <div className={`message-row ${msg.sender}`} key={index}>
                <div className="message-icon">
                  {msg.sender === "artemis" ? <Bot size={18} /> : <User size={18} />}
                </div>

                <div className="message-bubble">
                  <span>{msg.sender === "artemis" ? "Artemis" : "You"}</span>
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              value={input}
              placeholder="Ask Artemis about GenEx, FTTH, DXF, MWO, BOQ, BOM..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleEnter}
            />

            <button onClick={() => sendMessage()}>
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Cap({ icon, title }) {
  return (
    <div className="cap-card">
      {icon}
      <span>{title}</span>
    </div>
  );
}

export default Help;