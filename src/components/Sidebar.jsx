import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '../style/HomeStyled';

const Sidebar = ({ width = 300, children }) => {
  const [isOpen, setOpen] = useState(false);
  const [xPosition, setX] = useState(-width);
  const side = useRef();

  const toggleMenu = () => {
    if (xPosition < 0) {
      setX(0);
      setOpen(true);
    } else {
      setX(-width);
      setOpen(false);
    }
  };

  const handleClose = async (e) => {
    let sideArea = side.current;
    let sideCildren = side.current.contains(e.target);
    if (isOpen && (!sideArea || !sideCildren)) {
      await setX(-width);
      await setOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClose);
    return () => {
      window.removeEventListener('click', handleClose);
    };
  });

  const navigate = useNavigate();

  return (
    <div>
      <S.sidebar
        ref={side}
        style={{
          width: `${width}px`,
          height: '100%',
          transform: `translatex(${-xPosition}px)`,
        }}
      >
        <S.button
          onClick={() => {
            navigate('/register');
          }}
        >
          {isOpen ? <span></span> : <span>Sign up</span>}
        </S.button>
        <S.button onClick={() => toggleMenu()}>
          {isOpen ? (
            <span style={{ color: '#fff', fontSize: '30px' }}> &gt;&gt;</span>
          ) : (
            <span>Login</span>
          )}
        </S.button>

        <S.content>{children}</S.content>
      </S.sidebar>
    </div>
  );
};

export default Sidebar;
