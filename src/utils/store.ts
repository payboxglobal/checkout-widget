import { createStore } from "@stencil/store";

const { state, onChange } = createStore({
  clicks: 0,
  seconds: 0,
  squaredClicks: 0,
  hasEnteredInput: false,
  amount: 0,
  phone_number: "",
  payer_name: "",
  currency: "",
  email: "",
  payer_phone: ""
});

onChange('clicks', value => {
  state.squaredClicks = value ** 2;
});

export default state;