import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.tsx";
import "./index.css";
import {
  Companies,
  Dashboard,
  LiveData,
  Portfolios,
  Transactions,
} from "./pages/index.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/portfolio" element={<Portfolios />} />
          <Route path="/live-data" element={<LiveData />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
