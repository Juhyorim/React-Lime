import GlobalHeader from "@/components/common/header/GlobalHeader";
import useAuthStore from "@/stores/authStore";
import { useNavigate } from "react-router-dom";

function index() {
  const navigate = useNavigate();
  const { username, nickname, email, logout } = useAuthStore();

  const logoutAction = () => {
    logout();

    navigate("/");
  };

  return (
    <>
      <GlobalHeader />
      <div style={{ margin: "20px" }}>
        <h2>전역 mypage</h2>
        <br />
        <div>아이디: {username}</div>
        <div>닉네임: {nickname}</div>
        <div>이메일: {email}</div>
        <div>비밀번호 수정</div>
        <br />
        <button onClick={logoutAction}>로그아웃</button>
      </div>
    </>
  );
}

export default index;
