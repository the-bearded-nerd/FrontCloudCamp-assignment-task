import { Routes, Route } from "react-router-dom";
import { Form } from "../pages/Form/Form";
import { MainPage } from "../pages/MainPage/MainPage";
import { NotFound } from "../pages/NotFound/NotFound";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/form" element={<Form />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
