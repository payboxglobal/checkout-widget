import { Component, Host, Prop, State, h, Event, EventEmitter, Element } from '@stencil/core';

@Component({
  tag: 'paybox-checkout-widget',
  styleUrl: 'paybox-checkout-widget.css',
  shadow: true,
})
export class PayboxCheckoutWidget {

  @Prop() btntext: string;
  @Prop() colour: string;

  @Prop() amount: number;
  @Prop() phone_number: string;
  @Prop() merchant_key: string;
  @Prop() curreny: string;

  @State() isInDeveloperMode: boolean = false;
  @State() cashIsEnabled: boolean;

  @Element() el: HTMLElement;
  @Event() didReset: EventEmitter;


  

  payRequest(e) {
    // Send HTTP payment request to PayBox.com.co
    // console.log(form);
    e.preventDefault();

    const formData = new FormData();
    // form.append("mode", mode);
    // console.log(e.currentTarget);
    formData.append("mode", "Test");
    formData.append("payerName", this.el.shadowRoot.querySelector<HTMLInputElement>("#payer_name").value.toString());
    formData.append("payerPhone", this.el.shadowRoot.querySelector<HTMLInputElement>("#payer_phone").value);
    formData.append("payerEmail", this.el.shadowRoot.querySelector<HTMLInputElement>("#payer_email").value);
    formData.append("mobile_number", this.el.shadowRoot.querySelector<HTMLInputElement>("#mobile_number").value);
    formData.append("mobile_network", this.el.shadowRoot.querySelector<HTMLSelectElement>("#mobile_network").value);
    formData.append("amount", this.amount.toString());
    formData.append("currency", "GHC");

    fetch("https://paybox.com.co/pay", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + this.merchant_key
      },
      body: formData
    }).then(response => response.json())
      // .then(result => console.log(result))
      .then(result => window.location.href = "https://paybox.com.co/payment_success?token=" + result.token
      )
      .catch(error => console.log('error', error));
  }

  changePaymentMethod(method) {
    switch (method) {
      case "test":
        this.el.shadowRoot.getElementById('test_div').className = 'test_div';
        this.el.shadowRoot.getElementById('card_div').className = 'card_div hidden';
        this.el.shadowRoot.getElementById('momo_div').className = 'momo_div hidden';
        break;
      case "momo":
        this.el.shadowRoot.getElementById('momo_div').className = 'momo_div';
        this.el.shadowRoot.getElementById('card_div').className = 'card_div hidden';
        this.el.shadowRoot.getElementById('test_div').className = 'test_div hidden';
        break;
      case "card":
        this.el.shadowRoot.getElementById('card_div').className = 'card_div';
        this.el.shadowRoot.getElementById('momo_div').className = 'momo_div hidden';
        this.el.shadowRoot.getElementById('test_div').className = 'test_div hidden';
        break;
    }
  }

  showPaymentMethods(e) {
    e.preventDefault();
    if(!this.validateDetails()) {
      return;
    }
    this.el.shadowRoot.getElementById('payment_options').className = '';
    this.el.shadowRoot.getElementById('payment_options2').className = '';
    this.el.shadowRoot.getElementById('confirm_details').className = 'hidden';
  }

  hidePaymentMethods() {
    this.el.shadowRoot.getElementById('payment_options').className = 'hidden';
    this.el.shadowRoot.getElementById('payment_options2').className = 'hidden';
    this.el.shadowRoot.getElementById('confirm_details').className = '';
  }

  validateDetails() {
    const nameInput = this.el.shadowRoot.querySelector<HTMLInputElement>("#payer_name");
    const nameValue = nameInput.value.trim();

    const payerPhone = this.el.shadowRoot.querySelector<HTMLInputElement>("#payer_phone");
    const phoneValue = payerPhone.value.trim();

    const payerEmail = this.el.shadowRoot.querySelector<HTMLInputElement>("#payer_email");
    const emailValue = payerEmail.value.trim();

    if (nameValue === "") {
      this.displayError(nameInput);
      return false;
    } 
    
    if(phoneValue === "") {
      this.displayError(payerPhone);
      return false;
    }

    if(emailValue === "") {
      this.displayError(payerEmail);
      return false;
    }

    this.hideError(nameInput);
    this.hideError(payerPhone);
    this.hideError(payerEmail);
    return true;
  }

  displayError(inputElement: HTMLInputElement): void {
    const errorSpan = this.el.shadowRoot.getElementById(inputElement.id + "_error");
    // errorSpan.className = '';
    errorSpan.classList.remove('hidden');
  }

  hideError(inputElement: HTMLInputElement): void {
    const errorSpan = this.el.shadowRoot.getElementById(inputElement.id + "_error");
    // errorSpan.className = 'hidden';
    errorSpan.classList.add('hidden');
  }

  openModal() {
    if(this.merchant_key === null || this.merchant_key === "") {
      return;
    }
    this.checkDeveloperMode();
    this.el.shadowRoot.querySelector<HTMLDivElement>("#modal-container").classList.remove("hidden");
    this.el.shadowRoot.querySelector<HTMLDivElement>("#modal-container").classList.add("flex-display");
  }

  checkDeveloperMode() {
    // 
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer merchant-key");

    fetch("https://paybox.com.co/api/team/" + this.merchant_key, {
      method: "GET",
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if(result.type === "Developer") {
          this.isInDeveloperMode = true;
        }
      })
      .catch(error => console.log('error', error));
  }

  hideModal(e) {
    // console.log("Target");
    // console.log(e.target);

    const modalContent = this.el.shadowRoot.querySelector<HTMLDivElement>("#modal-content");

    // console.log("modalContent");
    // console.log(modalContent);
    if(modalContent.isEqualNode(e.target) || modalContent.contains(e.target)) {
      // console.log("These guys are equal");
      return;
    }

    this.closeModal();
  }

  closeModal() {
    this.el.shadowRoot.querySelector<HTMLDivElement>("#modal-container").classList.remove("flex-display");
    this.el.shadowRoot.querySelector<HTMLDivElement>("#modal-container").classList.add("hidden");
  }
  
  render() {
    return (
      <Host>
        <button class="bg-indigo-500 text-white p-2.5 rounded flex justify-center" onClick={() => this.openModal()}>Pay with PayBox</button>

        <div class="modal-overlay hidden" id='modal-container'>
          <div class="modal-content justify-items-center" id='modal-content'>
            
          





        {this.isInDeveloperMode ? <p>Developer Mode is enabled</p> : null}
        
          <form id="theForm" method='POST' onSubmit={(e) => this.payRequest(e)}>
            <div id='confirm_details'>
              <p>Amount: GHS {this.amount}</p>
              <span id="payer_name_error" class='hidden'>Please fill in this field</span>
              <br></br>
              <input name="payer_name" class="ring-1 ring-black"  id="payer_name" placeholder='name*' required></input>
              <br></br>
              <span id="payer_phone_error" class='my-1.5 hidden'>Please fill in this field</span>
              <br></br>
              <input name="payer_phone"  class="my-1.5" id="payer_phone" placeholder='phone*' required></input>

              <span id="payer_email_error" class='hidden'>Please fill in this field</span>
              <br></br>
              <input name="payer_email"  id="payer_email" placeholder='email*' required></input>
              <br></br>
              <button type='button' class="bg-indigo-500 text-white p-2.5 rounded flex justify-center drop-shadow" onClick={(e) => this.showPaymentMethods(e)}>Confirm Details</button>
            </div>

            {/* Reserved section start */}

            {/* Reserved section end */}

            <div id='payment_options' class='hidden'>
              <a href='#' onClick={() => this.hidePaymentMethods()}>Back</a>
              <div class='test_div hidden' id='test_div'>
                <p>Test</p>
                <hr></hr>
              </div>
              <div class='momo_div' id='momo_div'>
                <select id='mobile_network' name='mobile_network'>
                  <option value={`MTN`}>MTN</option>
                  <option value={`Vodafone`}>Vodafone</option>
                  <option value={`AirtelTigo`}>AirtelTigo</option>
                </select>
                <br></br>
                <input name='mobile_number' id="mobile_number" type='text' placeholder='Mobile Money Number'></input>
                <hr></hr>
                <br></br>
              </div>
              <div class="card_div hidden" id="card_div">
                <input name='card_first_name' type='text' placeholder='First Name'></input>
                <input name='card_last_name' type='text' placeholder='Last Name'></input>
                <br></br>
                <input name='card_number' type='text' placeholder='Card Number'></input>
                <br></br>
                <input name='card_expiry' type='date' placeholder='Expiry Date'></input>
                <input name='card_cvc' type='text' placeholder='CVC'></input>
                <br></br>
              </div>
              <input type='submit' value="Pay Now"></input>
            </div>
          </form>

          <button type='button' 
          class="bg-red-600 text-white p-2.5 rounded flex justify-center drop-shadow" 
          onClick={() => this.closeModal()}>Close</button>
          
        

        <br></br>
        <div id='payment_options2' class='hidden'>
          <div class='container'>
            <button onClick={() => this.changePaymentMethod("test")}>Test</button>
            <button onClick={() => this.changePaymentMethod("momo")}>Mobile Money</button>
            <button onClick={() => this.changePaymentMethod("card")}>Card</button>
          </div>
        </div>

        </div>
        </div>
      </Host>
    );
  }

}
