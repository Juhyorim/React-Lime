import { useEffect, useRef, useState } from "react";
import styles from "./styles/index.module.scss";
// import axios from "axios";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { userInfoAtom } from "@/recoil/atoms/userInfoAtom";
import GlobalHeader from "@/components/common/header/GlobalHeader";

function index() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);

  useEffect(() => {
    // console.log(inputRef.current);
    if (userInfo.token !== "") {
      alert("이미 로그인되어있습니다.");
      navigate("/");
      return;
    }

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const login = async () => {
    if (inputRef.current && passwordInputRef.current) {
      // await axios
      //   .post(`http://localhost:8080/api/v1/login`, {
      //     username: inputRef.current.value,
      //     password: passwordInputRef.current.value,
      //   })
      //   .then((response) => {
      //     console.log(response);
      //     console.log(response.data);

      //     if (response.status === 200) {
      //       console.log("로그인 성공");
      //     }

      //     setUserInfo({
      //       username: response.data.username,
      //       email: response.data.email,
      //       nickname: response.data.nickname,
      //       token: response.data.token,
      //     });

      //     alert(`환영합니다. ${response.data.nickname}`);

      //     navigate("/");
      //   })
      //   .catch((error) => {
      //     console.log(error.response);
      //   });

      const userStub = {
        username: "asdf",
        nickname: "asdf",
        email: "asdf",
        token:
          "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2RmIiwiaWF0IjoxNzQ2ODA0OTM1LCJleHAiOjE3NDY4MTY5MzUsInRva2VuX3R5cGUiOiJhY2Nlc3MifQ.J2Zl_Pv9Srxe_7I16uqOGMsuyGN1a98r_940unsqvHg",
      };

      setUserInfo({
        username: userStub.username,
        email: userStub.email,
        nickname: userStub.nickname,
        token: userStub.token,
      });

      alert(`환영합니다. ${userStub.nickname}`);

      navigate("/");

      inputRef.current.focus();
    } else {
      console.log("elselesle");
    }
  };

  return (
    <>
      {/* 헤더 */}
      <GlobalHeader />

      <div
        className={styles.page}
        style={{
          backgroundColor: "white",
          color: "black",
        }}
      >
        <div className={styles.page_padding} />
        <div className={styles.page_login}>
          <div className={styles.page_login_desc}>안녕하세요. 환영합니다!</div>
          <input
            ref={inputRef}
            className={styles.page_login_inputBox}
            type="text"
            placeholder="username"
          />
          <input
            ref={passwordInputRef}
            className={styles.page_login_inputBox}
            type="text"
            placeholder="password"
          />
          <button className={styles.page_login_btn} onClick={login}>
            로그인
          </button>

          <div className={styles.page_login_desc}>
            아직 회원이 아니신가요?{" "}
            <span
              style={{
                textDecoration: "underline",
                cursor: "pointer",
                color: "#4d40c7",
              }}
              onClick={() => navigate("/signup")}
            >
              회원가입 하러가기
            </span>
          </div>
        </div>

        <div className={styles.page_padding} />

        {/* <FlowerBlock /> */}
      </div>
    </>
  );
}

export default index;
