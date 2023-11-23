import { Component, Prop, h, State } from '@stencil/core';
import state from '../../utils/store.js';

@Component({
  tag: 'paybox-donation-widget',
  styleUrl: 'paybox-donation-widget.css',
  shadow: true,
})

export class MyComponent {
  @Prop() merchant_key: string;
  @Prop() payer_phone: string;
  @Prop() payer_name: string;
  @Prop() email: string;

  @State() hasEnteredInput: boolean;

  render() {
    return (
      <div>
        {state.hasEnteredInput ?
              <paybox-checkout-widget amount={state.amount} currency={state.currency}
                merchant_key={this.merchant_key} payer_name={this.payer_name}
                payer_phone={this.payer_phone} email={this.email} />
              : <donation-widget merchant_key={this.merchant_key} />}
      </div>   
    );
  }
}
