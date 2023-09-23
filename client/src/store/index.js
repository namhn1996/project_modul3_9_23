// khởi tạo redux
import { legacy_createStore as createStore } from "redux";

// Giá trị khởi tạo của state
const initialState = {
  cart: [],
};

// Store luôn lắng nghe
const store = createStore((state = initialState, action) => {
  if (action.type === "ADD_CART") {
    console.log(action);
    let cart = [...state.cart];
    // console.log("cartac", cart);
    let { payload } = action;
    let findIndex = cart.findIndex(
      (e, i) => e.product_id === payload.product_id
    );
    if (findIndex > -1) {
      cart[findIndex].cartCount = cart[findIndex].cartCount + payload.cartCount;
      console.log("cartac", cart);
    } else {
      cart.push(payload);
    }
    return { ...state, cart: [...cart] };
  }
  if (action.type === "INCREASE_CART_PRODUCT") {
    // Logic add sản phẩm vào trong state cart
    let cart = [...state.cart];
    let { payload } = action;
    let findIndex = cart.findIndex((e, i) => e.product_id === payload.product_id);
    console.log("findIndex", findIndex);
    // cart[findIndex].cartCount = cart[findIndex].cartCount + 1;
    return {
      ...state,
      cart: [...cart],
    };
  }
  if (action.type === "DECREASE_CART_PRODUCT") {
    // Logic add sản phẩm vào trong state cart
    let cart = [...state.cart];
    let { payload } = action;
    let findIndex = cart.findIndex((e, i) => e.product_id === payload);
    cart[findIndex].cartCount = cart[findIndex].cartCount - 1;
    return {
      ...state,
      cart: [...cart],
    };
  }
});

export default store;
