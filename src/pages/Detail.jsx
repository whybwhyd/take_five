// 하트에서 숫자가 출력되기 전에
// 공간이 없으므로 밀리는게 보기 안좋다

import React, { useEffect, useRef, useState } from 'react';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import { InnerBox, Wrap, WriteBtn } from './Write';
import { MyInfo, InfoBox } from '../style/DetailStyled';
import { useNavigate, useParams } from 'react-router-dom';
import LikeImg from '../images/Like.svg';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { onAuthStateChanged } from 'firebase/auth';
import { decode } from 'url-safe-base64';

function Detail() {
  const navigate = useNavigate();
  const param = useParams();
  const paramEmail = param.email.split('&')[0];
  const paramId = param.email.split('&')[1];
  const dispatch = useDispatch();

  onAuthStateChanged(auth, (users) => {});

  const deleteIdRef = useRef('');
  const editIdRef = useRef('');

  const [userInfo, setUserInfo] = useState({});

  // firestore에서 infos, users 데이터 읽기

  useEffect(() => {
    const fetchData = async () => {
      const dbInfos = query(collection(db, 'infos'));
      const dbUsers = query(collection(db, 'users'));

      const querySnapshotInfo = await getDocs(dbInfos);
      const querySnapshotUser = await getDocs(dbUsers);

      const initialInfos = [];
      const initialUsers = [];

      querySnapshotInfo.forEach((doc) => {
        initialInfos.push({ id: doc.id, ...doc.data() });
      });
      querySnapshotUser.forEach((doc) => {
        initialUsers.push({ id: doc.id, ...doc.data() });
      });

      const filterInfo = initialInfos.filter((info) => {
        if (info.email === atob(decode(paramEmail)) && info.id === paramId) {
          return info;
        }
      });
      initialUsers.filter((user) => {
        if (user.email === atob(decode(paramEmail))) {
          setUserInfo({ ...user, ...filterInfo[0] });
        }
      });

      const userEmail = auth.currentUser.email;
      if (userEmail !== atob(decode(paramEmail))) {
        deleteIdRef.current.style.display = 'none';
        editIdRef.current.style.display = 'none';
      } else {
        deleteIdRef.current.style.display = 'inline-block';
        editIdRef.current.style.display = 'inline-block';
      }
    };
    fetchData();
  }, []);

  // firestore 데이터 삭제 부분
  const {
    company,
    goodBad,
    grow,
    motive,
    like,
    title,

    introduce,
    name,
    spec,
    imgFile,
  } = userInfo;

  const deleteInfo = async (event) => {
    if (confirm('삭제하시겠습니까?')) {
      const todoRef = doc(db, 'infos', userInfo.id);
      console.log(todoRef);
      await deleteDoc(todoRef);
      navigate('/list');
    }
  };

  // 리덕스 사용
  const editDetail = () => {
    dispatch({
      type: 'EDIT_DETAIL',
      payload: userInfo,
    });
  };
  const [render, setRender] = useState(userInfo.like);
  const updateInfo = async (event) => {
    const updatedLike = Number(userInfo.like) + 1;
    const infoRef = doc(db, 'infos', userInfo.id);
    await updateDoc(infoRef, { ...userInfo, like: updatedLike });

    // 여기서 seUserInfo의 값을 바꿔줌에따라, 페이지가 리렌더링된다.
    setUserInfo((prevUserInfo) => ({ ...prevUserInfo, like: updatedLike }));
  };

  return (
    <Wrap>
      <InnerBox>
        {/* my page 내용 */}
        <MyInfo>
          {/* 추가부분 라이크 박스 */}
          <img src={imgFile ?? '/user.png'} alt="프로필 사진" />
          <div className="myInfo_text">
            <StLikeSpan>
              <img onClick={updateInfo} src={LikeImg} alt="하트모양 이미지" />
              {like}
            </StLikeSpan>
            <dl>
              <dt>Name</dt>
              <dd>{name}</dd>
            </dl>
            <dl>
              <dt>spec</dt>
              <dd>{spec}</dd>
            </dl>
            <dl>
              <dt>Introduce</dt>
              <dd>{introduce}</dd>
            </dl>
          </div>
        </MyInfo>
        <StLineHr></StLineHr>
        {/* write 내용 */}
        <InfoBox>
          <h2>{title}</h2>
          <dl>
            <dt>본인이 지원하고자 하는 회사란?</dt>
            <dd>{company}</dd>
          </dl>
          <dl>
            <dt>지원하게 된 동기?</dt>
            <dd>{motive}</dd>
          </dl>
          <dl>
            <dt>자신의 성장과정</dt>
            <dd>{grow}</dd>
          </dl>
          <dl>
            <dt>자신의 장단점</dt>
            <dd>{goodBad}</dd>
          </dl>
        </InfoBox>

        {/* 수정, 삭제 버튼 */}
        <WriteBtn>
          <button
            onClick={() => {
              editDetail();
              navigate(`/editdetail/${userInfo.id}`);
            }}
            ref={editIdRef}
          >
            수정
          </button>
          <button onClick={deleteInfo} ref={deleteIdRef}>
            삭제
          </button>
          <button
            onClick={() => {
              navigate('/list');
            }}
          >
            이전페이지
          </button>
        </WriteBtn>
      </InnerBox>
    </Wrap>
  );
}

export default Detail;

const StLikeSpan = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  & img {
    background: none;
    transition: all 8s;
    cursor: pointer;
    width: 30px;
    margin-right: 15px;
    &:active {
      transform: rotateY(18560deg);
      background: magenta;
    }
  }
`;

const StLineHr = styled.hr`
  margin-top: 80px;
  border: 1px solid #214047;
`;
