import { useEffect, useState } from "react";
import AdminPage from "./pages/AdminPage";
import GroupAPage from "./pages/GroupAPage";
import GroupBPage from "./pages/GroupBPage";
import HomePage from "./pages/HomePage";

export default function App() {
  const [route, setRoute] = useState(window.location.pathname);

  useEffect(() => {
    const handler = () => setRoute(window.location.pathname);
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  if (route === "/admin") return <AdminPage />;
  if (route === "/group-a") return <GroupAPage />;
  if (route === "/group-b") return <GroupBPage />;
  return <HomePage />;
}
