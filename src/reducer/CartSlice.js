import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice(
    {
        name: 'Cart',
        initialState: {
            data: [],
            total: 0
        },
        reducers: {
            dbToCart(currentState, {payload}){
                currentState.data = payload.data;
                currentState.total = payload.total;
                localStorage.setItem("cart", JSON.stringify(currentState));
            },
            addToCart(currentState, { payload }) {
                const d = currentState.data.find(cart => cart.pId == payload.pId);
                if (d) {
                    d.qty++;
                } else {
                    currentState.data.push({ pId: payload.pId, qty: payload.qty });
                }
                currentState.total += payload.price;
                localStorage.setItem("cart", JSON.stringify(currentState));
            },
            removeFromCart(currentState, {payload}) {
                const filterData = currentState.data.filter(cart => cart.pId != payload.pId);
                 if(filterData){
                    currentState.data = filterData;
                    currentState.total -= parseFloat(payload.total_price);
                    localStorage.setItem("cart", JSON.stringify(currentState));
                }
            },
            changeCartQty(currentState, {payload}) {
                const d = currentState.data.find(d => d.pId == payload.pId);
                if(payload.flag){
                    d.qty++;
                    currentState.total += payload.price;
                }else{
                    d.qty--;
                    currentState.total -= payload.price;
                }
            },
            locStoreToCart(currentState) {
                const lsData = localStorage.getItem("cart");
                if(lsData != null){
                    const d = JSON.parse(lsData);
                    currentState.data = d.data;
                    currentState.total = d.total;
                }
            },
            emptyCart(currentState){
                currentState.data = [];
                currentState.total = 0;
                localStorage.removeItem("cart");
            }
        }
    }
)

export const { addToCart, dbToCart, emptyCart, removeFromCart, changeCartQty, locStoreToCart } = CartSlice.actions;
export default CartSlice.reducer;