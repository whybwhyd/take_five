import React, { useState, useRef, useEffect } from 'react';
import './../style/EditProfile.css';
import { auth, db } from '../firebase';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  doc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../redux/modules/UserInfo';

function AddProfile() {
  let [isInputClickedName, setIsInputClickedName] = useState(false);
  let [isInputClickedNick, setIsInputClickedNick] = useState(false);
  let [isInputClickedIntro, setIsInputClickedIntro] = useState(false);
  let [isInputClickedSpec, setIsInputClickedSpec] = useState(false);

  const [name, setName] = useState('');
  let [nickName, setNickName] = useState('');
  const [introduce, setIntroduce] = useState('');
  const [spec, setSpec] = useState('');
  const [imgFile, setImgFile] = useState(null);
  const imgRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userInfo);

  const location = useLocation();
  const email = location.state.email;
  nickName = location.state.nick;

  useEffect(() => {
    onAuthStateChanged(auth, (users) => {
      console.log(users);
    });
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const dbUsers = query(collection(db, 'users'), where('email', '==', email));

    const usersData = [];

    const userSnapshot = await getDocs(dbUsers);
    userSnapshot.forEach((doc) => {
      usersData.push({ id: doc.id });
    });
    dispatch(getUserInfo(...usersData));
  };

  const saveName = (event) => {
    setName(event.target.value);
  };

  const saveNickName = (event) => {
    setNickName(event.target.value);
  };

  const saveIntro = (event) => {
    setIntroduce(event.target.value);
  };

  const saveSpec = (event) => {
    setSpec(event.target.value);
  };

  const saveImgFile = async () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };
  const deleteImg = () => {
    setImgFile('');
  };

  const navigate = useNavigate();
  return (
    <div className="upload">
      <h2 className="profile_title">프로필 설정</h2> <br />
      <p className="guide_coment">
        고객과 회사에게 보여지는 정보를 설정해주세요.
      </p>
      <br />
      <div className="editbox">
        <div className="divUP">
          <img
            className="profileImg"
            src={imgFile ? imgFile : '/user.png'}
            alt="이미지 수정"
          />
          <br />
          <div className="imgUpload">
            <label className="input-profileImg-label" htmlFor="inputprofileImg">
              사진 넣기
            </label>
            <form>
              <input
                id="inputprofileImg"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={saveImgFile}
                ref={imgRef}
              />
            </form>
            <label
              className="delete-profileImg-label"
              htmlFor="deleteprofileImg"
            >
              삭제
            </label>
            <input
              id="deleteprofileImg"
              type="button"
              up
              onClick={deleteImg}
            ></input>
          </div>
          <br />
          <br />
        </div>
        <div className="editlist">
          <div className="divname">
            이름
            <input
              className="inputName"
              onFocus={() => {
                setIsInputClickedName(true);
              }}
              onBlur={() => {
                setIsInputClickedName(false);
              }}
              placeholder={
                isInputClickedName === true ? '' : '이름을 입력해주세요.'
              }
              type="text"
              value={name}
              onChange={saveName}
            ></input>
          </div>
          <div className="divnick">
            닉네임
            <input
              className="inputNick"
              onFocus={() => {
                setIsInputClickedNick(true);
              }}
              onBlur={() => {
                setIsInputClickedNick(false);
              }}
              placeholder={
                isInputClickedNick === true ? '' : '닉네임을 입력해주세요.'
              }
              type="text"
              value={nickName}
              onChange={saveNickName}
            ></input>
          </div>
          <div className="divintro">
            소개글
            <input
              className="inputIntro"
              onFocus={() => {
                setIsInputClickedIntro(true);
              }}
              onBlur={() => {
                setIsInputClickedIntro(false);
              }}
              placeholder={
                isInputClickedIntro === true ? '' : '소개글을 입력해주세요.'
              }
              type="text"
              value={introduce}
              onChange={saveIntro}
            ></input>
          </div>
          <div className="divsp">
            자기 스펙
            <input
              className="inputSpec"
              onFocus={() => {
                setIsInputClickedSpec(true);
              }}
              onBlur={() => {
                setIsInputClickedSpec(false);
              }}
              placeholder={
                isInputClickedSpec === true ? '' : '자기스펙을 입력해주세요.'
              }
              type="text"
              value={spec}
              onChange={saveSpec}
            ></input>
          </div>
        </div>
      </div>
      <br />
      <div className="buttonbox">
        <button
          className="finishbtn"
          onClick={async () => {
            try {
              const updateInfoRef = doc(db, 'users', user.id);
              await updateDoc(updateInfoRef, {
                name,
                nickName,
                introduce,
                spec,
                imgFile,
              });

              console.log('Document written with ID: ', updateInfoRef.id);
            } catch (e) {
              console.error('Error adding document: ', e);
            }
            alert('프로필이 저장되었습니다.🎉');
            navigate('/list');
          }}
        >
          저장
        </button>
        <button
          className="cancelbtn"
          onClick={() => {
            navigate('/');
          }}
        >
          취소
        </button>
      </div>
    </div>
  );
}

export default AddProfile;
