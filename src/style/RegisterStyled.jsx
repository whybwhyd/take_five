import styled from 'styled-components';
import left from '../images/left.png';
import right from '../images/right.png';

export const Grid = styled.span`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 20px 1fr 10px;
  grid-gap: 10px;
  align-items: center;
  justify-items: center;
`;
export const Login = styled.div`
  display: grid;
  grid-column: 2/3;
  grid-row: 2/3;
  border-radius: 4px;
  background-color: white;
  padding: 10px;
  margin: 10px;
  width: 350px;
  height: 500px;
  box-shadow: 3px 3px 3px;
`;
export const Form = styled.form`
  display: grid;
  align-self: center;
  justify-self: center;
  border: none;
`;
export const InputName = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-top: 5px;
`;
export const Input = styled.input`
  color: black;
  border: none;
  border-bottom: 2px solid black;
  margin: 10px 0px 20px 0px;
  height: 45px;
  width: 330px;
  &::placeholder {
    font-weight: bold;
  }
  &:focus {
    outline: none;
  }
`;

export const InputMessage = styled.div`
  font-weight: bold;
  font-size: 12px;
  margin-top: -12px;
  margin-bottom: -12px;
  .error {
    color: red;
  }
  .success {
    color: green;
  }
`;
export const LoginCenter = styled.div`
  text-align: center;
`;
export const LoginButton = styled.button`
  background-color: #6c8383;
  width: 100px;
  height: 40px;
  margin-top: 30px;
  margin-left: 5px;
  font-weight: bolder;
  font-size: 15px;
  border: none;
  border-radius: 4px;
  box-shadow: 3px 3px 3px;
  &:focus {
    background-color: #4a666d;
  }
`;

export const Left = styled.img.attrs({ src: `${left}` })`
  z-index: 1;
  grid-column: 2/3;
  grid-row: 1/2;
  margin: 83px 260px 0px 0px;
  width: 125px;
`;
export const Right = styled.img.attrs({ src: `${right}` })`
  z-index: 1;
  grid-column: 2/3;
  grid-row: 3/3;
  margin: -72px -270px 0px 0px;
  width: 125px;
`;
