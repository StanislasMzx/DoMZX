import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Page404 from "./pages/Page404";
import Login from "./pages/Login";
import PageTimer from "./pages/PageTimer";
import PageLogs from "./pages/PageLogs";
import Settings from "./pages/Settings";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route index element={<Index />} />
          <Route path="/timer" element={<PageTimer />} />
          <Route path="/logs" element={<PageLogs />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}

export default App;
