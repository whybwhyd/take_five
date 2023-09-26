import React from 'react';
import * as H from '../style/HomeStyled';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from '../components/Sidebar';

function Home() {
  const email = useSelector((state) => {
    return state.LoginModule.email;
  });
  const password = useSelector((state) => {
    return state.LoginModule.password;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      dispatch({ type: 'CHANGE_EMAIL', payload: value });
    }
    if (name === 'password') {
      dispatch({ type: 'CHANGE_PASSWORD', payload: value });
    }
  };

  return (
    <H.Grid>
      <H.GlobalStyle />
      <Sidebar width={400}>
        <H.Login>
          <H.Form>
            <H.LoginName>LOGIN</H.LoginName>
            <div>
              <div>
                <H.ID>아이디</H.ID>
              </div>
              <H.Input
                type="email"
                placeholder="이메일을 입력해주세요"
                value={email}
                name="email"
                onChange={onChange}
              />

              <br />
              <div>
                <H.PW>비밀번호</H.PW>
              </div>
              <H.Input
                type="password"
                placeholder="비밀번호를 입력해주세요"
                value={password}
                name="password"
                onChange={onChange}
              />
            </div>
            <div>
              <H.SignButton
                type="button"
                onClick={() => {
                  navigate('/register');
                }}
              >
                회원가입
              </H.SignButton>
              <H.LoginButton
                type="submit"
                onClick={async (event) => {
                  event.preventDefault();
                  if (!email || !password) {
                    alert('빈칸을 채워주세요!');
                  } else {
                    try {
                      const userCredential = await signInWithEmailAndPassword(
                        auth,
                        email,
                        password
                      );
                      navigate('/list');
                      dispatch({ type: 'CLEAR' });
                    } catch (error) {
                      console.error(error);
                    }
                  }
                }}
              >
                로그인
              </H.LoginButton>
            </div>
          </H.Form>
        </H.Login>
      </Sidebar>
    </H.Grid>
  );
}
export default Home;
