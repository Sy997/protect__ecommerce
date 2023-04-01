import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    cartItems: [],
    totalAmount: 0,
    totalQuality: 0 
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
        const newItem = action.payload
        const existingItem = state.cartItems.find(item => item.id === newItem.id)

        state.totalQuality++

        if(!existingItem) {
            state.cartItems.push({
                id: newItem.id,
                productName: newItem.productName,
                imgUrl: newItem.imgUrl, 
                price: newItem.price,
                quantity: 1,
                totalPrice: newItem.price
            })
        }
        else {
            existingItem.quantity++
            existingItem.totalPrice = Number(existingItem.totalPrice) + (existingItem.price)
        }

        state.totalAmount = state.cartItems.reduce(
            (total, item) => total + Number(item.price) * Number(item.quantity), 0
        )

        console.log(state.totalQuality)
        console.log(state.cartItems)
        console.log(newItem)
    },
    deleteItem: (state, action) => {
        const id = action.payload;
        const existingItem = state.cartItems.find(item => item.id === id)

        if(existingItem) {
            state.cartItems = state.cartItems.filter(item => item.id === id)
            state.totalQuality = state.totalQuality - existingItem.quantity
        }

        state.totalAmount = state.cartItems.reduce(
            (total, item) => total + Number(item.price) * Number(item.quantity), 0
        )
    }
},
});

export const cartAction = cartSlice.actions

export default cartSlice.reducer