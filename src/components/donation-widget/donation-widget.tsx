import { Component, Host, h, Element, State, Prop } from '@stencil/core';
import state from '../../utils/store.js';

@Component({
  tag: 'donation-widget',
  styleUrl: 'donation-widget.css',
  shadow: true,
})
export class PayboxDonationWidget {

  @Element() el: HTMLElement;
  @State() currency: string = "GHS";
  @State() amount: number = 0;

  @Prop() merchant_key: string;


  packageVersion = "0.2.3";
  assetsBasePath = `https://unpkg.com/paybox-widgets@${this.packageVersion}/src/assets`;

  private createCountryCurrencyItem(currencyCode: string, countryName: string): HTMLElement {
    const section = document.createElement('section');
    section.classList.add('country-currency-item');
    section.addEventListener('click', () => this.setCurrency(currencyCode));

    const flagImg = document.createElement('img');
    flagImg.src = `${this.assetsBasePath}/flags/${countryName.toLowerCase()}.svg`;
    flagImg.alt = 'country flag';
    flagImg.loading = 'eager';

    const countryNameParagraph = document.createElement('p');
    countryNameParagraph.classList.add('country-name');

    const currencyCodeSmall = document.createElement('small');
    currencyCodeSmall.classList.add('country-currency-code');
    currencyCodeSmall.textContent = currencyCode;

    const countryNameText = document.createTextNode(` ${countryName}`);

    countryNameParagraph.appendChild(currencyCodeSmall);
    countryNameParagraph.appendChild(countryNameText);

    section.appendChild(flagImg);
    section.appendChild(countryNameParagraph);

    return section;
  }

  loadSupportedCurrencies() {
    var activeCountries = new Set<String>();
    
    fetch("https://paybox.com.co/active_networks", 
    {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + this.merchant_key
      }
    })
    .then(response => response.json())
    .then(results => {
      var currencyContainer = this.el.shadowRoot.querySelector("#country-currencies-container");
      const countryFlag = this.el.shadowRoot.querySelector('#country-flag');
      const currencyCode = this.el.shadowRoot.querySelector('#currency-code');
      var addedPlaceHolder: boolean = false;
      
      results.forEach(result => {
        if(!activeCountries.has(result.currency)) {
          activeCountries.add(result.currency);
          var newCountryItem = this.createCountryCurrencyItem(result.currency, result.country);
          currencyContainer.appendChild(newCountryItem);

          newCountryItem.addEventListener('click', () => {
            const selectedCountryCurrency = newCountryItem.children[1].children[0].innerHTML;
            countryFlag.setAttribute("src", newCountryItem.children[0].getAttribute("src"));
            currencyCode.innerHTML = selectedCountryCurrency;
          });

          if(!addedPlaceHolder) {
            const selectedCountryCurrency = newCountryItem.children[1].children[0].innerHTML;
            countryFlag.setAttribute("src", newCountryItem.children[0].getAttribute("src"));
            currencyCode.innerHTML = selectedCountryCurrency;
            addedPlaceHolder = true;
          }
        }
      });
    })
    .catch(error => console.log('error', error));
  }

  componentDidLoad() {
    // Add custom font to page DOM since font-face doesn't work within Shadow DOM.
    const fontCssUrl = 'https://fonts.googleapis.com';
    let fontLink1 = document.querySelector(`link[href="${fontCssUrl}"]`);

    // Only inject the element if it's not yet present
    if (!fontLink1) {
      fontLink1 = document.createElement('link');
      fontLink1.setAttribute('rel', 'preconnect');
      fontLink1.setAttribute('href', fontCssUrl);
      document.head.appendChild(fontLink1);
    }

    const fontCssUrl2 = 'https://fonts.gstatic.com';
    let fontLink2 = document.querySelector(`link[href="${fontCssUrl2}"]`);

    // Only inject the element if it's not yet present
    if (!fontLink2) {
      fontLink2 = document.createElement('link');
      fontLink2.setAttribute('rel', 'preconnect');
      fontLink2.setAttribute('href', fontCssUrl2);
      document.head.appendChild(fontLink2);
    }

    const fontCssUrl3 = 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap';
    let fontLink3 = document.querySelector(`link[href="${fontCssUrl3}"]`);

    // Only inject the element if it's not yet present
    if (!fontLink3) {
      fontLink3 = document.createElement('link');
      fontLink3.setAttribute('rel', 'stylesheet');
      fontLink3.setAttribute('href', fontCssUrl3);
      document.head.appendChild(fontLink3);
    }

    const bottomSheet = this.el.shadowRoot.querySelector('#country-currency-bottom-sheet');
    const closeBottomSheetBtn = this.el.shadowRoot.querySelector('#close-bottom-sheet-icon');
    const countryItemList = this.el.shadowRoot.querySelectorAll('.country-currency-item');
    const dropDownBtn = this.el.shadowRoot.querySelector('#currency-dropdown');
    // const amountToDonate = this.el.shadowRoot.querySelector('#amount-to-donate');
    const currencyCode = this.el.shadowRoot.querySelector('#currency-code');
    // const amountInput = this.el.shadowRoot.querySelector('#amount-input');
    const countryFlag = this.el.shadowRoot.querySelector('#country-flag');

    dropDownBtn.addEventListener('click', () => {
      bottomSheet.setAttribute("style", "display: flex;");
    });

    closeBottomSheetBtn.addEventListener('click', () => {
      bottomSheet.setAttribute("style", "display: none;");
    });

    countryItemList.forEach(item => {
      item.addEventListener('click', () => {
        const selectedCountryCurrency = item.children[1].children[0].innerHTML;
        countryFlag.setAttribute("src", item.children[0].getAttribute("src"));
        currencyCode.innerHTML = selectedCountryCurrency;
      });
    });


    this.loadSupportedCurrencies();
  }

  setCurrency(currency) {
    this.currency = currency;
  }

  moveToCheckOutWidget(e) {
    e.preventDefault();

    const amountInput = e.target.querySelector('input[name="amount-input"]') as HTMLInputElement;
    if (amountInput === null) {
      return;
    }

    state.amount = Number(amountInput?.value);
    state.currency = this.currency;
    state.hasEnteredInput = true;
  }

  render() {
    return (
      <Host>
        <div class="outer-wrap">
          <div class="inner-wrap">
            <main>
              <section class="donate-container">
                <section class="top-content">
                  <h1 class="top-content-text">Donate</h1>
                </section>
                <form method='POST' onSubmit={(e) => this.moveToCheckOutWidget(e)} class="form-container">
                  <section class="form-main-content">
                    <label htmlFor="amount-input" class="label-text">Amount</label>
                    <fieldset class="input-container">
                      <section class="currency-dropdown" id="currency-dropdown">
                        <section class="currency-container">
                          <img id="country-flag"  alt="country flag" loading="lazy" />
                          <p class="currency-code" id="currency-code"></p>
                        </section>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M19.92 8.94995L13.4 15.47C12.63 16.24 11.37 16.24 10.6 15.47L4.07996 8.94995" stroke="#545A5E" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                      </section>
                      <input placeholder="0.00" id="amount-input" type="text" name='amount-input' class="amount-input" required />
                    </fieldset>
                  </section>
                  <button class="donate-btn" id="donate-btn">Donate</button>
                </form>
                <section class="pwered-by-box">
                  <p class="powered-by-text">Powered by</p>
                  <img src={`${this.assetsBasePath}/flags/paybox-logo.svg`} alt="PayBox logo" loading="lazy" />
                </section>
              </section>
              <section id="country-currency-bottom-sheet" class="country-currency-bottom-sheet">
                <section class="bottom-sheet">
                  <section class="bottom-sheet-top-container">
                    <section class="title-close-icon">
                      <p class="bottom-sheet-title">Select currency</p>
                      <section id="close-bottom-sheet-icon" class="close-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                          <path d="M10.4042 8.00409L16.7042 1.71409C16.8925 1.52579 16.9983 1.27039 16.9983 1.00409C16.9983 0.73779 16.8925 0.482395 16.7042 0.294092C16.5159 0.105788 16.2605 0 15.9942 0C15.7279 0 15.4725 0.105788 15.2842 0.294092L8.9942 6.59409L2.7042 0.294092C2.5159 0.105788 2.2605 2.36434e-07 1.9942 2.38419e-07C1.7279 2.40403e-07 1.47251 0.105788 1.2842 0.294092C1.0959 0.482395 0.99011 0.73779 0.99011 1.00409C0.99011 1.27039 1.0959 1.52579 1.2842 1.71409L7.5842 8.00409L1.2842 14.2941C1.19047 14.3871 1.11608 14.4977 1.06531 14.6195C1.01454 14.7414 0.988403 14.8721 0.988403 15.0041C0.988403 15.1361 1.01454 15.2668 1.06531 15.3887C1.11608 15.5105 1.19047 15.6211 1.2842 15.7141C1.37716 15.8078 1.48777 15.8822 1.60962 15.933C1.73148 15.9838 1.86219 16.0099 1.9942 16.0099C2.12621 16.0099 2.25692 15.9838 2.37878 15.933C2.50064 15.8822 2.61124 15.8078 2.7042 15.7141L8.9942 9.41409L15.2842 15.7141C15.3772 15.8078 15.4878 15.8822 15.6096 15.933C15.7315 15.9838 15.8622 16.0099 15.9942 16.0099C16.1262 16.0099 16.2569 15.9838 16.3788 15.933C16.5006 15.8822 16.6112 15.8078 16.7042 15.7141C16.7979 15.6211 16.8723 15.5105 16.9231 15.3887C16.9739 15.2668 17 15.1361 17 15.0041C17 14.8721 16.9739 14.7414 16.9231 14.6195C16.8723 14.4977 16.7979 14.3871 16.7042 14.2941L10.4042 8.00409Z" fill="#222426" />
                        </svg>
                      </section>
                    </section>
                  </section>
                  <section id='country-currencies-container' class="country-currencies-container">
                    {/* <section onClick={() => this.setCurrency("GHS")} class="country-currency-item">
                      <img src={`${this.assetsBasePath}/flags/ghana.svg`} alt="country flag" loading="lazy" />
                      <p class="country-name"><small class="country-currency-code">GHS</small> Ghanian Cedis</p>
                    </section>
                    <section onClick={() => this.setCurrency("NGN")} class="country-currency-item">
                      <img src={`${this.assetsBasePath}/flags/nigeria.svg`} alt="country flag" loading="lazy" />
                      <p class="country-name"><small class="country-currency-code">NGN</small> Nigerian Naira</p>
                    </section>
                    <section onClick={() => this.setCurrency("USD")} class="country-currency-item">
                      <img src={`${this.assetsBasePath}/flags/usa.svg`} alt="country flag" loading="lazy" />
                      <p class="country-name"><small class="country-currency-code">USD</small> United States Dollar</p>
                    </section>
                    <section onClick={() => this.setCurrency("GBP")} class="country-currency-item">
                      <img src={`${this.assetsBasePath}/flags/britain.svg`} alt="country flag" loading="lazy" />
                      <p class="country-name"><small class="country-currency-code">GBP</small> British Pound</p>
                    </section>
                    <section onClick={() => this.setCurrency("EUR")} class="country-currency-item">
                      <img src={`${this.assetsBasePath}/flags/euro.svg`} alt="country flag" loading="lazy" />
                      <p class="country-name"><small class="country-currency-code">EUR</small> Euros</p>
                    </section> */}
                  </section>
                </section>
              </section>
            </main>
          </div>
        </div>
      </Host>
    );
  }

}
