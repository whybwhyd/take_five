const initialState = {
  email: '',
  password: '',
  passwordCheck: '',
  nickName: '',
  emailMessage: '',
  passwordMessage: '',
  passwordCheckMessage: '',
  nickNameMessage: '',
  isEmail: 'false',
  isNickName: 'false',
  isPassword: 'false',
  isPasswordCheck: 'false',
};

const LoginModule = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_EMAIL':
      return {
        ...state,
        email: action.payload,
      };

    case 'CHANGE_PASSWORD':
      return {
        ...state,
        password: action.payload,
      };
    case 'CHANGE_PASSWORDCHECK':
      return {
        ...state,
        passwordCheck: action.payload,
      };
    case 'CHANGE_NICKNAME':
      return {
        ...state,
        nickName: action.payload,
      };
    case 'CHANGE_EMAIL_MESSAGE':
      const emailRule =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      const emailCurrent = action.payload;
      return {
        ...state,
        emailMessage: !emailRule.test(emailCurrent)
          ? '이메일 형식으로 입력해주세요.'
          : '올바른 이메일 형식입니다.✅',
        isEmail: !emailRule.test(emailCurrent),
      };

    case 'CHANGE_NICKNAME_MESSAGE':
      return {
        ...state,
        nickNameMessage:
          action.payload.length < 2 || action.payload.length > 5
            ? '2글자 이상 5글자 미만으로 입력해주세요.'
            : '올바른 이름 형식입니다.✅',
        isNickName: action.payload.length < 2 || action.payload.length > 5,
      };

    case 'CHANGE_PASSWORD_MESSAGE':
      const passwordRule =
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
      const passwordCurrent = action.payload;
      return {
        ...state,
        passwordMessage: !passwordRule.test(passwordCurrent)
          ? '숫자+영문자+특수문자 조합으로 입력해주세요.'
          : '올바른 비밀번호 형식입니다.✅',
        isPassword: !passwordRule.test(passwordCurrent),
      };
    case 'CHANGE_PASSWORDCHECK_MESSAGE':
      const passwordCheckCurrent = action.payload;
      return {
        ...state,
        passwordCheckMessage:
          state.password !== passwordCheckCurrent
            ? '비밀번호가 다릅니다. 다시 확인해주세요.'
            : '입력한 비밀번호와 일치합니다.✅ ',
        isPasswordCheck: state.password !== passwordCheckCurrent,
      };
    case 'CLEAR':
      return { email: '', password: '', passwordCheck: '', nickName: '' };

    default:
      return state;
  }
};
export default LoginModule;
