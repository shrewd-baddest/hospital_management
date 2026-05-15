import React, { useEffect } from "react";
import { useContext } from "react";
import { createContext, useState } from "react";

const styleProvider = createContext();
export const StylingProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(16);
  const [themes, setThemes] = useState("light");
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const urls = {
    admin: "http://localhost:3000/webpages/dashboard",
    doctor: "http://localhost:3000/webpages/doctor/dashboard",
    nurse: "http://localhost:3000/webpages/nurse/dashboard",
    patient: "http://localhost:3000/webpages/patient/dashboard",
  };
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--app-font-size",
      `${fontSize}px`,
    );
  }, [fontSize]);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themes);
  }, [themes]);
  const fontSetter = (font) => {
    setFontSize(font);
  };
  const themeSetter = (theme) => {
    setThemes(theme);
  };

  const fetchDashboard = async (role) => {
    try {
      const response = await fetch(urls[role], {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to fetch");

      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error("Dashboard error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <styleProvider.Provider
      value={{ fontSetter, themeSetter, fetchDashboard, data, loading }}
    >
      {children}
    </styleProvider.Provider>
  );
};

export const useStyles = () => useContext(styleProvider);
