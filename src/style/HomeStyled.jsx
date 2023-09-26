import styled, { createGlobalStyle } from 'styled-components';
import Home from '../images/Home.png';

export const GlobalStyle = createGlobalStyle` 
  /* 전역스타일링으로 비율을 달리해도 꽉찬 화면으로 보이게 합니다. */
  body{
  justify-content: center;
  background-image: url(${Home});
  background-position:50% 30%;/*이미지 가로 세로 위치 */
  background-size: cover;  /*이미지를 화면에 맞게 조절합니다. */
  background-repeat: no-repeat; /* 사진이 반복되지 않도록 합니다. */
  }
  `;
export const Grid = styled.span`
  display: grid;
  grid-template-columns: 1fr 1fr 280px 50px;
  grid-template-rows: 50px 2fr 30px;
  width: 1400px;
  height: 600px;
  align-items: center;
  max-width: 1400px;
`;
export const Login = styled.div`
  border: none;
  border-radius: 4px;
  background-color: white;
  color: black;
  padding: 20px;
  margin-left: 40px;
  width: 250px;
  height: 300px;
  display: grid;
  font-weight: bolder;
  box-shadow: 5px 5px 5px;
`;
export const LoginName = styled.p`
  text-align: center;
`;
export const ID = styled.p`
  font-size: 15px;
  margin: 10px;
`;
export const PW = styled.p`
  font-size: 15px;
  margin: 10px;
`;
export const Form = styled.form`
  display: grid;
  border: none;
  justify-items: center;
`;

export const Input = styled.input`
  background-color: white;
  border: none;
  border-bottom: 2px solid black;
  margin: 10px;
  height: 30px;
  width: 200px;
  &::placeholder {
    color: black;
    font-weight: bold;
  }
  &:focus {
    outline: none;
  }
`;

export const SignButton = styled.button`
  background-color: #6c8383;
  align-self: center;
  justify-self: center;
  width: 70px;
  height: 30px;
  margin-right: 5px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  box-shadow: 2px 2px 2px;
  &:active {
    background-color: #33464a;
  }
`;
export const LoginButton = styled.button`
  background-color: #6c8383;
  width: 70px;
  height: 30px;
  margin-left: 5px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  box-shadow: 2px 2px 2px;
  &:active {
    background-color: #33464a;
  }
`;
export const sidebar = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  transition: 0.4s ease;
  color: #202020;
  height: 100%;
  z-index: 99;
`;
export const button = styled.button`
  background-color: transparent;
  color: white;
  font-size: 17px;
  font-weight: bolder;
  border: 1px solid transparent;
  position: relative;
  left: -200px;
  top: 10px;
  width: 90px;
  height: 30px;
  z-index: 99;
  transition: 0.4s ease;
  overflow: hidden;
`;

export const content = styled.div`
  padding: 40px 40px 0 20px;
  position: relative;
  width: 100%;
`;
