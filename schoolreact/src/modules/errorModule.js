import { createAction, handleActions } from 'redux-actions';

//액션타입
const GET_ERRORS = "error/GET_ERRORS";

//액션 생성함수
export const getErrors = createAction(GET_ERRORS);

const initialState = {};

export default handleActions({
[GET_ERRORS]: (state, action) => {
    return action.payload;
}
}, initialState);