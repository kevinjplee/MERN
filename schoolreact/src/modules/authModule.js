import { createAction, handleActions} from 'redux-actions';
import isEmpty from 'is-empty';
import setAuthToken from '../utils/setAuthToken';

// 액션 타입
const USER_LOGOUT = "auth/USER_LOGOUT"
const USER_LOADING = "auth/USER_LOADING";
const SET_CURRENT_USER = "auth/SET_CURRENT_USER";

//액션 생성 함수
export const userLogout = createAction(USER_LOGOUT)
export const userLoading = createAction(USER_LOADING);
export const setCurrentUser = createAction(SET_CURRENT_USER, decoded => decoded);

//초기 상태
const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false
};

export default handleActions({
    [USER_LOGOUT]: (state, action) =>{
        localStorage.removeItem("jwtToken");
        setAuthToken(false);
        return{...state,
        isAuthenticated:false,
        user: {}
        };
    },
    [SET_CURRENT_USER]: (state, action) => {
        return {...state, 
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
        };
    },
    [USER_LOADING]: (state, action) => {
        return {...state,
        loading: true}
    },
}, initialState);