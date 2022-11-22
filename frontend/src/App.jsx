import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Index from "./pages/Index";
import Page404 from "./pages/Page404";
import Login from "./pages/Login";
import Timer from "./pages/Timer";
import PageLogs from "./pages/PageLogs";
import Settings from "./pages/Settings";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route index element={<Index />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/logs" element={<PageLogs />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
