import { createSlice } from "@reduxjs/toolkit";

const Checkoutslice = createSlice(
    {
        name: "checkout",
        initialState: {
            checkClick: false,
        },
        reducers: {
            checkoutClick(currentState) {
                currentState.checkClick = true
            },
            falseCheckoutClick(currentState) {
                currentState.checkClick = false
            }
        }
    }
)

export const { checkoutClick, falseCheckoutClick } = Checkoutslice.actions;
export default Checkoutslice.reducer;