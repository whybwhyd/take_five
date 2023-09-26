import React, { useCallback } from 'react';
import * as S from '../style/RegisterStyled';
import { LoginButton } from '../style/RegisterStyled';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';

function Register() {
  const {
    email,
    password,
    passwordCheck,
    nickName,
    emailMessage,
    passwordMessage,
    passwordCheckMessage,
    nickNameMessage,
    isEmail,
    isNickName,
    isPassword,
    isPasswordCheck,
  } = useSelector((state) => state.LoginModule);

  const dispatch = useDispatch();
  const onChangeEmail = useCallback((event) => {
    dispatch({ type: 'CHANGE_EMAIL', payload: event.target.value });
    dispatch({
      type: 'CHANGE_EMAIL_MESSAGE',
      payload: event.target.value,
    });
  }, []);

  const onChangeNickname = useCallback((event) => {
    dispatch({ type: 'CHANGE_NICKNAME', payload: event.target.value });
    dispatch({
      type: 'CHANGE_NICKNAME_MESSAGE',
      payload: event.target.value,
    });
  }, []);

  const onChangePassword = useCallback((event) => {
    dispatch({ type: 'CHANGE_PASSWORD', payload: event.target.value });
    dispatch({
      type: 'CHANGE_PASSWORD_MESSAGE',
      payload: event.target.value,
    });
  }, []);
  const onChangePasswordCheck = useCallback(
    (event) => {
      dispatch({ type: 'CHANGE_PASSWORDCHECK', payload: event.target.value });
      dispatch({
        type: 'CHANGE_PASSWORDCHECK_MESSAGE',
        payload: event.target.value,
      });
    },
    [password]
  );
  const navigate = useNavigate();
  return (
    <S.Grid>
      <S.Left />
      <S.Right />
      <S.Login>
        <S.Form>
          <div>
            <S.InputName>이메일</S.InputName>
            <S.Input
              type="text"
              placeholder="email@talentconnect.com"
              value={email}
              name="email"
              onChange={onChangeEmail}
            />

            <S.InputMessage>
              {email.length > 0 && (
                <span className={`${isEmail ? 'error' : 'success'}`}>
                  {emailMessage}
                </span>
              )}
            </S.InputMessage>
            <br />
            <S.InputName>닉네임</S.InputName>
            <S.Input
              type="text"
              placeholder="nickname"
              value={nickName}
              name="nickName"
              onChange={onChangeNickname}
            />
            <S.InputMessage>
              {nickName.length > 0 && (
                <span className={`${isNickName ? 'error' : 'success'}`}>
                  {nickNameMessage}
                </span>
              )}
            </S.InputMessage>
            <br />
            <S.InputName>비밀번호</S.InputName>
            <S.Input
              type="password"
              placeholder="password"
              value={password}
              name="password"
              onChange={onChangePassword}
            />
            <S.InputMessage>
              {password.length > 0 && (
                <span className={`${isPassword ? 'error' : 'success'}`}>
                  {passwordMessage}
                </span>
              )}
            </S.InputMessage>
            <br />
            <S.InputName>비밀번호 확인</S.InputName>

            <S.Input
              type="password"
              placeholder="password"
              value={passwordCheck}
              name="passwordCheck"
              onChange={onChangePasswordCheck}
            />
            <S.InputMessage>
              {passwordCheck.length > 0 && (
                <span className={`${isPasswordCheck ? 'error' : 'success'}`}>
                  {passwordCheckMessage}
                </span>
              )}
            </S.InputMessage>
          </div>
          <S.LoginCenter>

            <LoginButton
              type="submit"
              onClick={async (event) => {
                event.preventDefault();

                if (!email || !nickName || !passwordCheck || !password) {
                  alert('빈칸을 채워주세요!');
                } else {
                  try {
                    const userCredential = await createUserWithEmailAndPassword(
                      auth,
                      email,
                      password
                    );
                    const collectionRef = collection(db, 'users');
                    await addDoc(collectionRef, {
                      email: email,
                      nickName: nickName,
                    });
                    navigate('/AddProfile/', {
                      state: { email: email, nick: nickName },
                    });

                    dispatch({ type: 'CLEAR' });
                  } catch (error) {
                    console.error(error);
                  }
                }
              }}
            >
              가입하기
            </LoginButton>
          </S.LoginCenter>
        </S.Form>
      </S.Login>
    </S.Grid>
  );
}

export default Register;
