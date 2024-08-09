import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice(
    {
        name: "user",
        initialState : {
            data : null,
            token : null,
        },
        reducers : {
            login (currentState, {payload}){
                currentState.data = payload.user;
                currentState.token = payload.token;
                localStorage.setItem("user", JSON.stringify(currentState))
            },
            logout(currentState){
                currentState.data = null;
                localStorage.removeItem('user')
            },
            lsLogin(currentState){
                const lsUser = localStorage.getItem("user");
                if(lsUser != null){
                    const user = JSON.parse(lsUser);
                    currentState.data = user.data;
                    currentState.token = user.token;
                }
            }
        }
    }
)

export const {login, logout, lsLogin} = UserSlice.actions;

export default UserSlice.reducer;