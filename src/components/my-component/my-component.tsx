import { Component, Prop, h, State } from '@stencil/core';
import state from '../../utils/store.js';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})

export class MyComponent {
  @Prop() merchant_key: string;
  @Prop() payer_phone: string;
  @Prop() payer_name: string;
  @Prop() email: string;

  @State() hasEnteredInput: boolean;

  componentWillLoad() {
    // setInterval(() => state.seconds++, 1000);
  }

  render() {
    return (
      <div>
        {state.hasEnteredInput ?
              <paybox-checkout-widget amount={state.amount} currency={state.currency}
                merchant_key={this.merchant_key} payer_name={this.payer_name}
                payer_phone={this.payer_phone} email={this.email} />
              : <paybox-donation-widget />}
      </div>   
    );
  }
}
