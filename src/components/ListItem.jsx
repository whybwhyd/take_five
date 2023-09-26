import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LikeImg from '../images/Like.svg';
import userDefault from '../images/userDefault.svg';
import heart from '../images/heart_.svg';
import { encode } from 'url-safe-base64';
import loading from '../images/loading.gif';

const ListItem = ({ lists }) => {
  const imgLike = 'https://i.postimg.cc/59qL9m7h/jordy4.webp';
  return (
    <>
      {
        lists.length >= 1 ? (
          lists.map((list, index) => {
            const { imgFile, name, email, company, spec, like, id, title } =
              list;

            return (
              <StListItem key={index}>
                <Link
                  className="link"
                  to={`/detail/${encode(btoa(email))}&${id}`}
                >
                  <StListImgBox className="list-img-box">
                    {imgFile ? (
                      <img src={imgFile} alt="프로필 사진입니다" />
                    ) : (
                      <img src={userDefault} alt="프로필 사진입니다" />
                    )}
                  </StListImgBox>
                  <StListTextBox className="list-text-box">
                    <StLikeSpan>
                      <span>{like}</span>
                      <img
                        src={like > 0 ? heart : LikeImg}
                        alt="하트모양 이미지"
                      />
                    </StLikeSpan>
                    <StHeading3>{title}</StHeading3>
                    <StListTextP>{name}</StListTextP>
                    <StListTextP opacity="0.8">{company}</StListTextP>
                    <StListTextP opacity="0.7" className="list-text-hash">
                      {spec}
                    </StListTextP>
                  </StListTextBox>
                </Link>
              </StListItem>
            );
          })
        ) : (
          <SkeletonUi>
            <div class="loding">
              <svg width="300" height="300" viewBox="0 0 50 50">
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
          </SkeletonUi>
        )
      }
    </>
  );
};
export default ListItem;
const StLikeSpan = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 40px;
  font-size: 20px;
  font-weight: bold;
  z-index: 10;
  & img {
    margin-left: 10px;
    width: 31px;
  }
`;
const StListImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15rem;
  margin-top: 30px;
  margin-bottom: 20px;
  overflow: hidden;

  & > img {
    display: block;
    width: auto;
  }
`;
const StListTextBox = styled.div`
  position: relative;
  padding: 0 40px;
  & p {
    font-size: 1rem;
  }
`;
const StListTextP = styled.p`
  opacity: ${(props) => props.opacity || '1'};
  &:last-child {
    margin-top: 20px;
    padding-bottom: 22px;
  }
`;
const StListItem = styled.li`
  margin: 0 auto;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  background: #fff;
  border-radius: 5px;
  border: 1px solid #464646;
  margin-bottom: 15px;
  width: 346px;

  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
  transition: all 0.3s;
  &:hover {
    transform: translateY(-5px);
  }
`;
const StHeading3 = styled.h3`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
  width: 200px;
  height: 35px;
  overflow: hidden;
  line-height: 35px;
`;

const SkeletonUi = styled.div`
  display: flex;
  width: 1086px;
  height: 500px;
  justify-content: center;
  align-items: center;
  & img {
    display: block;
  }
`;
