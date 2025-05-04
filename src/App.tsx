import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import BookmarkPage from "@pages/bookmark/index";
import PracPage from "@pages/reactprac/index";
import LoginPage from "@pages/login/index";
import ImageSplashPage from "@pages/imageSplash/index";

// import MainPage from "@pages/index/index";
const MainPage = React.lazy(() => import("@pages/index/index"));

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<MainPage />}></Route>
          <Route path="/search/:id" element={<MainPage />}></Route>
          <Route path="/bookmark" element={<BookmarkPage />}></Route>
          <Route path="/reactprac" element={<PracPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/imageSplash" element={<ImageSplashPage />}></Route>
          <Route path="/tico" element={<ImageSplashPage />}></Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
