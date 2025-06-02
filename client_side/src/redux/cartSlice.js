import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
 cartItems : localStorage.getItem("cartItems")?
 JSON.parse(localStorage.getItem("cartItems")):[],
 cartTotalQuantity : 0 , 
 cartTotalAmount : 0 ,
};

export const cartSlice = createSlice({
    name:'cart', 
    initialState,
    reducers:{
    //add item + increase qty
        addToCart : (state, action) =>{
            const itemIndex = state.cartItems.findIndex(
                (item)=> item._id === action.payload._id
                );
            if (itemIndex >= 0){
                state.cartItems[itemIndex].cartQuantity += 1 ;
                toast.info(`${action.payload.name} est mis à jour`, { position : "bottom-left",});
            }
            else {
            const  tempProduct = {...action.payload, cartQuantity : 1} ;
            state.cartItems.push(tempProduct);
            toast.success(`${action.payload.name} a été ajouté avec succès`, { position : "bottom-left",});

            }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));   
        cartSlice.caseReducers.getTotals(state);
 
        },
    //remove item
        removeFromCart : (state, action) =>{
        const nextCartItems = state.cartItems.filter((cartItem) => cartItem._id !== action.payload._id);
        state.cartItems = nextCartItems ;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        toast.error(`${action.payload.name} a été supprimé `, { position : "bottom-left",});
        },

    //decrease qty
       decreaseCart : (state, action) => {
       const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem._id === action.payload._id
       );
       if (state.cartItems[itemIndex].cartQuantity> 1 ) {
        state.cartItems[itemIndex].cartQuantity -=1 ;
        toast.info(`Quantité de ${action.payload.name} est réduite`, { position : "bottom-right",});
       }
       else if (state.cartItems[itemIndex].cartQuantity === 1){
        const nextCartItems = state.cartItems.filter((cartItem) => cartItem._id !== action.payload._id);
        state.cartItems = nextCartItems ;
        toast.error(`${action.payload.name} a été supprimé `, { position : "bottom-right",});
       }
       localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
       cartSlice.caseReducers.getTotals(state);
       },
    //clear cart 
       clearCart : (state, action) => {
        state.cartItems = [] ;
        state.cartTotalAmount = 0 ;
        // toast.success("Votre panier est vide ! Recommencez vos achats", { position : "top-left",});
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        localStorage.setItem("cartTotal", JSON.stringify(state.cartTotalAmount));

       },

    //total
    getTotals : (state, action) => {
       let {total, quantity} =  state.cartItems.reduce((cartTotal, cartItem) => {
         const {prix, cartQuantity} = cartItem ; 
         const itemTotal = prix * cartQuantity ;
         cartTotal.total += itemTotal ; 
         cartTotal.quantity += cartQuantity ;
         return cartTotal ;

        }, {total : 0 ,
            quantity : 0 ,
        });
        state.cartTotalQuantity = quantity;
        state.cartTotalAmount = total;
    localStorage.setItem('cartTotal',  JSON.stringify(state.cartTotalAmount));
    }
    },
});
export const {addToCart, removeFromCart, decreaseCart, clearCart, getTotals} = cartSlice.actions;
export default cartSlice.reducer;

