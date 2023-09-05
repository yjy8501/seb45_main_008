import styled from 'styled-components';
import googleLogo from '../../asset/images/GoogleLogo.svg'; 
import kakaoLogo from '../../asset/images/KakaoLogo.svg';  
import axios from 'axios';

// OAuth 로그인 모달 컴포넌트
const OAuthLoginModal: React.FC<LoginModalProps> = ({ onClose, onEmailLoginClick, onEmailSignupClick }) => {
    // 텍스트 상수
    const titleText = "로그인";
    const googleLoginText = "구글로 로그인";
    const kakaoLoginText = "카카오로 로그인";
    const orText = "또는";
    const emailLoginText = "이메일로 로그인";
    const emailSignupText = "이메일로 회원가입";

    // 구글 로그인 핸들러
    const handleGoogleLogin = async () => {
      try {
          const response = await axios.post('http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com/oauth2/authorization/google');
          if (response.status === 200) {
              console.log("Successfully logged in with Google!");
              onClose();
          } else {
              console.error("Error logging in with Google");
          }
      } catch (error) {
          console.error("Error logging in with Google:", error);
      }
    };
  
    // 카카오 로그인 핸들러
    const handleKakaoLogin = async () => {
      try {
          const response = await axios.post('http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com/oauth2/authorization/kakao');
          if (response.status === 200) {
              console.log("Successfully logged in with Kakao!");
              onClose();
          } else {
              console.error("Error logging in with Kakao");
          }
      } catch (error) {
          console.error("Error logging in with Kakao:", error);
      }
    };
  
    // 모달 반환
    return (
      <ModalBackground>
        <ModalContainer>
          <CloseButton onClick={onClose}>&times;</CloseButton>
          <Title>{titleText}</Title>
          <GoogleButton onClick={handleGoogleLogin}>
            <LogoImage src={googleLogo} alt="Google Logo" />
            {googleLoginText}
          </GoogleButton>
          <KakaoButton onClick={handleKakaoLogin}>
            <LogoImage src={kakaoLogo} alt="Kakao Logo" />
            {kakaoLoginText}
          </KakaoButton>
          <OrText>{orText}</OrText>
          <EmailButtonsContainer>
            <EmailButton onClick={onEmailLoginClick}>{emailLoginText}</EmailButton>
            <EmailButton onClick={onEmailSignupClick}>{emailSignupText}</EmailButton> 
          </EmailButtonsContainer>
        </ModalContainer>
      </ModalBackground>
    );
};

export default OAuthLoginModal;

// 로그인 모달 인터페이스
interface LoginModalProps {
    onClose: () => void;
    onEmailLoginClick: () => void;
    onEmailSignupClick: () => void;
    onWatchListClick: () => void;
    onHoldingsClick: () => void;
}

// 스타일 컴포넌트
const OrText = styled.span`
  margin: 20px 0;
  color: grey;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 1.6rem;
  font-weight: 400;
`;

const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.div`
  position: relative;
  background-color: white;
  padding: 20px;
  width: 400px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #FFFFFF;
  border: 1px solid lightgray;
  font-size: 1.5rem;
  cursor: pointer;
`;

const OAuthButton = styled.button`
  margin: 10px 0;
  padding: 10px 20px;
  background-color: #FFFFFF;
  border: 1px solid lightgray;
  border-radius: 5px;
  cursor: pointer;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GoogleButton = styled(OAuthButton)``;

const KakaoButton = styled(OAuthButton)``;

const EmailButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin: 5px 0;
`;

const EmailButton = styled.button`
  margin: 5px 0;
  padding: 10px 20px;
  background-color: #FFFFFF;
  border: 1px solid lightgray;
  border-radius: 5px;
  cursor: pointer;
`;

const LogoImage = styled.img`
  margin-right: 30px;
  width: 60px;
  height: auto;
`;
