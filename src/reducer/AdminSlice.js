import { createSlice, current } from "@reduxjs/toolkit";

const AdminSlice = createSlice(
    {
        name: "Admin",
        initialState: {
            data: null,
            token: null
        },
        reducers: {
            signIn(currentState, { payload }) {
                console.log("payload", payload.admin)
                currentState.token = payload.token;
                if (payload.save == true) {
                    localStorage.setItem("admin", JSON.stringify(payload.admin));
                    currentState.data = payload.admin;
                } else if (payload.author) {
                    localStorage.setItem("admin", JSON.stringify(payload.author));
                    currentState.data = payload.author;
                } else if (payload.save == false) {
                    localStorage.setItem("admin", JSON.stringify(payload.admin));
                    currentState.data = payload.admin;
                }
                localStorage.setItem("token", payload.token);
            },
            signOut(currentState) {
                currentState.data = null;
                currentState.token = null;
                localStorage.removeItem('admin');
                localStorage.removeItem('token');
            },
            lsToCurrentState(currentState) {
                const lsToken = localStorage.getItem("token");
                if (lsToken != null) {
                    currentState.token = lsToken;
                }
                const lsAdmin = localStorage.getItem("admin");
                if (lsAdmin != null) {
                    const admin = JSON.parse(lsAdmin);
                    currentState.data = admin;
                }
            }
        }
    }
)

export const { signIn, signOut, lsToCurrentState } = AdminSlice.actions;
export default AdminSlice.reducer;
// export {
//     signIn
// }