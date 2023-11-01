import { createStore } from "@stencil/store";

const { state } = createStore({
  hasEnteredInput: false,
  amount: 0,
  phone_number: "",
  payer_name: "",
  currency: "",
  email: "",
  payer_phone: ""
});


export default state;