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
import { useDispatch } from 'react-redux';
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
  const prevRef = useRef('');

  const [userInfo, setUserInfo] = useState([]);

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
        prevRef.current.style.display = 'inline-block';
      } else {
        deleteIdRef.current.style.display = 'inline-block';
        editIdRef.current.style.display = 'inline-block';
        prevRef.current.style.display = 'inline-block';
      }
    };
    fetchData();
  }, []);

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
      await deleteDoc(todoRef);

      navigate('/list');
    }
  };

  const editDetail = () => {
    dispatch({
      type: 'EDIT_DETAIL',
      payload: userInfo,
    });
  };

  const updateInfo = async (event) => {
    const updatedLike = Number(userInfo.like) + 1;
    const infoRef = doc(db, 'infos', userInfo.id);
    await updateDoc(infoRef, { ...userInfo, like: updatedLike });

    setUserInfo((prevUserInfo) => ({ ...prevUserInfo, like: updatedLike }));
  };
  console.log(userInfo.length === 0 ? 'true' : 'false');
  return (
    <Wrap>
      <InnerBox>
        {userInfo.length === 0 ? (
          <div class="loding">
            <svg width="550" height="400" viewBox="0 0 50 50">
              <path
                opacity="0.2"
                d="M25,2.784C12.73,2.784,2.783,12.73,2.783,25S12.73,47.217,25,47.217S47.217,37.27,47.217,25
	S37.27,2.784,25,2.784z M25,45.161C13.866,45.161,4.839,36.135,4.839,25C4.839,13.866,13.866,4.839,25,4.839
	c11.134,0,20.161,9.026,20.161,20.161C45.161,36.135,36.134,45.161,25,45.161z"
              />
              <path
                fill="#2af598"
                d="M25.029,4.841c1.532,0.002,3.018,0.189,4.452,0.516l0.456-2.015c-1.579-0.359-3.22-0.555-4.908-0.557V4.841z"
              >
                <animateTransform
                  attributeType="xml"
                  attributeName="transform"
                  type="rotate"
                  from="0 25 25"
                  to="360 25 25"
                  dur="0.8s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </div>
        ) : (
          <>
            <MyInfo>
              <img src={imgFile ?? '/user.png'} alt="프로필 사진" />
              <div className="myInfo_text">
                <StLikeSpan>
                  <img
                    onClick={updateInfo}
                    src={LikeImg}
                    alt="하트모양 이미지"
                  />
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
          </>
        )}

        <WriteBtn>
          <button
            className="editBtn"
            onClick={() => {
              editDetail();
              navigate(`/editdetail/${userInfo.id}`);
            }}
            ref={editIdRef}
          >
            수정
          </button>
          <button className="deleteBtn" onClick={deleteInfo} ref={deleteIdRef}>
            삭제
          </button>
          <button
            className="prevBtn"
            onClick={() => {
              navigate(-1);
            }}
            ref={prevRef}
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
    height: 30px;
    margin-right: 15px;
    border: none;
    box-shadow: none;
    &:active {
      transform: rotateY(18560deg);
      background: magenta;
    }
  }
`;

const StLineHr = styled.hr`
  margin-top: 80px;
  border: 1px solid #fff;
`;
