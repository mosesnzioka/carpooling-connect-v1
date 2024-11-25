import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import HomePage from "./pages/Home/home";
import SignInPage from "./pages/SignIn/SignInPage";
import SignUpPage from "./pages/SignUp/SignUp";
import Fullpool from "./components/fullpool/fullpool";

import Createpoolpage from "./pages/createpoolpage/createpoolpage";

import "./App.css";

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/pools" element={<Createpoolpage />} />
          <Route path="/pool/:id" element={<Fullpool />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
