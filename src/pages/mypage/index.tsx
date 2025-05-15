import GlobalHeader from "@/components/common/header/GlobalHeader";
import { userInfoAtom } from "@/recoil/atoms/userInfoAtom";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

function index() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);

  const logout = () => {
    setUserInfo({
      username: "",
      email: "",
      nickname: "",
      token: "",
    });

    navigate("/");
  };

  return (
    <>
      <GlobalHeader />
      <div style={{ margin: "20px" }}>
        <h2>전역 mypage</h2>
        <br />
        <div>아이디: {userInfo.username}</div>
        <div>이메일: {userInfo.email}</div>
        <div>비밀번호 수정</div>
        <br />
        <button onClick={() => logout()}>로그아웃</button>
      </div>
    </>
  );
}

export default index;
