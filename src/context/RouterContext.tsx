import React, { createContext, useContext, useEffect, useState } from "react";

type RoutePath = "/" | "/daycare" | "/therapy" | "/visit" | "/privacy" | "/admin";

interface RouterContextValue {
  currentPath: string;
  navigate: (path: string) => void;
  visitPresetProgram?: "daycare" | "therapy" | "not_sure";
  setVisitPresetProgram: (p?: "daycare" | "therapy" | "not_sure") => void;
}

const RouterContext = createContext<RouterContextValue | null>(null);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const p = window.location.pathname;
      return p || "/";
    }
    return "/";
  });

  const [visitPresetProgram, setVisitPresetProgram] = useState<
    "daycare" | "therapy" | "not_sure" | undefined
  >(undefined);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || "/");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, "", path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <RouterContext.Provider
      value={{
        currentPath,
        navigate,
        visitPresetProgram,
        setVisitPresetProgram,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export function useRouter(): RouterContextValue {
  const ctx = useContext(RouterContext);
  if (!ctx) {
    throw new Error("useRouter must be used within a RouterProvider");
  }
  return ctx;
}
