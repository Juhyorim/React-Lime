import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";

import LoginPage from "@pages/login/index";
import SignupPage from "@pages/signupPage/index";

import IntroPage from "@pages/intro/index";
import ImageSplashPage from "@pages/imageSplash/index";
import TicoPage from "@pages/tico/index";
import PracPage from "@pages/reactprac/index";

import BookmarkPage from "@pages/bookmark/index";
import ChartPage from "@pages/busPlot/index";
import MyPage from "@/pages/mypage/index";
import TicoMyPage from "@pages/ticoMypage/index";

// import MainPage from "@pages/index/index";
const MainPage = React.lazy(() => import("@pages/index/index"));

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          {/* 메인페이지 */}
          <Route index path="/" element={<MainPage />}></Route>

          {/* 인증인가 */}
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>

          {/* 링크 */}
          <Route path="/intro" element={<IntroPage />}></Route>
          <Route path="/imageSplash" element={<ImageSplashPage />}></Route>
          <Route path="/tico" element={<TicoPage />}></Route>
          <Route path="/reactprac" element={<PracPage />}></Route>
          <Route path="/mypage" element={<MyPage />}></Route>

          {/* 이미지스플래시 */}
          <Route
            path="/imageSplash/search/:id"
            element={<ImageSplashPage />}
          ></Route>
          <Route path="/bookmark" element={<BookmarkPage />}></Route>

          {/* 티코 */}
          <Route path="/chart" element={<ChartPage />}></Route>
          <Route path="/tico/mypage" element={<TicoMyPage />}></Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
