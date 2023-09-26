import React, { useRef, useState } from 'react';
import { InnerBox, Wrap, WriteBox, WriteBtn } from './Write';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { useSelector } from 'react-redux';
import { doc, updateDoc } from 'firebase/firestore';
import { encode } from 'url-safe-base64';

function EditDetail() {
  const userInfo = useSelector((state) => state.editDetail);
  const { title, company, goodBad, grow, motive, date, email, id } = userInfo;

  const navigate = useNavigate();
  const [editTitle, setEditTitle] = useState(title);
  const [editCompany, setEditCompany] = useState(company);
  const [editMotive, setEditMotive] = useState(motive);
  const [editGrow, setEditGrow] = useState(grow);
  const [editGoodBad, setEditGoodBad] = useState(goodBad);

  const titleRef = useRef('');
  const companyRef = useRef('');
  const motiveRef = useRef('');
  const growRef = useRef('');
  const goodBadRef = useRef('');

  const newInfo = {
    email,
    date,
    title: editTitle,
    company: editCompany,
    motive: editMotive,
    grow: editGrow,
    goodBad: editGoodBad,
  };

  const editInfo = async (event) => {
    event.preventDefault();

    if (editTitle === '') {
      alert('제목을 입력해주세요.');
      titleRef.current.focus();
      return false;
    } else if (editCompany === '') {
      alert('"본인이 지원하고자 하는 회사" 내용을 입력해주세요.');
      companyRef.current.focus();
      return false;
    } else if (editMotive === '') {
      alert('"지원하게 된 동기" 내용을 입력해주세요.');
      motiveRef.current.focus();
      return false;
    } else if (editGrow === '') {
      alert('"자신의 성장과정" 내용을 입력해주세요.');
      growRef.current.focus();
      return false;
    } else if (editGoodBad === '') {
      alert('"자신의 장단점" 내용을 입력해주세요.');
      goodBadRef.current.focus();
      return false;
    } else {
      if (confirm('수정하시겠습니까?')) {
        const infoRef = doc(db, 'infos', userInfo.id);
        await updateDoc(infoRef, newInfo);

        navigate(`/detail/${encode(btoa(email))}&${id}`);
      }
    }
  };

  return (
    <Wrap>
      <InnerBox>
        <WriteBox>
          <label className="applyTitle">
            제목
            <textarea
              placeholder="제목을 입력해주세요!"
              value={editTitle}
              onChange={(event) => setEditTitle(event.target.value)}
              ref={titleRef}
            />
          </label>
          <label className="applyCompany">
            본인이 지원하고자 하는 회사란?
            <textarea
              placeholder="자신이 생각한 회사의 이미지를 설명해 어필해보세요!"
              value={editCompany}
              onChange={(event) => setEditCompany(event.target.value)}
              ref={companyRef}
            />
          </label>
          <label>
            지원하게 된 동기?
            <textarea
              placeholder="지원하게 된 동기가 무엇일까요?"
              value={editMotive}
              onChange={(event) => setEditMotive(event.target.value)}
              ref={motiveRef}
            />
          </label>
          <label>
            자신의 성장과정?
            <textarea
              placeholder="자신의 성장과정을 입력해주세요!"
              value={editGrow}
              onChange={(event) => setEditGrow(event.target.value)}
              ref={growRef}
            />
          </label>
          <label>
            자신의 장단점?
            <textarea
              placeholder="자신이 생각하는 자신의 장점과 단점을 입력해주세요!"
              value={editGoodBad}
              onChange={(event) => setEditGoodBad(event.target.value)}
              ref={goodBadRef}
            />
          </label>
        </WriteBox>
        <WriteBtn>
          <button onClick={() => navigate(-1)}>이전</button>
          <button onClick={editInfo}>저장</button>
        </WriteBtn>
      </InnerBox>
    </Wrap>
  );
}

export default EditDetail;
