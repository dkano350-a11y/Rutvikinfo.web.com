import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import MessagesAdmin from "./components/MessagesAdmin.tsx";
import "./index.css";

const path = window.location.pathname;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {path === "/admin/messages" ? <MessagesAdmin /> : <App />}
  </StrictMode>,
);
