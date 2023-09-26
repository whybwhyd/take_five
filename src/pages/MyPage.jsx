import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
  doc,
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { decode, encode } from 'url-safe-base64';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../redux/modules/UserInfo';
import { getUserWrite } from '../redux/modules/UserWrite';
import * as S from '../style/MypageStyled';
import img from './../images/wirteBtn.svg';

function MyPage() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.userInfo);
  const userWrite = useSelector((state) => state.userWrite);

  useEffect(() => {
    fetchUserData();
    fetchInfoData();
  }, []);
  onAuthStateChanged(auth, (users) => {
    // console.log(users);
  });

  const fetchUserData = async () => {
    const dbUsers = query(
      collection(db, 'users'),
      where('email', '==', atob(decode(params.email)))
    );

    const usersData = [];

    const userSnapshot = await getDocs(dbUsers);

    userSnapshot.forEach((doc) => {
      usersData.push(doc.data());
    });

    dispatch(getUserInfo(...usersData));
  };

  const fetchInfoData = async () => {
    const dbWrite = query(
      collection(db, 'infos'),

      where('email', '==', atob(decode(params.email)))
    );

    const writeData = [];

    const writeSnapshot = await getDocs(dbWrite);
    writeSnapshot.forEach((doc) => {
      writeData.push({ id: doc.id, ...doc.data() });
    });
    dispatch(getUserWrite([...writeData]));
  };

  const logout = async (event) => {
    if (confirm('로그아웃 하시겠습니까?')) {
      event.preventDefault();
      await signOut(auth);
      navigate('/');
    }
  };

  const deleteWrite = async (id) => {
    if (confirm('삭제 하시겠습니까?')) {
      const writeRef = doc(db, 'infos', id);
      await deleteDoc(writeRef);
      fetchInfoData();
    }
  };

  return (
    <>
      {userInfo.length === 0 ? (
        <div class="loding">
          <svg width="600" height="400" viewBox="0 0 50 50">
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
        <S.Layout>
          <S.Nav>
            <S.NavBtn onClick={logout}>Log out</S.NavBtn>
            <S.NavBtn onClick={() => navigate(`/list`)}>Back to List</S.NavBtn>
          </S.Nav>
          <S.GridMain>
            <S.ProfileSidebar>
              <S.SidebarText>PROFILE</S.SidebarText>
              <S.SidebarSubText>Let everyone know who you are</S.SidebarSubText>
            </S.ProfileSidebar>
            <S.Container>
              <S.ProfileImg>
                <S.EditBtn
                  onClick={() =>
                    navigate(`/editprofile/${encode(btoa(userInfo.email))}`)
                  }
                >
                  <img src={img} alt="" />
                </S.EditBtn>

                <S.Img src={userInfo.imgFile ?? '/user.png'} alt="" />
                <S.Profile>프로필</S.Profile>
              </S.ProfileImg>
              <S.NickNameBox>
                {userInfo.nickName}
                <br />
                나의 게시물 수 : {userWrite.length} / 게시물 좋아요 수 : ♥{' '}
                {userWrite
                  .map((obj) => Number(obj.like))
                  .reduce((a, b) => a + b, 0)}
              </S.NickNameBox>
              <S.IntroBox>
                <div>소개글</div>
                <div>{userInfo.introduce}</div>
              </S.IntroBox>
              <S.WriteList>
                나의 게시물
                {userWrite.map((obj) => {
                  return (
                    <S.StList key={obj.id}>
                      <S.ListTitle
                        to={`/detail/${encode(btoa(obj.email))}&${obj.id}`}
                      >
                        {obj.title}
                      </S.ListTitle>
                      <S.ListBtnBox>
                        <S.ListLike>♥ {obj.like}</S.ListLike>
                        <S.ListBtn onClick={() => deleteWrite(obj.id)}>
                          삭제
                        </S.ListBtn>
                      </S.ListBtnBox>
                    </S.StList>
                  );
                })}
              </S.WriteList>
            </S.Container>
          </S.GridMain>
        </S.Layout>
      )}
    </>
  );
}

export default MyPage;
