// User state management
import {createSlice} from "@reduxjs/toolkit";
import {getToken, setToken as setTokenUtils, request, removeToken} from "@/utils";
import {getUserInfoAPI, loginAPI} from "@/apis/user";

const userStore = createSlice({
    name: 'user',
    initialState: {
        token: getToken() || '',
        userInfo: {}
    },
    // Synchronized method
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
            setTokenUtils(action.payload)
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload
        },
        clearUserInfo(state, action) {
            state.userInfo = {};
            state.token = '';
            removeToken();
        }
    }
});
// Destructuring the object
const {
    setToken,
    setUserInfo,
    clearUserInfo
} = userStore.actions;

const userReducer = userStore.reducer;
// Asynchronous method
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        const res = await loginAPI(loginForm);
        dispatch(setToken(res.data.token))
    }
}
const fetchUserInfo = () => {
    return async (dispatch) => {
        const res = await getUserInfoAPI();
        dispatch(setUserInfo(res.data))
    }
}
export {
    fetchUserInfo,
    fetchLogin,
    clearUserInfo
};

export default userReducer;