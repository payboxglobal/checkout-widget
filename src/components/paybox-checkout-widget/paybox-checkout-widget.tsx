import { Component, Host, Prop, State, h, Event, EventEmitter, Element } from '@stencil/core';
import * as widgetScript from '../../assets/scripts/script.js';
import intlTelInput from 'intl-tel-input';

@Component({
  tag: 'paybox-checkout-widget',
  styleUrl: 'paybox-checkout-widget.css', //'../../../node_modules/intl-tel-input/build/css/intlTelInput.css',
  shadow: true,
})
export class PayboxCheckoutWidget {

  @Prop() amount: number;
  @Prop() phone_number: string;
  @Prop() merchant_key: string;
  @Prop() payer_name: string;
  @Prop() currency: string;

  @State() isInDeveloperMode: boolean = false;
  @State() cashIsEnabled: boolean = false;
  @State() gottenConfigs: boolean = false;

  @Prop() email: string;
  @State() mode: string; // "Test", "Cash", "Mobile Money", "Card"

  @Prop() payer_phone: string;
  @State() mobileNumber: string;
  @State() mobileNetwork: string;

  @Element() el: HTMLElement;
  @Event() didReset: EventEmitter;

  @State() inDesktopMode: boolean = true;

  successPage: HTMLElement;
  cardDesktopContent: HTMLElement;
  cardNavItem: HTMLAnchorElement;
  mobileMoneyDesktopContent: HTMLElement;
  cashPaymentDesktopContent: HTMLElement;
  testPaymentDesktopContent: HTMLElement;
  paymentMethodContainer: HTMLElement;
  mobileMoneyNavItem: HTMLAnchorElement;
  cashPaymentNavItem: HTMLAnchorElement;
  testNavItem: HTMLAnchorElement;

  initialMobilePage: HTMLElement;
  cardPageMobile: HTMLElement;
  mobileMoneyPageMobile: HTMLElement;
  cashPaymentPageMobile: HTMLElement;
  testPageMobile: HTMLElement;

  desktopIti: intlTelInput;
  mobileIti: intlTelInput;


  createNetworkElement(inputId, inputName, inputValue, labelId, imgSrc, imgAlt, labelText) {
    // Create the <fieldset> element
    const fieldset = document.createElement('fieldset');
    fieldset.classList.add('network-detail');

    // Create the <input> element
    const input = document.createElement('input');
    input.classList.add('network');
    input.type = 'radio';
    input.id = inputId;
    input.name = inputName;
    input.value = inputValue;

    // Create the <label> element
    const label = document.createElement('label');
    label.classList.add('network-container');
    label.id = labelId;
    label.htmlFor = inputId;

    // Create the <figure> element
    const figure = document.createElement('figure');
    figure.classList.add('network-img-container');

    // Create the <img> element
    const img = document.createElement('img');
    img.classList.add('network-img');
    img.src = imgSrc;
    img.loading = 'eager';
    img.alt = imgAlt;

    // Create the <small> element
    const small = document.createElement('small');
    small.classList.add('network-text');
    small.textContent = labelText;

    // Append elements to build the hierarchy
    figure.appendChild(img);
    label.appendChild(figure);
    label.appendChild(small);
    fieldset.appendChild(input);
    fieldset.appendChild(label);

    return fieldset; // Return the newly created HTML element
  }

  inMobileView() {
    this.inDesktopMode = false;
  }

  inDesktopView() {
    this.inDesktopMode = true;
  }

  goMobileCardPage() {
    this.mode = "Card";
    this.el.shadowRoot.getElementById("mobile-number-m").removeAttribute("required");
    this.el.shadowRoot.getElementById("mobile-number").removeAttribute("required");
    widgetScript.goMobileCardPage(this.initialMobilePage, this.mobileMoneyPageMobile, this.cashPaymentPageMobile, this.testPageMobile, this.cardPageMobile);
  }

  goMobileMobilemoneyPage() {
    this.mode = "Mobile Money";
    this.el.shadowRoot.getElementById("mobile-number-m").setAttribute("required", "");
    this.el.shadowRoot.getElementById("mobile-number").removeAttribute("required");
    widgetScript.goMobileMobilemoneyPage(this.initialMobilePage, this.cardPageMobile, this.cashPaymentPageMobile, this.testPageMobile, this.mobileMoneyPageMobile);
  }

  goMobileCashPaymentPage() {
    this.mode = "Cash";
    this.el.shadowRoot.getElementById("mobile-number-m").removeAttribute("required");
    this.el.shadowRoot.getElementById("mobile-number").removeAttribute("required");
    widgetScript.goMobileCashPaymentPage(this.initialMobilePage, this.mobileMoneyPageMobile, this.cardPageMobile, this.testPageMobile, this.cashPaymentPageMobile);
  }

  goMobileTestPage() {
    this.mode = "Test";
    this.el.shadowRoot.getElementById("mobile-number-m").removeAttribute("required");
    this.el.shadowRoot.getElementById("mobile-number").removeAttribute("required");
    widgetScript.goMobileTestPage(this.initialMobilePage, this.mobileMoneyPageMobile, this.cashPaymentPageMobile, this.cardPageMobile, this.testPageMobile);
  }

  backToInitialPage() {
    this.el.shadowRoot.getElementById("mobile-number-m").removeAttribute("required");
    this.el.shadowRoot.getElementById("mobile-number").removeAttribute("required");
    let backBtnList = this.el.shadowRoot.querySelectorAll(".back-btn-container");
    widgetScript.backToInitialPage(this.initialMobilePage, this.mobileMoneyPageMobile, this.cashPaymentPageMobile, this.cardPageMobile, this.testPageMobile, backBtnList);
  }

  removeBanners() {
    let banners = this.el.shadowRoot.querySelectorAll(".banner");
    for (let i = 0; i < banners.length; i++) {
      $(banners[i]).css("display", "none");
    }
    //widgetScript.removeBanner(banners);
  }


  placeCardContent() {
    this.mode = "Card";
    this.el.shadowRoot.getElementById("mobile-number-m").removeAttribute("required");
    this.el.shadowRoot.getElementById("mobile-number").removeAttribute("required");
    const navItems = this.el.shadowRoot.querySelectorAll('.nav-tab');
    widgetScript.placeCardContent(navItems, this.cardNavItem, this.mobileMoneyDesktopContent,
      this.cashPaymentDesktopContent, this.testPaymentDesktopContent, this.cardDesktopContent);
  }

  placeMobileMoneyContent() {
    this.mode = "Mobile Money";
    this.el.shadowRoot.getElementById("mobile-number-m").removeAttribute("required");
    this.el.shadowRoot.getElementById("mobile-number").setAttribute("required", "");
    const navItems = this.el.shadowRoot.querySelectorAll('.nav-tab');
    widgetScript.placeMobileMoneyContent(this.paymentMethodContainer, this.mobileMoneyDesktopContent, this.cardDesktopContent,
      this.cashPaymentDesktopContent, this.testPaymentDesktopContent, this.mobileMoneyNavItem, navItems
    );
  }

  placeCashPaymentContent() {
    this.mode = "Cash";
    this.el.shadowRoot.getElementById("mobile-number-m").removeAttribute("required");
    this.el.shadowRoot.getElementById("mobile-number").removeAttribute("required");
    const navItems = this.el.shadowRoot.querySelectorAll('.nav-tab');
    widgetScript.placeCashPaymentContent(
      this.paymentMethodContainer,
      this.cashPaymentDesktopContent,
      this.cardDesktopContent,
      this.mobileMoneyDesktopContent,
      this.testPaymentDesktopContent,
      this.cashPaymentNavItem,
      navItems
    );
  }

  placeTestContent() {
    this.mode = "Test";
    this.el.shadowRoot.getElementById("mobile-number-m").removeAttribute("required");
    this.el.shadowRoot.getElementById("mobile-number").removeAttribute("required");
    const navItems = this.el.shadowRoot.querySelectorAll('.nav-tab');
    widgetScript.placeTestContent(
      this.paymentMethodContainer,
      this.testPaymentDesktopContent,
      this.cardDesktopContent,
      this.mobileMoneyDesktopContent,
      this.cashPaymentDesktopContent,
      this.testNavItem,
      navItems
    );
  }


  componentDidLoad() {
    // Add custom font to page DOM since font-face doesn't work within Shadow DOM.
    const fontCssUrl = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap';
    let element = document.querySelector(`link[href="${fontCssUrl}"]`);

    // Only inject the element if it's not yet present
    if (!element) {
      element = document.createElement('link');
      element.setAttribute('rel', 'stylesheet');
      element.setAttribute('href', fontCssUrl);
      document.head.appendChild(element);
    }

    const jQueryLink = 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js';
    let jqueryElement = document.querySelector(`script[href="${jQueryLink}"]`);

    if (!jqueryElement) {
      jqueryElement = document.createElement('script');
      jqueryElement.setAttribute('src', jQueryLink);
      document.head.appendChild(jqueryElement);
    }

    const jQueryJSLink = 'https://code.jquery.com/jquery-latest.min.js';
    let jqueryJSElement = document.querySelector(`script[href="${jQueryJSLink}"]`);

    if (!jqueryJSElement) {
      jqueryJSElement = document.createElement('script');
      jqueryJSElement.setAttribute('src', jQueryJSLink);
      document.body.appendChild(jqueryJSElement);
    }

    const linkToTelPlugin = 'https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js';

    const desktopPhoneInput = this.el.shadowRoot.getElementById('mobile-number');
    const mobilePhoneInput = this.el.shadowRoot.getElementById('mobile-number-m');


    this.desktopIti = intlTelInput(desktopPhoneInput, {
      utilsScript: linkToTelPlugin,
      onlyCountries: ["GH"],
      allowDropdown: false,
      autoPlaceholde: "aggressive"
    });

    this.mobileIti = intlTelInput(mobilePhoneInput, {
      utilsScript: linkToTelPlugin,
      onlyCountries: ["GH"],
      allowDropdown: false,
      autoPlaceholde: "aggressive"
    });

    // console.log(mobileTelInput);
  }

  foo() {
    console.log();

    if (this.desktopIti.isValidNumber()) {
      console.log("This is a possible number: " + this.desktopIti.getNumber());
    } else {
      // console.log("This is not a real number: " + this.desktopIti.getNumber());
    }
  }


  payRequest(e) {
    // Send HTTP payment request to PayBox.com.co
    // console.log(form);
    e.preventDefault();

    const formData = new FormData();
    // form.append("mode", mode);
    // console.log(e.currentTarget);
    formData.append("mode", this.mode);
    let banner_postfix = "";
    if (this.mode === "Card") {
      banner_postfix = "-card";
    } else if (this.mode === "Mobile Money") {
      banner_postfix = "-momo";
    } else if (this.mode === "Cash") {
      banner_postfix = "-cash";
    } else {
      banner_postfix = "-test";
    }
    /*console.log(this.payer_name);
    console.log(this.payer_phone);
    console.log(this.email);*/
    console.log("Actual Mode: " + this.mode);
    formData.append("payerName", this.payer_name);
    formData.append("payerPhone", this.payer_phone);
    formData.append("payerEmail", this.email);
    // console.log("In desktop mode? " + this.inDesktopMode);

    if (this.mode === "Mobile Money") {
      var mobile_number = null;
      var selectedRadioButton = null;

      // Checking if phone number is valid via the plugin
      if (this.inDesktopMode) {
        if (this.desktopIti.isValidNumber()) {
          mobile_number = this.desktopIti.getNumber();
          this.hideMobileNumberError();
        } else {
          this.showMobileNumberError();
          return;
        }
        selectedRadioButton = e.target.querySelector('input[name="network"]:checked') as HTMLInputElement;
      } else {
        if (this.mobileIti.isValidNumber()) {
          mobile_number = this.mobileIti.getNumber();
          this.hideMobileNumberError();
        } else {
          this.showMobileNumberError();
          return;
        }
        selectedRadioButton = e.target.querySelector('input[name="network-mobile"]:checked') as HTMLInputElement;
      }

      if (selectedRadioButton === null) {
        this.showMomoSelectionError();
      } else {
        this.hideMomoSelectionError();
      }
      const mobile_network = selectedRadioButton.value;

      console.log(mobile_network);
      console.log(mobile_number);

      formData.append("mobile_number", mobile_number);
      formData.append("mobile_network", mobile_network);
    }

    formData.append("amount", this.amount.toString());
    formData.append("currency", this.currency);

    let foo = false;
    if (foo) {
      //var pending_banner = $(this.el.shadowRoot.getElementById("pending-container"));//-mobile" + banner_postfix));
      //pending_banner.css('display', 'flex');
      // $(this.el.shadowRoot.getElementById('pending-container-mobile')).removeClass('hidden');
      return;
    }

    const payment_link = "https://paybox.com.co/pay";
    const order_status_link = "https://paybox.com.co/transaction/";
    let transaction_token = "";
    fetch(payment_link, {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + this.merchant_key
      },
      body: formData
    }).then(response => response.json())
      .then((result) => {
        console.log(result);
        transaction_token = result.token;
        if (result.status === "Success") {
          this.el.shadowRoot.getElementById('payment_options').className = 'hidden';
          // this.el.shadowRoot.getElementById('confirm_details').className = 'hidden';
          this.showSuccessPage();
        } else if (result.status === "Pending") {
          this.showPendingBanner(banner_postfix);

          let statusCheckTimerId = setInterval(() => {
            let currentStatus = "";

            fetch(order_status_link + transaction_token, {
              method: "GET",
              headers: {
                "Authorization": "Bearer " + this.merchant_key
              }
            }).then(response => response.json())
              .then((result) => {
                console.log(result);
                currentStatus = result.status;
                console.log("current status: " + currentStatus);
                if (currentStatus === "Success") {
                  console.log("Success");
                  clearInterval(statusCheckTimerId);
                  this.removeBanners();
                  this.el.shadowRoot.getElementById('payment_options').className = 'hidden';
                  this.showSuccessPage();
                } else if (currentStatus === "Pending") {
                  console.log("Pending");
                  this.removeBanners();
                  this.showPendingBanner(banner_postfix);
                } else if (currentStatus === "Failed") {
                  this.removeBanners();
                  clearInterval(statusCheckTimerId);
                  this.showFailedBanner(banner_postfix);
                }
              })
              .catch(error => console.error('error', error));

          }, 5000);

          setTimeout(() => { clearInterval(statusCheckTimerId) }, 30000);
        }
      })
      // .then(result => window.location.href = "https://paybox.com.co/payment_success?token=" + result.token
      // )
      .catch(error => console.log('error', error));
  }

  showSuccessPage() {
    if (this.inDesktopMode) {
      this.el.shadowRoot.getElementById('success-page').className = 'flex-display';
    } else {
      this.el.shadowRoot.getElementById('success-page-mobile').className = 'flex-display';
    }
  }

  showPendingBanner(banner_postfix) {
    if (this.inDesktopMode) {
      var pending_banner = $(this.el.shadowRoot.getElementById("pending-container"));
      pending_banner.css('display', 'flex');
    } else {
      var pending_banner = $(this.el.shadowRoot.getElementById("pending-container-mobile" + banner_postfix));
      pending_banner.css('display', 'flex');
    }
  }

  showMobileNumberError() {
    if (this.inDesktopMode) {
      $(this.el.shadowRoot.getElementById('error-container')).css('display', 'flex');
    } else {
      $(this.el.shadowRoot.getElementById('error-container-m')).css('display', 'flex');
    }
  }

  hideMobileNumberError() {
    if (this.inDesktopMode) {
      $(this.el.shadowRoot.getElementById('error-container')).css('display', 'none');
    } else {
      $(this.el.shadowRoot.getElementById('error-container-m')).css('display', 'none');
    }
  }

  showMomoSelectionError() {
    if (this.inDesktopMode) {
      $(this.el.shadowRoot.getElementById('error-container-momo')).css('display', 'flex');
    } else {
      $(this.el.shadowRoot.getElementById('error-container-momo-m')).css('display', 'flex');
    }
  }

  hideMomoSelectionError() {
    if (this.inDesktopMode) {
      $(this.el.shadowRoot.getElementById('error-container-momo')).css('display', 'none');
    } else {
      $(this.el.shadowRoot.getElementById('error-container-momo-m')).css('display', 'none');
    }
  }

  showFailedBanner(banner_postfix) {
    if (this.inDesktopMode) {
      var pending_banner = $(this.el.shadowRoot.getElementById("failed-container"));
      pending_banner.css('display', 'flex');
    } else {
      var pending_banner = $(this.el.shadowRoot.getElementById("failed-container-mobile" + banner_postfix));
      pending_banner.css('display', 'flex');
    }
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
    if (!this.validateDetails()) {
      return;
    }
    this.el.shadowRoot.getElementById('payment_options').className = '';
    // this.el.shadowRoot.getElementById('payment_options2').className = '';
    this.el.shadowRoot.getElementById('confirm_details').className = 'hidden';
  }

  hidePaymentMethods() {
    this.el.shadowRoot.getElementById('payment_options').className = 'hidden';
    // this.el.shadowRoot.getElementById('payment_options2').className = 'hidden';
    this.el.shadowRoot.getElementById('confirm_details').className = '';
  }

  validateDetails() {
    const nameInput = this.el.shadowRoot.querySelector<HTMLInputElement>("#payer_name");
    const nameValue = nameInput.value.trim();
    this.payer_name = nameValue;

    const payerPhone = this.el.shadowRoot.querySelector<HTMLInputElement>("#payer_phone");
    const phoneValue = payerPhone.value.trim();
    this.payer_phone = phoneValue;

    const payerEmail = this.el.shadowRoot.querySelector<HTMLInputElement>("#payer_email");
    const emailValue = payerEmail.value.trim();
    this.email = emailValue;

    if (nameValue === "") {
      this.displayError(nameInput);
      return false;
    }

    if (phoneValue === "") {
      this.displayError(payerPhone);
      return false;
    }

    if (emailValue === "") {
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
    /*console.log(this.payer_name);
    console.log(this.payer_phone);
    console.log(this.amount);
    console.log(this.currency);
    console.log(this.merchant_key);*/
    if (this.merchant_key === null || this.merchant_key === "" || this.amount === null) {
      return;
    }
    this.el.shadowRoot.querySelectorAll<HTMLElement>(".amount-value").forEach((node) => { node.innerHTML = this.amount.toString(); });
    if (!this.gottenConfigs) {
      this.checkUserConfigs();
      this.getActiveNetworks();
      this.gottenConfigs = true;
    }
    this.el.shadowRoot.querySelector<HTMLDivElement>("#modal-container").classList.remove("hidden");
    this.el.shadowRoot.querySelector<HTMLDivElement>("#modal-container").classList.add("flex-display");
  }

  checkUserConfigs() {
    fetch("https://paybox.com.co/api/team/" + this.merchant_key, {
      method: "GET",
    })
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        if (result.mode === "Development") {
          this.isInDeveloperMode = true;
        } else {
          this.isInDeveloperMode = false;
        }

        // accept cash: 0 = false, accept cash: 1 = true
        if (result.accept_cash === 1) {
          this.cashIsEnabled = true;
        } else {
          this.cashIsEnabled = false;
        }
      })
      .catch(error => console.log('error', error));
  }

  getActiveNetworks() {
    fetch("https://paybox.com.co/active_networks?currency=" + this.currency, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + this.merchant_key
      },
    })
      .then(response => response.json())
      .then(activeNetworks => {
        const networkFieldsParents = this.el.shadowRoot.getElementById('networks');
        const networkFieldsParentsMobile = this.el.shadowRoot.getElementById('networks-mobile');
        // createNetworkElement(inputId, inputName, inputValue, labelId, imgSrc, imgAlt, labelText)
        for (let i = 0; i < activeNetworks.length; i++) {
          let currentNetwork = activeNetworks[i];
          if (currentNetwork.mobile_network_name === "MTN") {
            networkFieldsParents.appendChild(this.createNetworkElement(
              currentNetwork.mobile_network_name, 'network', currentNetwork.mobile_network,
              'mtn-network', '../../assets/svg/mtn.svg', 'mtn mobile money logo', 'MTN Mobile Money'));

            networkFieldsParentsMobile.appendChild(this.createNetworkElement(
              currentNetwork.mobile_network_name + '-SELECT', 'network-mobile', currentNetwork.mobile_network,
              'mtn-network', '../../assets/svg/mtn.svg', 'mtn mobile money logo', 'MTN Mobile Money'));
          } else if (currentNetwork.mobile_network_name === "VODAFONE") {
            networkFieldsParents.appendChild(this.createNetworkElement(
              currentNetwork.mobile_network_name, 'network', currentNetwork.mobile_network,
              'vodafone-network', '../../assets/svg/vodafone.svg', 'vodafone cash logo', 'VODAFONE Cash'));

            networkFieldsParentsMobile.appendChild(this.createNetworkElement(
              currentNetwork.mobile_network_name + '-SELECT', 'network-mobile', currentNetwork.mobile_network,
              'vodafone-network', '../../assets/svg/vodafone.svg', 'vodafone cash logo', 'VODAFONE Cash'));
          } else if (currentNetwork.mobile_network_name === "AT") {
            networkFieldsParents.appendChild(this.createNetworkElement(
              currentNetwork.mobile_network_name, 'network', currentNetwork.mobile_network,
              'airtel-network', '../../assets/svg/airtel.svg', 'airteltigo money logo', 'AIRTELTIGO Money'));

            networkFieldsParentsMobile.appendChild(this.createNetworkElement(
              currentNetwork.mobile_network_name + '-SELECT', 'network-mobile', currentNetwork.mobile_network,
              'airtel-network', '../../assets/svg/airtel.svg', 'airteltigo money logo', 'AIRTELTIGO Money'));
          }
        }
      })
  }

  hideModal(e) {
    const modalContent = this.el.shadowRoot.querySelector<HTMLDivElement>("#modal-content");
    if (modalContent.isEqualNode(e.target) || modalContent.contains(e.target)) {
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
        <button class="mobile-btn" onClick={() => this.openModal()}>Pay with PayBox</button>

        <div class="modal-overlay hidden" id='modal-container'>
          <div class="modal-content justify-items-center" id='modal-content'>

            <form id="theForm" method='POST' onSubmit={(e) => this.payRequest(e)}>
              <div id='payment_options'>
                {/* Start of desktop view */}

                <section id="desktop-view">
                  {/* <!--This is the header which contains the close button at the far right, which would allow the user to easily close the modal if they choose to--> */}
                  <header>
                    <figure id="recipient-logo">
                      <img src="../../assets/svg/recipient-account-logo.svg" alt="recipient logo" loading="eager" />
                    </figure>
                    <section id="header-texts">
                      <p id="pay-text">Pay <strong id="amount">GHS <span class="amount-value"></span></strong></p>
                      <p id="sender-email">{this.email}</p>
                    </section>
                    {/* <!--This is the button that the user can click to close the modal--> */}
                    <figure class="close-icon" onClick={() => this.closeModal()}>
                      <img onClick={() => this.closeModal()} src="../../assets/svg/close-icon.svg" alt="close icon button" loading="eager" />
                    </figure>
                  </header>
                  {/* <!--This is the card containing the elements or content that the user will mostly interact with, here is where the various payment method tabs with their respective contents are found--> */}
                  <section id="main-card">
                    {/* <!--This is the sidebar or navigation containing the various payment methods that a user can select from--> */}
                    <aside id="sidebar">
                      <h1 id="navbar-text">Pay with</h1>
                      <nav id="navbar">
                        <ul id="nav-items">
                          <li class="nav-item">
                            <a ref={el => (this.cardNavItem = el as HTMLAnchorElement)} onClick={() => this.placeCardContent()} id="card-nav-item" class="nav-tab active-tab" href="#">
                              <svg class="navitem-icon" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                <path d="M2.24414 8.51483H22.2441" stroke="#091925" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M6.24414 16.5148H8.24414" stroke="#091925" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M10.7441 16.5148H14.7441" stroke="#091925" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M6.68414 3.51483H17.7941C21.3541 3.51483 22.2441 4.39483 22.2441 7.90483V16.1148C22.2441 19.6248 21.3541 20.5048 17.8041 20.5048H6.68414C3.13414 20.5148 2.24414 19.6348 2.24414 16.1248V7.90483C2.24414 4.39483 3.13414 3.51483 6.68414 3.51483Z" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                              </svg>
                              <span class="nav-text">Card</span>
                            </a>
                          </li>
                          <li class="nav-item">
                            <a ref={el => (this.mobileMoneyNavItem = el as HTMLAnchorElement)} id="mobile-money-nav-item" onClick={() => this.placeMobileMoneyContent()} class="nav-tab" href="#">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M12.66 2.51814L12.63 2.58814L9.72999 9.31814H6.87999C6.19999 9.31814 5.54999 9.45814 4.95999 9.70814L6.70999 5.52814L6.74999 5.42814L6.81999 5.26814C6.83999 5.20814 6.85999 5.14814 6.88999 5.09814C8.19999 2.06814 9.67999 1.37814 12.66 2.51814Z" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M18.05 9.51814C17.6 9.37814 17.12 9.31814 16.64 9.31814H9.73001L12.63 2.58814L12.66 2.51814C12.81 2.56814 12.95 2.63814 13.1 2.69814L15.31 3.62814C16.54 4.13814 17.4 4.66814 17.92 5.30814C18.02 5.42814 18.1 5.53814 18.17 5.66814C18.26 5.80814 18.33 5.94814 18.37 6.09814C18.41 6.18814 18.44 6.27814 18.46 6.35814C18.73 7.19814 18.57 8.22814 18.05 9.51814Z" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M21.5217 14.1984V16.1484C21.5217 16.3484 21.5117 16.5484 21.5017 16.7484C21.3117 20.2384 19.3617 21.9984 15.6617 21.9984H7.86172C7.62172 21.9984 7.38172 21.9784 7.15172 21.9484C3.97172 21.7384 2.27172 20.0384 2.06172 16.8584C2.03172 16.6284 2.01172 16.3884 2.01172 16.1484V14.1984C2.01172 12.1884 3.23172 10.4584 4.97172 9.70836C5.57172 9.45836 6.21172 9.31836 6.89172 9.31836H16.6517C17.1417 9.31836 17.6217 9.38836 18.0617 9.51836C20.0517 10.1284 21.5217 11.9884 21.5217 14.1984Z" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M6.71 5.52814L4.96 9.70814C3.22 10.4581 2 12.1881 2 14.1981V11.2681C2 8.42814 4.02 6.05814 6.71 5.52814Z" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M21.5186 11.2677V14.1977C21.5186 11.9977 20.0586 10.1277 18.0586 9.52766C18.5786 8.22766 18.7286 7.20766 18.4786 6.35766C18.4586 6.26766 18.4286 6.17766 18.3886 6.09766C20.2486 7.05766 21.5186 9.02766 21.5186 11.2677Z" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                              </svg>
                              <span class="nav-text">Mobile money</span>
                            </a>
                          </li>
                          <li class={`${this.cashIsEnabled ? "nav-item" : "hidden"}`}>
                            <a ref={el => (this.cashPaymentNavItem = el as HTMLAnchorElement)} onClick={() => this.placeCashPaymentContent()} id="cash-payment-nav-item" class="nav-tab" href="#">
                              <svg class="navitem-icon" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                <path d="M17.2441 20.5099H7.24414C4.24414 20.5099 2.24414 19.0099 2.24414 15.5099V8.50989C2.24414 5.00989 4.24414 3.50989 7.24414 3.50989H17.2441C20.2441 3.50989 22.2441 5.00989 22.2441 8.50989V15.5099C22.2441 19.0099 20.2441 20.5099 17.2441 20.5099Z" stroke="#091925" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M12.2441 15.0099C13.901 15.0099 15.2441 13.6667 15.2441 12.0099C15.2441 10.353 13.901 9.00989 12.2441 9.00989C10.5873 9.00989 9.24414 10.353 9.24414 12.0099C9.24414 13.6667 10.5873 15.0099 12.2441 15.0099Z" stroke="#091925" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M5.74414 9.50989V14.5099" stroke="#091925" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M18.7441 9.50989V14.5099" stroke="#091925" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                              </svg>
                              <span class="nav-text">Cash payment</span>
                            </a>
                          </li>
                          <li class={`${this.isInDeveloperMode ? "nav-item" : "hidden"}`}>
                            <a ref={el => (this.testNavItem = el as HTMLAnchorElement)} onClick={() => this.placeTestContent()} id="test-nav-item" class="nav-tab" href="#">
                              <svg class="navitem-icon" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                <path d="M3.41418 7.44995L12.2442 12.5599L21.0142 7.47992" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M12.2441 21.6199V12.5499" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M21.8541 12.8399V9.17989C21.8541 7.79989 20.8641 6.11991 19.6541 5.44991L14.3141 2.48989C13.1741 1.84989 11.3141 1.84989 10.1741 2.48989L4.83414 5.44991C3.62414 6.11991 2.63416 7.79989 2.63416 9.17989V14.8399C2.63416 16.2199 3.62414 17.8999 4.83414 18.5699L10.1741 21.5299C10.7441 21.8499 11.4941 22.0099 12.2441 22.0099C12.9941 22.0099 13.7441 21.8499 14.3141 21.5299" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M19.4442 21.4099C21.2115 21.4099 22.6441 19.9772 22.6441 18.2099C22.6441 16.4426 21.2115 15.0099 19.4442 15.0099C17.6768 15.0099 16.2441 16.4426 16.2441 18.2099C16.2441 19.9772 17.6768 21.4099 19.4442 21.4099Z" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M23.2441 22.0099L22.2441 21.0099" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                              </svg>
                              <span class="nav-text">Test</span>
                            </a>
                          </li>
                        </ul>
                      </nav>
                    </aside>
                    {/* <!--This is the container that contains the content respectively for each of the payment method tabs on the sidebar--> */}
                    <section ref={el => (this.paymentMethodContainer = el as HTMLElement)} id="payment-method-container">
                      {/* <!--This is the container that shows the content of the card payment method when selected--> */}
                      <section ref={el => (this.cardDesktopContent = el as HTMLElement)} id="card-payment-content" class="payment-content">
                        <section class="first-part">
                          <section class="content-top-texts">
                            <h2 class="content-title">Card</h2>
                            <p class="content-text">Click button below to make your payment with card</p>
                          </section>
                          <button id="card-btn" class="desktop-btn">Pay GHS <span class="amount-value"></span></button>
                        </section>
                        <section class="secured-container">
                          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                            <path d="M18.5 7.00989C18.5 3.76989 15.741 1.00989 12.5 1.00989C9.257 1.00989 6.5 3.76989 6.5 7.00989V9.73289C5.21101 11.1885 4.49957 13.0656 4.5 15.0099C4.5 19.4259 8.084 23.0099 12.501 23.0099C16.918 23.0099 20.5 19.4259 20.5 15.0099C20.5006 13.0653 19.7891 11.1878 18.5 9.73189V7.00989ZM8.5 7.00989C8.5 4.87889 10.369 3.00989 12.5 3.00989C14.631 3.00989 16.5 4.87889 16.5 7.00989V8.08889C15.2853 7.38236 13.9051 7.01025 12.4999 7.01042C11.0946 7.0106 9.71453 7.38306 8.5 8.08989V7.00989ZM11 19.4239L7.293 15.7169L8.707 14.3029L11 16.5959L16.293 11.3029L17.707 12.7169L11 19.4239Z" fill="#2C7CB9" />
                          </svg>
                          <p class="secured-text">Secured by PayBox</p>
                        </section>
                      </section>
                      {/* <!--This is the container that shows the content of the mobile money payment method when selected--> */}
                      <section ref={el => (this.mobileMoneyDesktopContent = el as HTMLElement)} id="mobile-money-content" class="payment-content mobile-money-content">
                        <section class="first-part">
                          <section class="content-top-texts">
                            <h2 class="content-title">Mobile money</h2>
                            <p class="content-text">Fill the details to make payment with your mobile network money</p>
                          </section>
                          <fieldset id="inputs">
                            <fieldset id="networks-container">
                              <label id="networks-label" htmlFor="networks">Which mobile network?</label>
                              <fieldset id="networks">
                              </fieldset>
                            </fieldset>
                            <section id="error-container-momo">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M7.99998 14.6666C11.6666 14.6666 14.6666 11.6666 14.6666 7.99998C14.6666 4.33331 11.6666 1.33331 7.99998 1.33331C4.33331 1.33331 1.33331 4.33331 1.33331 7.99998C1.33331 11.6666 4.33331 14.6666 7.99998 14.6666Z" stroke="#EC6952" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M8 5.33331V8.66665" stroke="#EC6952" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M7.99634 10.6667H8.00233" stroke="#EC6952" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                              </svg>
                              <p class="error-message">Please select a mobile network</p>
                            </section>
                            <fieldset id="main-mobile-container">
                              <fieldset id="mobile-number-container">
                                <label htmlFor="mobile-number" id="mobile-number-text">What’s your mobile number?</label>
                                <input type="text" id="mobile-number" name="mobile_number" onKeyUp={() => this.foo()} />
                              </fieldset>
                              <section id="error-container">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                  <path d="M7.99998 14.6666C11.6666 14.6666 14.6666 11.6666 14.6666 7.99998C14.6666 4.33331 11.6666 1.33331 7.99998 1.33331C4.33331 1.33331 1.33331 4.33331 1.33331 7.99998C1.33331 11.6666 4.33331 14.6666 7.99998 14.6666Z" stroke="#EC6952" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                  <path d="M8 5.33331V8.66665" stroke="#EC6952" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                  <path d="M7.99634 10.6667H8.00233" stroke="#EC6952" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <p class="error-message">Mobile number not valid, ensure it's in this format: <strong>054 372 3054</strong></p>
                              </section>
                            </fieldset>
                          </fieldset>
                          <button onClick={() => this.inDesktopView()} id="card-btn" class="desktop-btn">Pay GHS <span class="amount-value"></span></button>
                        </section>
                        <section class="secured-container">
                          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                            <path d="M18.5 7.00989C18.5 3.76989 15.741 1.00989 12.5 1.00989C9.257 1.00989 6.5 3.76989 6.5 7.00989V9.73289C5.21101 11.1885 4.49957 13.0656 4.5 15.0099C4.5 19.4259 8.084 23.0099 12.501 23.0099C16.918 23.0099 20.5 19.4259 20.5 15.0099C20.5006 13.0653 19.7891 11.1878 18.5 9.73189V7.00989ZM8.5 7.00989C8.5 4.87889 10.369 3.00989 12.5 3.00989C14.631 3.00989 16.5 4.87889 16.5 7.00989V8.08889C15.2853 7.38236 13.9051 7.01025 12.4999 7.01042C11.0946 7.0106 9.71453 7.38306 8.5 8.08989V7.00989ZM11 19.4239L7.293 15.7169L8.707 14.3029L11 16.5959L16.293 11.3029L17.707 12.7169L11 19.4239Z" fill="#2C7CB9" />
                          </svg>
                          <p class="secured-text">Secured by PayBox</p>
                        </section>
                      </section>
                      {/* <!--This is the container that shows the content of the cash payment method when selected--> */}
                      <section ref={el => (this.cashPaymentDesktopContent = el as HTMLElement)} id="cash-payment-content" class={`${this.cashIsEnabled ? "payment-content" : "hidden"}`}>
                        <section class={`${this.cashIsEnabled ? "first-part" : "hidden"}`}>
                          <section class={`${this.cashIsEnabled ? "content-top-texts" : "hidden"}`}>
                            <h2 class="content-title">Cash payment</h2>
                            <p class="content-text">Click button below to make your payment with card</p>
                          </section>
                          <button id="card-btn" class="desktop-btn">Pay GHS <span class="amount-value"></span></button>
                        </section>
                        <section class={`${this.cashIsEnabled ? "secured-container" : "hidden"}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                            <path d="M18.5 7.00989C18.5 3.76989 15.741 1.00989 12.5 1.00989C9.257 1.00989 6.5 3.76989 6.5 7.00989V9.73289C5.21101 11.1885 4.49957 13.0656 4.5 15.0099C4.5 19.4259 8.084 23.0099 12.501 23.0099C16.918 23.0099 20.5 19.4259 20.5 15.0099C20.5006 13.0653 19.7891 11.1878 18.5 9.73189V7.00989ZM8.5 7.00989C8.5 4.87889 10.369 3.00989 12.5 3.00989C14.631 3.00989 16.5 4.87889 16.5 7.00989V8.08889C15.2853 7.38236 13.9051 7.01025 12.4999 7.01042C11.0946 7.0106 9.71453 7.38306 8.5 8.08989V7.00989ZM11 19.4239L7.293 15.7169L8.707 14.3029L11 16.5959L16.293 11.3029L17.707 12.7169L11 19.4239Z" fill="#2C7CB9" />
                          </svg>
                          <p class="secured-text">Secured by PayBox</p>
                        </section>
                      </section>
                      {/* <!--This is the container that shows the content of the test payment when selected--> */}
                      <section ref={el => (this.testPaymentDesktopContent = el as HTMLElement)} id="test-payment-content" class={`${this.isInDeveloperMode ? "payment-content" : "hidden"}`}>
                        <section class={`${this.isInDeveloperMode ? "first-part" : "hidden"}`}>
                          <section class={`${this.isInDeveloperMode ? "content-top-texts" : "hidden"}`}>
                            <h2 class="content-title">Test</h2>
                            <p class="content-text">Click button below to test out the payment system</p>
                          </section>
                          <button id="card-btn" class="desktop-btn">Pay GHS <span class="amount-value"></span></button>
                        </section>
                        <section class={`${this.isInDeveloperMode ? "secured-container" : "hidden"}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                            <path d="M18.5 7.00989C18.5 3.76989 15.741 1.00989 12.5 1.00989C9.257 1.00989 6.5 3.76989 6.5 7.00989V9.73289C5.21101 11.1885 4.49957 13.0656 4.5 15.0099C4.5 19.4259 8.084 23.0099 12.501 23.0099C16.918 23.0099 20.5 19.4259 20.5 15.0099C20.5006 13.0653 19.7891 11.1878 18.5 9.73189V7.00989ZM8.5 7.00989C8.5 4.87889 10.369 3.00989 12.5 3.00989C14.631 3.00989 16.5 4.87889 16.5 7.00989V8.08889C15.2853 7.38236 13.9051 7.01025 12.4999 7.01042C11.0946 7.0106 9.71453 7.38306 8.5 8.08989V7.00989ZM11 19.4239L7.293 15.7169L8.707 14.3029L11 16.5959L16.293 11.3029L17.707 12.7169L11 19.4239Z" fill="#2C7CB9" />
                          </svg>
                          <p class="secured-text">Secured by PayBox</p>
                        </section>
                      </section>
                    </section>
                  </section>
                  {/* <!--This is the banner for any alert message that comes up based on the user's actions--> */}
                  <section class="banner" id="alert-container">
                    <section class="banner-main-content">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 5.16603V8.66603" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M14.0533 5.71938V10.2794C14.0533 11.026 13.6533 11.7194 13.0067 12.0994L9.04667 14.386C8.40001 14.7594 7.59999 14.7594 6.94666 14.386L2.98665 12.0994C2.33999 11.726 1.93998 11.0327 1.93998 10.2794V5.71938C1.93998 4.97271 2.33999 4.27935 2.98665 3.89935L6.94666 1.61269C7.59332 1.23935 8.39334 1.23935 9.04667 1.61269L13.0067 3.89935C13.6533 4.27935 14.0533 4.96604 14.0533 5.71938Z" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M8 10.7994V10.866" stroke="#091925" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      <p class="banner-test">Alert test</p>
                    </section>
                    <section onClick={() => this.removeBanners()} class="banner-close">
                      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M4.70449 3.99915L7.85221 0.856425C7.94629 0.762342 7.99915 0.634737 7.99915 0.501682C7.99915 0.368628 7.94629 0.241023 7.85221 0.146939C7.75812 0.0528557 7.63052 0 7.49747 0C7.36441 0 7.23681 0.0528557 7.14272 0.146939L4 3.29466L0.857278 0.146939C0.763194 0.0528557 0.635589 1.18132e-07 0.502535 1.19123e-07C0.369481 1.20114e-07 0.241876 0.0528557 0.147792 0.146939C0.0537084 0.241023 0.000852802 0.368628 0.000852801 0.501682C0.0008528 0.634737 0.0537084 0.762342 0.147792 0.856425L3.29551 3.99915L0.147792 7.14187C0.100962 7.18832 0.0637917 7.24358 0.0384257 7.30446C0.0130598 7.36535 0 7.43065 0 7.49661C0 7.56257 0.0130598 7.62788 0.0384257 7.68876C0.0637917 7.74965 0.100962 7.80491 0.147792 7.85135C0.19424 7.89818 0.2495 7.93536 0.310386 7.96072C0.371271 7.98609 0.436577 7.99915 0.502535 7.99915C0.568493 7.99915 0.633799 7.98609 0.694684 7.96072C0.75557 7.93536 0.81083 7.89818 0.857278 7.85135L4 4.70364L7.14272 7.85135C7.18917 7.89818 7.24443 7.93536 7.30532 7.96072C7.3662 7.98609 7.43151 7.99915 7.49747 7.99915C7.56342 7.99915 7.62873 7.98609 7.68961 7.96072C7.7505 7.93536 7.80576 7.89818 7.85221 7.85135C7.89904 7.80491 7.93621 7.74965 7.96157 7.68876C7.98694 7.62788 8 7.56257 8 7.49661C8 7.43065 7.98694 7.36535 7.96157 7.30446C7.93621 7.24358 7.89904 7.18832 7.85221 7.14187L4.70449 3.99915Z" fill="#091925" />
                      </svg>
                    </section>
                  </section>
                  {/* <!--This is the banner for any success message that comes up based on the user's actions--> */}
                  <section class="banner" id="success-container">
                    <section class="banner-main-content">
                      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                        <path d="M8.5 14.666C12.1667 14.666 15.1667 11.666 15.1667 7.99936C15.1667 4.3327 12.1667 1.3327 8.5 1.3327C4.83333 1.3327 1.83333 4.3327 1.83333 7.99936C1.83333 11.666 4.83333 14.666 8.5 14.666Z" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M5.66667 7.99936L7.55333 9.88603L11.3333 6.11269" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      <p id="banner-test">Success test</p>
                    </section>
                    <section onClick={() => this.removeBanners()} class="banner-close">
                      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M4.70449 3.99915L7.85221 0.856425C7.94629 0.762342 7.99915 0.634737 7.99915 0.501682C7.99915 0.368628 7.94629 0.241023 7.85221 0.146939C7.75812 0.0528557 7.63052 0 7.49747 0C7.36441 0 7.23681 0.0528557 7.14272 0.146939L4 3.29466L0.857278 0.146939C0.763194 0.0528557 0.635589 1.18132e-07 0.502535 1.19123e-07C0.369481 1.20114e-07 0.241876 0.0528557 0.147792 0.146939C0.0537084 0.241023 0.000852802 0.368628 0.000852801 0.501682C0.0008528 0.634737 0.0537084 0.762342 0.147792 0.856425L3.29551 3.99915L0.147792 7.14187C0.100962 7.18832 0.0637917 7.24358 0.0384257 7.30446C0.0130598 7.36535 0 7.43065 0 7.49661C0 7.56257 0.0130598 7.62788 0.0384257 7.68876C0.0637917 7.74965 0.100962 7.80491 0.147792 7.85135C0.19424 7.89818 0.2495 7.93536 0.310386 7.96072C0.371271 7.98609 0.436577 7.99915 0.502535 7.99915C0.568493 7.99915 0.633799 7.98609 0.694684 7.96072C0.75557 7.93536 0.81083 7.89818 0.857278 7.85135L4 4.70364L7.14272 7.85135C7.18917 7.89818 7.24443 7.93536 7.30532 7.96072C7.3662 7.98609 7.43151 7.99915 7.49747 7.99915C7.56342 7.99915 7.62873 7.98609 7.68961 7.96072C7.7505 7.93536 7.80576 7.89818 7.85221 7.85135C7.89904 7.80491 7.93621 7.74965 7.96157 7.68876C7.98694 7.62788 8 7.56257 8 7.49661C8 7.43065 7.98694 7.36535 7.96157 7.30446C7.93621 7.24358 7.89904 7.18832 7.85221 7.14187L4.70449 3.99915Z" fill="#091925" />
                      </svg>
                    </section>
                  </section>
                  {/* <!--This is the banner for any pending message that comes up based on the user's actions--> */}
                  <section class="banner" id="pending-container">
                    <section class="banner-main-content">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M10.16 1.33269H5.84C3.33333 1.33269 3.14 3.58603 4.49333 4.81269L11.5067 11.186C12.86 12.4127 12.6667 14.666 10.16 14.666H5.84C3.33333 14.666 3.14 12.4127 4.49333 11.186L11.5067 4.81269C12.86 3.58603 12.6667 1.33269 10.16 1.33269Z" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      <p id="banner-test">Payment Pending</p>
                    </section>
                    <section onClick={() => this.removeBanners()} class="banner-close">
                      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M4.70449 3.99915L7.85221 0.856425C7.94629 0.762342 7.99915 0.634737 7.99915 0.501682C7.99915 0.368628 7.94629 0.241023 7.85221 0.146939C7.75812 0.0528557 7.63052 0 7.49747 0C7.36441 0 7.23681 0.0528557 7.14272 0.146939L4 3.29466L0.857278 0.146939C0.763194 0.0528557 0.635589 1.18132e-07 0.502535 1.19123e-07C0.369481 1.20114e-07 0.241876 0.0528557 0.147792 0.146939C0.0537084 0.241023 0.000852802 0.368628 0.000852801 0.501682C0.0008528 0.634737 0.0537084 0.762342 0.147792 0.856425L3.29551 3.99915L0.147792 7.14187C0.100962 7.18832 0.0637917 7.24358 0.0384257 7.30446C0.0130598 7.36535 0 7.43065 0 7.49661C0 7.56257 0.0130598 7.62788 0.0384257 7.68876C0.0637917 7.74965 0.100962 7.80491 0.147792 7.85135C0.19424 7.89818 0.2495 7.93536 0.310386 7.96072C0.371271 7.98609 0.436577 7.99915 0.502535 7.99915C0.568493 7.99915 0.633799 7.98609 0.694684 7.96072C0.75557 7.93536 0.81083 7.89818 0.857278 7.85135L4 4.70364L7.14272 7.85135C7.18917 7.89818 7.24443 7.93536 7.30532 7.96072C7.3662 7.98609 7.43151 7.99915 7.49747 7.99915C7.56342 7.99915 7.62873 7.98609 7.68961 7.96072C7.7505 7.93536 7.80576 7.89818 7.85221 7.85135C7.89904 7.80491 7.93621 7.74965 7.96157 7.68876C7.98694 7.62788 8 7.56257 8 7.49661C8 7.43065 7.98694 7.36535 7.96157 7.30446C7.93621 7.24358 7.89904 7.18832 7.85221 7.14187L4.70449 3.99915Z" fill="#091925" />
                      </svg>
                    </section>
                  </section>
                  {/* <!--This is the banner for any failed message that comes up based on the user's actions--> */}
                  <section class="banner" id="failed-container">
                    <section class="banner-main-content">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 5.99936V9.33269" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M8 14.2727H3.96C1.64667 14.2727 0.679999 12.6194 1.8 10.5994L3.88 6.85269L5.84 3.33269C7.02666 1.19269 8.97333 1.19269 10.16 3.33269L12.12 6.85936L14.2 10.606C15.32 12.626 14.3467 14.2794 12.04 14.2794H8V14.2727Z" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M7.99634 11.3327H8.00233" stroke="#091925" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      <p id="banner-test">Payment Failed</p>
                    </section>
                    <section onClick={() => this.removeBanners()} class="banner-close">
                      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M4.70449 3.99915L7.85221 0.856425C7.94629 0.762342 7.99915 0.634737 7.99915 0.501682C7.99915 0.368628 7.94629 0.241023 7.85221 0.146939C7.75812 0.0528557 7.63052 0 7.49747 0C7.36441 0 7.23681 0.0528557 7.14272 0.146939L4 3.29466L0.857278 0.146939C0.763194 0.0528557 0.635589 1.18132e-07 0.502535 1.19123e-07C0.369481 1.20114e-07 0.241876 0.0528557 0.147792 0.146939C0.0537084 0.241023 0.000852802 0.368628 0.000852801 0.501682C0.0008528 0.634737 0.0537084 0.762342 0.147792 0.856425L3.29551 3.99915L0.147792 7.14187C0.100962 7.18832 0.0637917 7.24358 0.0384257 7.30446C0.0130598 7.36535 0 7.43065 0 7.49661C0 7.56257 0.0130598 7.62788 0.0384257 7.68876C0.0637917 7.74965 0.100962 7.80491 0.147792 7.85135C0.19424 7.89818 0.2495 7.93536 0.310386 7.96072C0.371271 7.98609 0.436577 7.99915 0.502535 7.99915C0.568493 7.99915 0.633799 7.98609 0.694684 7.96072C0.75557 7.93536 0.81083 7.89818 0.857278 7.85135L4 4.70364L7.14272 7.85135C7.18917 7.89818 7.24443 7.93536 7.30532 7.96072C7.3662 7.98609 7.43151 7.99915 7.49747 7.99915C7.56342 7.99915 7.62873 7.98609 7.68961 7.96072C7.7505 7.93536 7.80576 7.89818 7.85221 7.85135C7.89904 7.80491 7.93621 7.74965 7.96157 7.68876C7.98694 7.62788 8 7.56257 8 7.49661C8 7.43065 7.98694 7.36535 7.96157 7.30446C7.93621 7.24358 7.89904 7.18832 7.85221 7.14187L4.70449 3.99915Z" fill="#091925" />
                      </svg>
                    </section>
                  </section>
                  {/* <!--This is the banner for any info message that comes up based on the user's actions--> */}
                  <section class="banner" id="info-container">
                    <section class="banner-main-content">
                      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                        <path d="M8.5 14.666C12.1667 14.666 15.1667 11.666 15.1667 7.99935C15.1667 4.33269 12.1667 1.33269 8.5 1.33269C4.83333 1.33269 1.83333 4.33269 1.83333 7.99935C1.83333 11.666 4.83333 14.666 8.5 14.666Z" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M8.5 5.33269V8.66602" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M8.49634 10.666H8.50233" stroke="#091925" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      <p id="banner-test">Info test</p>
                    </section>
                    <section onClick={() => this.removeBanners()} class="banner-close">
                      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M4.70449 3.99915L7.85221 0.856425C7.94629 0.762342 7.99915 0.634737 7.99915 0.501682C7.99915 0.368628 7.94629 0.241023 7.85221 0.146939C7.75812 0.0528557 7.63052 0 7.49747 0C7.36441 0 7.23681 0.0528557 7.14272 0.146939L4 3.29466L0.857278 0.146939C0.763194 0.0528557 0.635589 1.18132e-07 0.502535 1.19123e-07C0.369481 1.20114e-07 0.241876 0.0528557 0.147792 0.146939C0.0537084 0.241023 0.000852802 0.368628 0.000852801 0.501682C0.0008528 0.634737 0.0537084 0.762342 0.147792 0.856425L3.29551 3.99915L0.147792 7.14187C0.100962 7.18832 0.0637917 7.24358 0.0384257 7.30446C0.0130598 7.36535 0 7.43065 0 7.49661C0 7.56257 0.0130598 7.62788 0.0384257 7.68876C0.0637917 7.74965 0.100962 7.80491 0.147792 7.85135C0.19424 7.89818 0.2495 7.93536 0.310386 7.96072C0.371271 7.98609 0.436577 7.99915 0.502535 7.99915C0.568493 7.99915 0.633799 7.98609 0.694684 7.96072C0.75557 7.93536 0.81083 7.89818 0.857278 7.85135L4 4.70364L7.14272 7.85135C7.18917 7.89818 7.24443 7.93536 7.30532 7.96072C7.3662 7.98609 7.43151 7.99915 7.49747 7.99915C7.56342 7.99915 7.62873 7.98609 7.68961 7.96072C7.7505 7.93536 7.80576 7.89818 7.85221 7.85135C7.89904 7.80491 7.93621 7.74965 7.96157 7.68876C7.98694 7.62788 8 7.56257 8 7.49661C8 7.43065 7.98694 7.36535 7.96157 7.30446C7.93621 7.24358 7.89904 7.18832 7.85221 7.14187L4.70449 3.99915Z" fill="#091925" />
                      </svg>
                    </section>
                  </section>
                </section>

                {/* End of desktop view */}



























                {/* Start of Mobile View */}

                <section id="mobile-view">
                  {/* <!--This is the initial page on the modal that shows in mobile view, it shows the various payment method the user can click on to proceed with their transaction--> */}
                  <section ref={el => (this.initialMobilePage = el as HTMLElement)} id="mobile-initial-page">
                    {/* <!--Here you will find the various payment methods the user can click on--> */}
                    <section id="initial-top-section">
                      <figure class="close-icon">
                        <img onClick={() => this.closeModal()} src="../../assets/svg/close-icon.svg" alt="close icon button" loading="eager" />
                      </figure>
                      <section id="mobile-top-content">
                        <h1 id="title">PayBox Checkout</h1>
                        <p id="subtext">Use one of the payments method below to pay GHS <span class="amount-value"></span> to Paybox:</p>
                      </section>
                      {/* <!--This is exactly where the various payment methods are--> */}
                      <nav id="navbar">
                        <ul id="nav-items">
                          <li class="nav-item">
                            <a onClick={() => this.goMobileCardPage()} href="#">
                              <section class="nav-icon-text">
                                <svg class="navitem-icon" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                  <path d="M2.24414 8.51483H22.2441" stroke="#091925" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                  <path d="M6.24414 16.5148H8.24414" stroke="#091925" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                  <path d="M10.7441 16.5148H14.7441" stroke="#091925" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                  <path d="M6.68414 3.51483H17.7941C21.3541 3.51483 22.2441 4.39483 22.2441 7.90483V16.1148C22.2441 19.6248 21.3541 20.5048 17.8041 20.5048H6.68414C3.13414 20.5148 2.24414 19.6348 2.24414 16.1248V7.90483C2.24414 4.39483 3.13414 3.51483 6.68414 3.51483Z" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg><span class="nav-text">Card</span>
                              </section>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                <g clip-path="url(#clip0_80_521)">
                                  <path d="M8.58997 16.5999L13.17 12.0099L8.58997 7.41989L9.99997 6.00989L16 12.0099L9.99997 18.0099L8.58997 16.5999Z" fill="#091925" />
                                </g>
                                <defs>
                                  <clipPath id="clip0_80_521">
                                    <rect width="24" height="24" fill="white" transform="translate(0 0.0098877)" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </a>
                          </li>
                          <li class="nav-item">
                            <a onClick={() => this.goMobileMobilemoneyPage()} href="#">
                              <section class="nav-icon-text">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                  <path d="M12.66 2.51814L12.63 2.58814L9.72999 9.31814H6.87999C6.19999 9.31814 5.54999 9.45814 4.95999 9.70814L6.70999 5.52814L6.74999 5.42814L6.81999 5.26814C6.83999 5.20814 6.85999 5.14814 6.88999 5.09814C8.19999 2.06814 9.67999 1.37814 12.66 2.51814Z" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                  <path d="M18.05 9.51814C17.6 9.37814 17.12 9.31814 16.64 9.31814H9.73001L12.63 2.58814L12.66 2.51814C12.81 2.56814 12.95 2.63814 13.1 2.69814L15.31 3.62814C16.54 4.13814 17.4 4.66814 17.92 5.30814C18.02 5.42814 18.1 5.53814 18.17 5.66814C18.26 5.80814 18.33 5.94814 18.37 6.09814C18.41 6.18814 18.44 6.27814 18.46 6.35814C18.73 7.19814 18.57 8.22814 18.05 9.51814Z" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                  <path d="M21.5217 14.1984V16.1484C21.5217 16.3484 21.5117 16.5484 21.5017 16.7484C21.3117 20.2384 19.3617 21.9984 15.6617 21.9984H7.86172C7.62172 21.9984 7.38172 21.9784 7.15172 21.9484C3.97172 21.7384 2.27172 20.0384 2.06172 16.8584C2.03172 16.6284 2.01172 16.3884 2.01172 16.1484V14.1984C2.01172 12.1884 3.23172 10.4584 4.97172 9.70836C5.57172 9.45836 6.21172 9.31836 6.89172 9.31836H16.6517C17.1417 9.31836 17.6217 9.38836 18.0617 9.51836C20.0517 10.1284 21.5217 11.9884 21.5217 14.1984Z" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                  <path d="M6.71 5.52814L4.96 9.70814C3.22 10.4581 2 12.1881 2 14.1981V11.2681C2 8.42814 4.02 6.05814 6.71 5.52814Z" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                  <path d="M21.5186 11.2677V14.1977C21.5186 11.9977 20.0586 10.1277 18.0586 9.52766C18.5786 8.22766 18.7286 7.20766 18.4786 6.35766C18.4586 6.26766 18.4286 6.17766 18.3886 6.09766C20.2486 7.05766 21.5186 9.02766 21.5186 11.2677Z" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg><span class="nav-text">Mobile money</span>
                              </section>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                <g clip-path="url(#clip0_80_521)">
                                  <path d="M8.58997 16.5999L13.17 12.0099L8.58997 7.41989L9.99997 6.00989L16 12.0099L9.99997 18.0099L8.58997 16.5999Z" fill="#091925" />
                                </g>
                                <defs>
                                  <clipPath id="clip0_80_521">
                                    <rect width="24" height="24" fill="white" transform="translate(0 0.0098877)" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </a>
                          </li>
                          <li class="nav-item">
                            <a onClick={() => this.goMobileCashPaymentPage()} href="#">
                              <section class="nav-icon-text">
                                <svg class="navitem-icon" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                  <path d="M17.2441 20.5099H7.24414C4.24414 20.5099 2.24414 19.0099 2.24414 15.5099V8.50989C2.24414 5.00989 4.24414 3.50989 7.24414 3.50989H17.2441C20.2441 3.50989 22.2441 5.00989 22.2441 8.50989V15.5099C22.2441 19.0099 20.2441 20.5099 17.2441 20.5099Z" stroke="#091925" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                  <path d="M12.2441 15.0099C13.901 15.0099 15.2441 13.6667 15.2441 12.0099C15.2441 10.353 13.901 9.00989 12.2441 9.00989C10.5873 9.00989 9.24414 10.353 9.24414 12.0099C9.24414 13.6667 10.5873 15.0099 12.2441 15.0099Z" stroke="#091925" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                  <path d="M5.74414 9.50989V14.5099" stroke="#091925" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                  <path d="M18.7441 9.50989V14.5099" stroke="#091925" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                </svg><span class="nav-text">Cash payment</span>
                              </section>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                <g clip-path="url(#clip0_80_521)">
                                  <path d="M8.58997 16.5999L13.17 12.0099L8.58997 7.41989L9.99997 6.00989L16 12.0099L9.99997 18.0099L8.58997 16.5999Z" fill="#091925" />
                                </g>
                                <defs>
                                  <clipPath id="clip0_80_521">
                                    <rect width="24" height="24" fill="white" transform="translate(0 0.0098877)" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </a>
                          </li>
                          <li class="nav-item">
                            <a onClick={() => this.goMobileTestPage()} href="#">
                              <section class="nav-icon-text">
                                <svg class="navitem-icon" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                  <path d="M3.41418 7.44995L12.2442 12.5599L21.0142 7.47992" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                  <path d="M12.2441 21.6199V12.5499" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                  <path d="M21.8541 12.8399V9.17989C21.8541 7.79989 20.8641 6.11991 19.6541 5.44991L14.3141 2.48989C13.1741 1.84989 11.3141 1.84989 10.1741 2.48989L4.83414 5.44991C3.62414 6.11991 2.63416 7.79989 2.63416 9.17989V14.8399C2.63416 16.2199 3.62414 17.8999 4.83414 18.5699L10.1741 21.5299C10.7441 21.8499 11.4941 22.0099 12.2441 22.0099C12.9941 22.0099 13.7441 21.8499 14.3141 21.5299" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                  <path d="M19.4442 21.4099C21.2115 21.4099 22.6441 19.9772 22.6441 18.2099C22.6441 16.4426 21.2115 15.0099 19.4442 15.0099C17.6768 15.0099 16.2441 16.4426 16.2441 18.2099C16.2441 19.9772 17.6768 21.4099 19.4442 21.4099Z" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                  <path d="M23.2441 22.0099L22.2441 21.0099" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg><span class="nav-text">Test</span>
                              </section>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                <g clip-path="url(#clip0_80_521)">
                                  <path d="M8.58997 16.5999L13.17 12.0099L8.58997 7.41989L9.99997 6.00989L16 12.0099L9.99997 18.0099L8.58997 16.5999Z" fill="#091925" />
                                </g>
                                <defs>
                                  <clipPath id="clip0_80_521">
                                    <rect width="24" height="24" fill="white" transform="translate(0 0.0098877)" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </a>
                          </li>
                        </ul>
                      </nav>
                    </section>
                    <section class="secured-container">
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                        <path d="M18.5 7.00989C18.5 3.76989 15.741 1.00989 12.5 1.00989C9.257 1.00989 6.5 3.76989 6.5 7.00989V9.73289C5.21101 11.1885 4.49957 13.0656 4.5 15.0099C4.5 19.4259 8.084 23.0099 12.501 23.0099C16.918 23.0099 20.5 19.4259 20.5 15.0099C20.5006 13.0653 19.7891 11.1878 18.5 9.73189V7.00989ZM8.5 7.00989C8.5 4.87889 10.369 3.00989 12.5 3.00989C14.631 3.00989 16.5 4.87889 16.5 7.00989V8.08889C15.2853 7.38236 13.9051 7.01025 12.4999 7.01042C11.0946 7.0106 9.71453 7.38306 8.5 8.08989V7.00989ZM11 19.4239L7.293 15.7169L8.707 14.3029L11 16.5959L16.293 11.3029L17.707 12.7169L11 19.4239Z" fill="#2C7CB9" />
                      </svg>
                      <p class="secured-text">Secured by PayBox</p>
                    </section>
                  </section>
                  {/* <!--This is the page that comes up for the mobile view when the user clicks on 'Card' on the initial page, it shows the content when the user clicks on card payment method--> */}
                  <section class="mobile-page-setter" ref={el => (this.cardPageMobile = el as HTMLElement)} id="mobile-card-page">
                    <section class="top-bar">
                      <section onClick={() => this.backToInitialPage()} class="back-btn-container">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                          <path d="M9.57 5.93494L3.5 12.0049L9.57 18.0749" stroke="#091925" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M20.5 12.0049H3.67004" stroke="#091925" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <p class="back-text">Back</p>
                      </section>
                      <figure class="close-icon">
                        <img onClick={() => this.closeModal()} src="../../assets/svg/close-icon.svg" alt="close icon button" loading="eager" />
                      </figure>
                    </section>
                    {/* <!--This is where the main content is when the user clicks on the card payment method on the initial screen--> */}
                    <section class="main-content">
                      <section class="recipient-logo-and-texts">
                        <figure id="recipient-logo">
                          <img src="../../assets/svg/recipient-account-logo.svg" alt="recipient logo" loading="eager" />
                        </figure>
                        <section class="sender-texts">
                          <p class="sender-text">Pay <strong id="amount">GHS <span class="amount-value"></span></strong></p>
                          <p class="sender-email">{this.email}</p>
                        </section>
                      </section>
                      <section class="payment-content-container">
                        <section class="content-details">
                          <section class="content-top-texts">
                            <h2 class="content-title">Card</h2>
                            <p class="content-text">Click button below to make your payment with card</p>
                          </section>
                          <button id="card-btn" onClick={() => this.inMobileView()} class="mobile-btn">Pay GHS <span class="amount-value"></span></button>
                        </section>
                      </section>
                    </section>
                    {/* <!--Everything below are the various banners for alert, success, pending, failed and info which would appear respectively based on the type of action a user takes or state of things --> */}
                    <section class="banner" id="alert-container-mobile-card">
                      <section class="banner-main-content">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 5.16603V8.66603" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M14.0533 5.71938V10.2794C14.0533 11.026 13.6533 11.7194 13.0067 12.0994L9.04667 14.386C8.40001 14.7594 7.59999 14.7594 6.94666 14.386L2.98665 12.0994C2.33999 11.726 1.93998 11.0327 1.93998 10.2794V5.71938C1.93998 4.97271 2.33999 4.27935 2.98665 3.89935L6.94666 1.61269C7.59332 1.23935 8.39334 1.23935 9.04667 1.61269L13.0067 3.89935C13.6533 4.27935 14.0533 4.96604 14.0533 5.71938Z" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M8 10.7994V10.866" stroke="#091925" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <p class="banner-test">Alert test is very solid on the outside, please check what's happeingin.</p>
                      </section>
                      <section onClick={() => this.removeBanners()} id="close-alert-mobile" class="banner-close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M4.70449 3.99915L7.85221 0.856425C7.94629 0.762342 7.99915 0.634737 7.99915 0.501682C7.99915 0.368628 7.94629 0.241023 7.85221 0.146939C7.75812 0.0528557 7.63052 0 7.49747 0C7.36441 0 7.23681 0.0528557 7.14272 0.146939L4 3.29466L0.857278 0.146939C0.763194 0.0528557 0.635589 1.18132e-07 0.502535 1.19123e-07C0.369481 1.20114e-07 0.241876 0.0528557 0.147792 0.146939C0.0537084 0.241023 0.000852802 0.368628 0.000852801 0.501682C0.0008528 0.634737 0.0537084 0.762342 0.147792 0.856425L3.29551 3.99915L0.147792 7.14187C0.100962 7.18832 0.0637917 7.24358 0.0384257 7.30446C0.0130598 7.36535 0 7.43065 0 7.49661C0 7.56257 0.0130598 7.62788 0.0384257 7.68876C0.0637917 7.74965 0.100962 7.80491 0.147792 7.85135C0.19424 7.89818 0.2495 7.93536 0.310386 7.96072C0.371271 7.98609 0.436577 7.99915 0.502535 7.99915C0.568493 7.99915 0.633799 7.98609 0.694684 7.96072C0.75557 7.93536 0.81083 7.89818 0.857278 7.85135L4 4.70364L7.14272 7.85135C7.18917 7.89818 7.24443 7.93536 7.30532 7.96072C7.3662 7.98609 7.43151 7.99915 7.49747 7.99915C7.56342 7.99915 7.62873 7.98609 7.68961 7.96072C7.7505 7.93536 7.80576 7.89818 7.85221 7.85135C7.89904 7.80491 7.93621 7.74965 7.96157 7.68876C7.98694 7.62788 8 7.56257 8 7.49661C8 7.43065 7.98694 7.36535 7.96157 7.30446C7.93621 7.24358 7.89904 7.18832 7.85221 7.14187L4.70449 3.99915Z" fill="#091925" />
                        </svg>
                      </section>
                    </section>
                    <section class="banner" id="success-container-mobile-card">
                      <section class="banner-main-content">
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                          <path d="M8.5 14.666C12.1667 14.666 15.1667 11.666 15.1667 7.99936C15.1667 4.3327 12.1667 1.3327 8.5 1.3327C4.83333 1.3327 1.83333 4.3327 1.83333 7.99936C1.83333 11.666 4.83333 14.666 8.5 14.666Z" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M5.66667 7.99936L7.55333 9.88603L11.3333 6.11269" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <p id="banner-test">Success test</p>
                      </section>
                      <section onClick={() => this.removeBanners()} id="close-success-mobile" class="banner-close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M4.70449 3.99915L7.85221 0.856425C7.94629 0.762342 7.99915 0.634737 7.99915 0.501682C7.99915 0.368628 7.94629 0.241023 7.85221 0.146939C7.75812 0.0528557 7.63052 0 7.49747 0C7.36441 0 7.23681 0.0528557 7.14272 0.146939L4 3.29466L0.857278 0.146939C0.763194 0.0528557 0.635589 1.18132e-07 0.502535 1.19123e-07C0.369481 1.20114e-07 0.241876 0.0528557 0.147792 0.146939C0.0537084 0.241023 0.000852802 0.368628 0.000852801 0.501682C0.0008528 0.634737 0.0537084 0.762342 0.147792 0.856425L3.29551 3.99915L0.147792 7.14187C0.100962 7.18832 0.0637917 7.24358 0.0384257 7.30446C0.0130598 7.36535 0 7.43065 0 7.49661C0 7.56257 0.0130598 7.62788 0.0384257 7.68876C0.0637917 7.74965 0.100962 7.80491 0.147792 7.85135C0.19424 7.89818 0.2495 7.93536 0.310386 7.96072C0.371271 7.98609 0.436577 7.99915 0.502535 7.99915C0.568493 7.99915 0.633799 7.98609 0.694684 7.96072C0.75557 7.93536 0.81083 7.89818 0.857278 7.85135L4 4.70364L7.14272 7.85135C7.18917 7.89818 7.24443 7.93536 7.30532 7.96072C7.3662 7.98609 7.43151 7.99915 7.49747 7.99915C7.56342 7.99915 7.62873 7.98609 7.68961 7.96072C7.7505 7.93536 7.80576 7.89818 7.85221 7.85135C7.89904 7.80491 7.93621 7.74965 7.96157 7.68876C7.98694 7.62788 8 7.56257 8 7.49661C8 7.43065 7.98694 7.36535 7.96157 7.30446C7.93621 7.24358 7.89904 7.18832 7.85221 7.14187L4.70449 3.99915Z" fill="#091925" />
                        </svg>
                      </section>
                    </section>
                    <section class="banner" id="pending-container-mobile-card">
                      <section class="banner-main-content">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M10.16 1.33269H5.84C3.33333 1.33269 3.14 3.58603 4.49333 4.81269L11.5067 11.186C12.86 12.4127 12.6667 14.666 10.16 14.666H5.84C3.33333 14.666 3.14 12.4127 4.49333 11.186L11.5067 4.81269C12.86 3.58603 12.6667 1.33269 10.16 1.33269Z" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <p id="banner-test">Pending test</p>
                      </section>
                      <section onClick={() => this.removeBanners()} id="close-pending-mobile" class="banner-close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M4.70449 3.99915L7.85221 0.856425C7.94629 0.762342 7.99915 0.634737 7.99915 0.501682C7.99915 0.368628 7.94629 0.241023 7.85221 0.146939C7.75812 0.0528557 7.63052 0 7.49747 0C7.36441 0 7.23681 0.0528557 7.14272 0.146939L4 3.29466L0.857278 0.146939C0.763194 0.0528557 0.635589 1.18132e-07 0.502535 1.19123e-07C0.369481 1.20114e-07 0.241876 0.0528557 0.147792 0.146939C0.0537084 0.241023 0.000852802 0.368628 0.000852801 0.501682C0.0008528 0.634737 0.0537084 0.762342 0.147792 0.856425L3.29551 3.99915L0.147792 7.14187C0.100962 7.18832 0.0637917 7.24358 0.0384257 7.30446C0.0130598 7.36535 0 7.43065 0 7.49661C0 7.56257 0.0130598 7.62788 0.0384257 7.68876C0.0637917 7.74965 0.100962 7.80491 0.147792 7.85135C0.19424 7.89818 0.2495 7.93536 0.310386 7.96072C0.371271 7.98609 0.436577 7.99915 0.502535 7.99915C0.568493 7.99915 0.633799 7.98609 0.694684 7.96072C0.75557 7.93536 0.81083 7.89818 0.857278 7.85135L4 4.70364L7.14272 7.85135C7.18917 7.89818 7.24443 7.93536 7.30532 7.96072C7.3662 7.98609 7.43151 7.99915 7.49747 7.99915C7.56342 7.99915 7.62873 7.98609 7.68961 7.96072C7.7505 7.93536 7.80576 7.89818 7.85221 7.85135C7.89904 7.80491 7.93621 7.74965 7.96157 7.68876C7.98694 7.62788 8 7.56257 8 7.49661C8 7.43065 7.98694 7.36535 7.96157 7.30446C7.93621 7.24358 7.89904 7.18832 7.85221 7.14187L4.70449 3.99915Z" fill="#091925" />
                        </svg>
                      </section>
                    </section>
                    <section class="banner" id="failed-container-mobile-card">
                      <section class="banner-main-content">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 5.99936V9.33269" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M8 14.2727H3.96C1.64667 14.2727 0.679999 12.6194 1.8 10.5994L3.88 6.85269L5.84 3.33269C7.02666 1.19269 8.97333 1.19269 10.16 3.33269L12.12 6.85936L14.2 10.606C15.32 12.626 14.3467 14.2794 12.04 14.2794H8V14.2727Z" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M7.99634 11.3327H8.00233" stroke="#091925" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <p id="banner-test">Payment Failed</p>
                      </section>
                      <section onClick={() => this.removeBanners()} id="close-failed-mobile" class="banner-close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M4.70449 3.99915L7.85221 0.856425C7.94629 0.762342 7.99915 0.634737 7.99915 0.501682C7.99915 0.368628 7.94629 0.241023 7.85221 0.146939C7.75812 0.0528557 7.63052 0 7.49747 0C7.36441 0 7.23681 0.0528557 7.14272 0.146939L4 3.29466L0.857278 0.146939C0.763194 0.0528557 0.635589 1.18132e-07 0.502535 1.19123e-07C0.369481 1.20114e-07 0.241876 0.0528557 0.147792 0.146939C0.0537084 0.241023 0.000852802 0.368628 0.000852801 0.501682C0.0008528 0.634737 0.0537084 0.762342 0.147792 0.856425L3.29551 3.99915L0.147792 7.14187C0.100962 7.18832 0.0637917 7.24358 0.0384257 7.30446C0.0130598 7.36535 0 7.43065 0 7.49661C0 7.56257 0.0130598 7.62788 0.0384257 7.68876C0.0637917 7.74965 0.100962 7.80491 0.147792 7.85135C0.19424 7.89818 0.2495 7.93536 0.310386 7.96072C0.371271 7.98609 0.436577 7.99915 0.502535 7.99915C0.568493 7.99915 0.633799 7.98609 0.694684 7.96072C0.75557 7.93536 0.81083 7.89818 0.857278 7.85135L4 4.70364L7.14272 7.85135C7.18917 7.89818 7.24443 7.93536 7.30532 7.96072C7.3662 7.98609 7.43151 7.99915 7.49747 7.99915C7.56342 7.99915 7.62873 7.98609 7.68961 7.96072C7.7505 7.93536 7.80576 7.89818 7.85221 7.85135C7.89904 7.80491 7.93621 7.74965 7.96157 7.68876C7.98694 7.62788 8 7.56257 8 7.49661C8 7.43065 7.98694 7.36535 7.96157 7.30446C7.93621 7.24358 7.89904 7.18832 7.85221 7.14187L4.70449 3.99915Z" fill="#091925" />
                        </svg>
                      </section>
                    </section>
                    <section class="banner" id="info-container-mobile-card">
                      <section class="banner-main-content">
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                          <path d="M8.5 14.666C12.1667 14.666 15.1667 11.666 15.1667 7.99935C15.1667 4.33269 12.1667 1.33269 8.5 1.33269C4.83333 1.33269 1.83333 4.33269 1.83333 7.99935C1.83333 11.666 4.83333 14.666 8.5 14.666Z" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M8.5 5.33269V8.66602" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M8.49634 10.666H8.50233" stroke="#091925" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <p id="banner-test">Info test</p>
                      </section>
                      <section onClick={() => this.removeBanners()} id="close-info-mobile" class="banner-close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M4.70449 3.99915L7.85221 0.856425C7.94629 0.762342 7.99915 0.634737 7.99915 0.501682C7.99915 0.368628 7.94629 0.241023 7.85221 0.146939C7.75812 0.0528557 7.63052 0 7.49747 0C7.36441 0 7.23681 0.0528557 7.14272 0.146939L4 3.29466L0.857278 0.146939C0.763194 0.0528557 0.635589 1.18132e-07 0.502535 1.19123e-07C0.369481 1.20114e-07 0.241876 0.0528557 0.147792 0.146939C0.0537084 0.241023 0.000852802 0.368628 0.000852801 0.501682C0.0008528 0.634737 0.0537084 0.762342 0.147792 0.856425L3.29551 3.99915L0.147792 7.14187C0.100962 7.18832 0.0637917 7.24358 0.0384257 7.30446C0.0130598 7.36535 0 7.43065 0 7.49661C0 7.56257 0.0130598 7.62788 0.0384257 7.68876C0.0637917 7.74965 0.100962 7.80491 0.147792 7.85135C0.19424 7.89818 0.2495 7.93536 0.310386 7.96072C0.371271 7.98609 0.436577 7.99915 0.502535 7.99915C0.568493 7.99915 0.633799 7.98609 0.694684 7.96072C0.75557 7.93536 0.81083 7.89818 0.857278 7.85135L4 4.70364L7.14272 7.85135C7.18917 7.89818 7.24443 7.93536 7.30532 7.96072C7.3662 7.98609 7.43151 7.99915 7.49747 7.99915C7.56342 7.99915 7.62873 7.98609 7.68961 7.96072C7.7505 7.93536 7.80576 7.89818 7.85221 7.85135C7.89904 7.80491 7.93621 7.74965 7.96157 7.68876C7.98694 7.62788 8 7.56257 8 7.49661C8 7.43065 7.98694 7.36535 7.96157 7.30446C7.93621 7.24358 7.89904 7.18832 7.85221 7.14187L4.70449 3.99915Z" fill="#091925" />
                        </svg>
                      </section>
                    </section>
                  </section>
                  {/* <!--This is the page that comes up for the mobile view when the user clicks on 'Mobile money' on the initial page, it shows the content when the user clicks on mobile money payment method--> */}
                  <section class="mobile-page-setter mobile-money-content" ref={el => (this.mobileMoneyPageMobile = el as HTMLElement)} id="mobile-mobilemoney-page">
                    <section class="top-bar">
                      <section onClick={() => this.backToInitialPage()} class="back-btn-container">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                          <path d="M9.57 5.93494L3.5 12.0049L9.57 18.0749" stroke="#091925" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M20.5 12.0049H3.67004" stroke="#091925" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <p class="back-text">Back</p>
                      </section>
                      <figure class="close-icon">
                        <img onClick={() => this.closeModal()} src="../../assets/svg/close-icon.svg" alt="close icon button" loading="eager" />
                      </figure>
                    </section>
                    {/* <!--This is where the main content is when the user clicks on the mobile money payment method on the initial screen--> */}
                    <section class="main-content">
                      <section class="recipient-logo-and-texts">
                        <figure id="recipient-logo">
                          <img src="../../assets/svg/recipient-account-logo.svg" alt="recipient logo" loading="eager" />
                        </figure>
                        <section class="sender-texts">
                          <p class="sender-text">Pay <strong id="amount">GHS <span class="amount-value"></span></strong></p>
                          <p class="sender-email">{this.email}</p>
                        </section>
                      </section>
                      <section class="payment-content-container">
                        <section class="content-details">
                          <section class="content-top-texts">
                            <h2 class="content-title">Mobile money</h2>
                            <p class="content-text">Fill the details to make payment with your mobile network money</p>
                          </section>
                          <section id="mobile-money-form" class="first-part">
                            <fieldset id="inputs">
                              <fieldset id="networks-container">
                                <label id="networks-label" htmlFor="networks">Which mobile network?</label>
                                <fieldset id="networks-mobile">
                                </fieldset>
                              </fieldset>
                              <section id="error-container-momo-m">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                  <path d="M7.99998 14.6666C11.6666 14.6666 14.6666 11.6666 14.6666 7.99998C14.6666 4.33331 11.6666 1.33331 7.99998 1.33331C4.33331 1.33331 1.33331 4.33331 1.33331 7.99998C1.33331 11.6666 4.33331 14.6666 7.99998 14.6666Z" stroke="#EC6952" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                  <path d="M8 5.33331V8.66665" stroke="#EC6952" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                  <path d="M7.99634 10.6667H8.00233" stroke="#EC6952" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <p class="error-message">Please select a mobile network</p>
                              </section>
                              <fieldset id="main-mobile-container">
                                <fieldset id="mobile-number-container">
                                  <label htmlFor="mobile-number" id="mobile-number-text">What’s your mobile number?</label>
                                  <input type="text" id="mobile-number-m" />
                                </fieldset>
                                <section id="error-container-m">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M7.99998 14.6666C11.6666 14.6666 14.6666 11.6666 14.6666 7.99998C14.6666 4.33331 11.6666 1.33331 7.99998 1.33331C4.33331 1.33331 1.33331 4.33331 1.33331 7.99998C1.33331 11.6666 4.33331 14.6666 7.99998 14.6666Z" stroke="#EC6952" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M8 5.33331V8.66665" stroke="#EC6952" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M7.99634 10.6667H8.00233" stroke="#EC6952" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                  </svg>
                                  <p class="error-message">Mobile number not valid, ensure it's in this format: <strong>054 372 3054</strong></p>
                                </section>
                              </fieldset>
                            </fieldset>
                            <button onClick={() => this.inMobileView()} id="mobile-money-btn" type="submit" class="mobile-btn">Pay GHS <span class="amount-value"></span></button>
                          </section>
                        </section>
                      </section>
                    </section>
                    {/* <!--Everything below are the various banners for alert, success, pending, failed and info which would appear respectively based on the type of action a user takes or state of things --> */}
                    <section class="banner" id="alert-container-mobile-momo">
                      <section class="banner-main-content">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 5.16603V8.66603" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M14.0533 5.71938V10.2794C14.0533 11.026 13.6533 11.7194 13.0067 12.0994L9.04667 14.386C8.40001 14.7594 7.59999 14.7594 6.94666 14.386L2.98665 12.0994C2.33999 11.726 1.93998 11.0327 1.93998 10.2794V5.71938C1.93998 4.97271 2.33999 4.27935 2.98665 3.89935L6.94666 1.61269C7.59332 1.23935 8.39334 1.23935 9.04667 1.61269L13.0067 3.89935C13.6533 4.27935 14.0533 4.96604 14.0533 5.71938Z" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M8 10.7994V10.866" stroke="#091925" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <p class="banner-test">Alert test</p>
                      </section>
                      <section onClick={() => this.removeBanners()} id="close-alert-mobile" class="banner-close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M4.70449 3.99915L7.85221 0.856425C7.94629 0.762342 7.99915 0.634737 7.99915 0.501682C7.99915 0.368628 7.94629 0.241023 7.85221 0.146939C7.75812 0.0528557 7.63052 0 7.49747 0C7.36441 0 7.23681 0.0528557 7.14272 0.146939L4 3.29466L0.857278 0.146939C0.763194 0.0528557 0.635589 1.18132e-07 0.502535 1.19123e-07C0.369481 1.20114e-07 0.241876 0.0528557 0.147792 0.146939C0.0537084 0.241023 0.000852802 0.368628 0.000852801 0.501682C0.0008528 0.634737 0.0537084 0.762342 0.147792 0.856425L3.29551 3.99915L0.147792 7.14187C0.100962 7.18832 0.0637917 7.24358 0.0384257 7.30446C0.0130598 7.36535 0 7.43065 0 7.49661C0 7.56257 0.0130598 7.62788 0.0384257 7.68876C0.0637917 7.74965 0.100962 7.80491 0.147792 7.85135C0.19424 7.89818 0.2495 7.93536 0.310386 7.96072C0.371271 7.98609 0.436577 7.99915 0.502535 7.99915C0.568493 7.99915 0.633799 7.98609 0.694684 7.96072C0.75557 7.93536 0.81083 7.89818 0.857278 7.85135L4 4.70364L7.14272 7.85135C7.18917 7.89818 7.24443 7.93536 7.30532 7.96072C7.3662 7.98609 7.43151 7.99915 7.49747 7.99915C7.56342 7.99915 7.62873 7.98609 7.68961 7.96072C7.7505 7.93536 7.80576 7.89818 7.85221 7.85135C7.89904 7.80491 7.93621 7.74965 7.96157 7.68876C7.98694 7.62788 8 7.56257 8 7.49661C8 7.43065 7.98694 7.36535 7.96157 7.30446C7.93621 7.24358 7.89904 7.18832 7.85221 7.14187L4.70449 3.99915Z" fill="#091925" />
                        </svg>
                      </section>
                    </section>
                    <section class="banner" id="success-container-mobile-momo">
                      <section class="banner-main-content">
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                          <path d="M8.5 14.666C12.1667 14.666 15.1667 11.666 15.1667 7.99936C15.1667 4.3327 12.1667 1.3327 8.5 1.3327C4.83333 1.3327 1.83333 4.3327 1.83333 7.99936C1.83333 11.666 4.83333 14.666 8.5 14.666Z" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M5.66667 7.99936L7.55333 9.88603L11.3333 6.11269" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <p id="banner-test">Success test</p>
                      </section>
                      <section onClick={() => this.removeBanners()} id="close-success-mobile" class="banner-close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M4.70449 3.99915L7.85221 0.856425C7.94629 0.762342 7.99915 0.634737 7.99915 0.501682C7.99915 0.368628 7.94629 0.241023 7.85221 0.146939C7.75812 0.0528557 7.63052 0 7.49747 0C7.36441 0 7.23681 0.0528557 7.14272 0.146939L4 3.29466L0.857278 0.146939C0.763194 0.0528557 0.635589 1.18132e-07 0.502535 1.19123e-07C0.369481 1.20114e-07 0.241876 0.0528557 0.147792 0.146939C0.0537084 0.241023 0.000852802 0.368628 0.000852801 0.501682C0.0008528 0.634737 0.0537084 0.762342 0.147792 0.856425L3.29551 3.99915L0.147792 7.14187C0.100962 7.18832 0.0637917 7.24358 0.0384257 7.30446C0.0130598 7.36535 0 7.43065 0 7.49661C0 7.56257 0.0130598 7.62788 0.0384257 7.68876C0.0637917 7.74965 0.100962 7.80491 0.147792 7.85135C0.19424 7.89818 0.2495 7.93536 0.310386 7.96072C0.371271 7.98609 0.436577 7.99915 0.502535 7.99915C0.568493 7.99915 0.633799 7.98609 0.694684 7.96072C0.75557 7.93536 0.81083 7.89818 0.857278 7.85135L4 4.70364L7.14272 7.85135C7.18917 7.89818 7.24443 7.93536 7.30532 7.96072C7.3662 7.98609 7.43151 7.99915 7.49747 7.99915C7.56342 7.99915 7.62873 7.98609 7.68961 7.96072C7.7505 7.93536 7.80576 7.89818 7.85221 7.85135C7.89904 7.80491 7.93621 7.74965 7.96157 7.68876C7.98694 7.62788 8 7.56257 8 7.49661C8 7.43065 7.98694 7.36535 7.96157 7.30446C7.93621 7.24358 7.89904 7.18832 7.85221 7.14187L4.70449 3.99915Z" fill="#091925" />
                        </svg>
                      </section>
                    </section>
                    <section class="banner" id="pending-container-mobile-momo">
                      <section class="banner-main-content">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M10.16 1.33269H5.84C3.33333 1.33269 3.14 3.58603 4.49333 4.81269L11.5067 11.186C12.86 12.4127 12.6667 14.666 10.16 14.666H5.84C3.33333 14.666 3.14 12.4127 4.49333 11.186L11.5067 4.81269C12.86 3.58603 12.6667 1.33269 10.16 1.33269Z" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <p id="banner-test">Pending test</p>
                      </section>
                      <section onClick={() => this.removeBanners()} id="close-pending-mobile" class="banner-close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M4.70449 3.99915L7.85221 0.856425C7.94629 0.762342 7.99915 0.634737 7.99915 0.501682C7.99915 0.368628 7.94629 0.241023 7.85221 0.146939C7.75812 0.0528557 7.63052 0 7.49747 0C7.36441 0 7.23681 0.0528557 7.14272 0.146939L4 3.29466L0.857278 0.146939C0.763194 0.0528557 0.635589 1.18132e-07 0.502535 1.19123e-07C0.369481 1.20114e-07 0.241876 0.0528557 0.147792 0.146939C0.0537084 0.241023 0.000852802 0.368628 0.000852801 0.501682C0.0008528 0.634737 0.0537084 0.762342 0.147792 0.856425L3.29551 3.99915L0.147792 7.14187C0.100962 7.18832 0.0637917 7.24358 0.0384257 7.30446C0.0130598 7.36535 0 7.43065 0 7.49661C0 7.56257 0.0130598 7.62788 0.0384257 7.68876C0.0637917 7.74965 0.100962 7.80491 0.147792 7.85135C0.19424 7.89818 0.2495 7.93536 0.310386 7.96072C0.371271 7.98609 0.436577 7.99915 0.502535 7.99915C0.568493 7.99915 0.633799 7.98609 0.694684 7.96072C0.75557 7.93536 0.81083 7.89818 0.857278 7.85135L4 4.70364L7.14272 7.85135C7.18917 7.89818 7.24443 7.93536 7.30532 7.96072C7.3662 7.98609 7.43151 7.99915 7.49747 7.99915C7.56342 7.99915 7.62873 7.98609 7.68961 7.96072C7.7505 7.93536 7.80576 7.89818 7.85221 7.85135C7.89904 7.80491 7.93621 7.74965 7.96157 7.68876C7.98694 7.62788 8 7.56257 8 7.49661C8 7.43065 7.98694 7.36535 7.96157 7.30446C7.93621 7.24358 7.89904 7.18832 7.85221 7.14187L4.70449 3.99915Z" fill="#091925" />
                        </svg>
                      </section>
                    </section>
                    <section class="banner" id="failed-container-mobile-momo">
                      <section class="banner-main-content">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 5.99936V9.33269" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M8 14.2727H3.96C1.64667 14.2727 0.679999 12.6194 1.8 10.5994L3.88 6.85269L5.84 3.33269C7.02666 1.19269 8.97333 1.19269 10.16 3.33269L12.12 6.85936L14.2 10.606C15.32 12.626 14.3467 14.2794 12.04 14.2794H8V14.2727Z" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M7.99634 11.3327H8.00233" stroke="#091925" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <p id="banner-test">Payment Failed</p>
                      </section>
                      <section onClick={() => this.removeBanners()} id="close-failed-mobile" class="banner-close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M4.70449 3.99915L7.85221 0.856425C7.94629 0.762342 7.99915 0.634737 7.99915 0.501682C7.99915 0.368628 7.94629 0.241023 7.85221 0.146939C7.75812 0.0528557 7.63052 0 7.49747 0C7.36441 0 7.23681 0.0528557 7.14272 0.146939L4 3.29466L0.857278 0.146939C0.763194 0.0528557 0.635589 1.18132e-07 0.502535 1.19123e-07C0.369481 1.20114e-07 0.241876 0.0528557 0.147792 0.146939C0.0537084 0.241023 0.000852802 0.368628 0.000852801 0.501682C0.0008528 0.634737 0.0537084 0.762342 0.147792 0.856425L3.29551 3.99915L0.147792 7.14187C0.100962 7.18832 0.0637917 7.24358 0.0384257 7.30446C0.0130598 7.36535 0 7.43065 0 7.49661C0 7.56257 0.0130598 7.62788 0.0384257 7.68876C0.0637917 7.74965 0.100962 7.80491 0.147792 7.85135C0.19424 7.89818 0.2495 7.93536 0.310386 7.96072C0.371271 7.98609 0.436577 7.99915 0.502535 7.99915C0.568493 7.99915 0.633799 7.98609 0.694684 7.96072C0.75557 7.93536 0.81083 7.89818 0.857278 7.85135L4 4.70364L7.14272 7.85135C7.18917 7.89818 7.24443 7.93536 7.30532 7.96072C7.3662 7.98609 7.43151 7.99915 7.49747 7.99915C7.56342 7.99915 7.62873 7.98609 7.68961 7.96072C7.7505 7.93536 7.80576 7.89818 7.85221 7.85135C7.89904 7.80491 7.93621 7.74965 7.96157 7.68876C7.98694 7.62788 8 7.56257 8 7.49661C8 7.43065 7.98694 7.36535 7.96157 7.30446C7.93621 7.24358 7.89904 7.18832 7.85221 7.14187L4.70449 3.99915Z" fill="#091925" />
                        </svg>
                      </section>
                    </section>
                    <section class="banner" id="info-container-mobile-momo">
                      <section class="banner-main-content">
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                          <path d="M8.5 14.666C12.1667 14.666 15.1667 11.666 15.1667 7.99935C15.1667 4.33269 12.1667 1.33269 8.5 1.33269C4.83333 1.33269 1.83333 4.33269 1.83333 7.99935C1.83333 11.666 4.83333 14.666 8.5 14.666Z" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M8.5 5.33269V8.66602" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M8.49634 10.666H8.50233" stroke="#091925" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <p id="banner-test">Info test</p>
                      </section>
                      <section onClick={() => this.removeBanners()} id="close-info-mobile" class="banner-close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M4.70449 3.99915L7.85221 0.856425C7.94629 0.762342 7.99915 0.634737 7.99915 0.501682C7.99915 0.368628 7.94629 0.241023 7.85221 0.146939C7.75812 0.0528557 7.63052 0 7.49747 0C7.36441 0 7.23681 0.0528557 7.14272 0.146939L4 3.29466L0.857278 0.146939C0.763194 0.0528557 0.635589 1.18132e-07 0.502535 1.19123e-07C0.369481 1.20114e-07 0.241876 0.0528557 0.147792 0.146939C0.0537084 0.241023 0.000852802 0.368628 0.000852801 0.501682C0.0008528 0.634737 0.0537084 0.762342 0.147792 0.856425L3.29551 3.99915L0.147792 7.14187C0.100962 7.18832 0.0637917 7.24358 0.0384257 7.30446C0.0130598 7.36535 0 7.43065 0 7.49661C0 7.56257 0.0130598 7.62788 0.0384257 7.68876C0.0637917 7.74965 0.100962 7.80491 0.147792 7.85135C0.19424 7.89818 0.2495 7.93536 0.310386 7.96072C0.371271 7.98609 0.436577 7.99915 0.502535 7.99915C0.568493 7.99915 0.633799 7.98609 0.694684 7.96072C0.75557 7.93536 0.81083 7.89818 0.857278 7.85135L4 4.70364L7.14272 7.85135C7.18917 7.89818 7.24443 7.93536 7.30532 7.96072C7.3662 7.98609 7.43151 7.99915 7.49747 7.99915C7.56342 7.99915 7.62873 7.98609 7.68961 7.96072C7.7505 7.93536 7.80576 7.89818 7.85221 7.85135C7.89904 7.80491 7.93621 7.74965 7.96157 7.68876C7.98694 7.62788 8 7.56257 8 7.49661C8 7.43065 7.98694 7.36535 7.96157 7.30446C7.93621 7.24358 7.89904 7.18832 7.85221 7.14187L4.70449 3.99915Z" fill="#091925" />
                        </svg>
                      </section>
                    </section>
                  </section>
                  {/* <!--This is the page that comes up for the mobile view when the user clicks on 'Cash payment' on the initial page, it shows the content when the user clicks on cash payment method--> */}
                  <section class="mobile-page-setter" ref={el => (this.cashPaymentPageMobile = el as HTMLElement)} id="mobile-cash-payment-page">
                    <section class="top-bar">
                      <section onClick={() => this.backToInitialPage()} class="back-btn-container">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                          <path d="M9.57 5.93494L3.5 12.0049L9.57 18.0749" stroke="#091925" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M20.5 12.0049H3.67004" stroke="#091925" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <p class="back-text">Back</p>
                      </section>
                      <figure class="close-icon">
                        <img onClick={() => this.closeModal()} src="../../assets/svg/close-icon.svg" alt="close icon button" loading="eager" />
                      </figure>
                    </section>
                    {/* <!--This is where the main content is when the user clicks on the cash payment method on the initial screen--> */}
                    <section class="main-content">
                      <section class="recipient-logo-and-texts">
                        <figure id="recipient-logo">
                          <img src="../../assets/svg/recipient-account-logo.svg" alt="recipient logo" loading="eager" />
                        </figure>
                        <section class="sender-texts">
                          <p class="sender-text">Pay <strong id="amount">GHS <span class="amount-value"></span></strong></p>
                          <p class="sender-email">{this.email}</p>
                        </section>
                      </section>
                      <section class="payment-content-container">
                        <section class="content-details">
                          <section class="content-top-texts">
                            <h2 class="content-title">Cash payment</h2>
                            <p class="content-text">Click button below to make your payment with cash</p>
                          </section>
                          <button id="card-btn" onClick={() => this.inMobileView()} class="mobile-btn">Pay GHS <span class="amount-value"></span></button>
                        </section>
                      </section>
                    </section>
                    {/* <!--Everything below are the various banners for alert, success, pending, failed and info which would appear respectively based on the type of action a user takes or state of things --> */}
                    <section class="banner" id="alert-container-mobile-cash">
                      <section class="banner-main-content">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 5.16603V8.66603" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M14.0533 5.71938V10.2794C14.0533 11.026 13.6533 11.7194 13.0067 12.0994L9.04667 14.386C8.40001 14.7594 7.59999 14.7594 6.94666 14.386L2.98665 12.0994C2.33999 11.726 1.93998 11.0327 1.93998 10.2794V5.71938C1.93998 4.97271 2.33999 4.27935 2.98665 3.89935L6.94666 1.61269C7.59332 1.23935 8.39334 1.23935 9.04667 1.61269L13.0067 3.89935C13.6533 4.27935 14.0533 4.96604 14.0533 5.71938Z" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M8 10.7994V10.866" stroke="#091925" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <p class="banner-test">Alert test</p>
                      </section>
                      <section onClick={() => this.removeBanners()} id="close-alert-mobile" class="banner-close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M4.70449 3.99915L7.85221 0.856425C7.94629 0.762342 7.99915 0.634737 7.99915 0.501682C7.99915 0.368628 7.94629 0.241023 7.85221 0.146939C7.75812 0.0528557 7.63052 0 7.49747 0C7.36441 0 7.23681 0.0528557 7.14272 0.146939L4 3.29466L0.857278 0.146939C0.763194 0.0528557 0.635589 1.18132e-07 0.502535 1.19123e-07C0.369481 1.20114e-07 0.241876 0.0528557 0.147792 0.146939C0.0537084 0.241023 0.000852802 0.368628 0.000852801 0.501682C0.0008528 0.634737 0.0537084 0.762342 0.147792 0.856425L3.29551 3.99915L0.147792 7.14187C0.100962 7.18832 0.0637917 7.24358 0.0384257 7.30446C0.0130598 7.36535 0 7.43065 0 7.49661C0 7.56257 0.0130598 7.62788 0.0384257 7.68876C0.0637917 7.74965 0.100962 7.80491 0.147792 7.85135C0.19424 7.89818 0.2495 7.93536 0.310386 7.96072C0.371271 7.98609 0.436577 7.99915 0.502535 7.99915C0.568493 7.99915 0.633799 7.98609 0.694684 7.96072C0.75557 7.93536 0.81083 7.89818 0.857278 7.85135L4 4.70364L7.14272 7.85135C7.18917 7.89818 7.24443 7.93536 7.30532 7.96072C7.3662 7.98609 7.43151 7.99915 7.49747 7.99915C7.56342 7.99915 7.62873 7.98609 7.68961 7.96072C7.7505 7.93536 7.80576 7.89818 7.85221 7.85135C7.89904 7.80491 7.93621 7.74965 7.96157 7.68876C7.98694 7.62788 8 7.56257 8 7.49661C8 7.43065 7.98694 7.36535 7.96157 7.30446C7.93621 7.24358 7.89904 7.18832 7.85221 7.14187L4.70449 3.99915Z" fill="#091925" />
                        </svg>
                      </section>
                    </section>
                    <section class="banner" id="success-container-mobile-cash">
                      <section class="banner-main-content">
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                          <path d="M8.5 14.666C12.1667 14.666 15.1667 11.666 15.1667 7.99936C15.1667 4.3327 12.1667 1.3327 8.5 1.3327C4.83333 1.3327 1.83333 4.3327 1.83333 7.99936C1.83333 11.666 4.83333 14.666 8.5 14.666Z" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M5.66667 7.99936L7.55333 9.88603L11.3333 6.11269" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <p id="banner-test">Success test</p>
                      </section>
                      <section onClick={() => this.removeBanners()} id="close-success-mobile" class="banner-close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M4.70449 3.99915L7.85221 0.856425C7.94629 0.762342 7.99915 0.634737 7.99915 0.501682C7.99915 0.368628 7.94629 0.241023 7.85221 0.146939C7.75812 0.0528557 7.63052 0 7.49747 0C7.36441 0 7.23681 0.0528557 7.14272 0.146939L4 3.29466L0.857278 0.146939C0.763194 0.0528557 0.635589 1.18132e-07 0.502535 1.19123e-07C0.369481 1.20114e-07 0.241876 0.0528557 0.147792 0.146939C0.0537084 0.241023 0.000852802 0.368628 0.000852801 0.501682C0.0008528 0.634737 0.0537084 0.762342 0.147792 0.856425L3.29551 3.99915L0.147792 7.14187C0.100962 7.18832 0.0637917 7.24358 0.0384257 7.30446C0.0130598 7.36535 0 7.43065 0 7.49661C0 7.56257 0.0130598 7.62788 0.0384257 7.68876C0.0637917 7.74965 0.100962 7.80491 0.147792 7.85135C0.19424 7.89818 0.2495 7.93536 0.310386 7.96072C0.371271 7.98609 0.436577 7.99915 0.502535 7.99915C0.568493 7.99915 0.633799 7.98609 0.694684 7.96072C0.75557 7.93536 0.81083 7.89818 0.857278 7.85135L4 4.70364L7.14272 7.85135C7.18917 7.89818 7.24443 7.93536 7.30532 7.96072C7.3662 7.98609 7.43151 7.99915 7.49747 7.99915C7.56342 7.99915 7.62873 7.98609 7.68961 7.96072C7.7505 7.93536 7.80576 7.89818 7.85221 7.85135C7.89904 7.80491 7.93621 7.74965 7.96157 7.68876C7.98694 7.62788 8 7.56257 8 7.49661C8 7.43065 7.98694 7.36535 7.96157 7.30446C7.93621 7.24358 7.89904 7.18832 7.85221 7.14187L4.70449 3.99915Z" fill="#091925" />
                        </svg>
                      </section>
                    </section>
                    <section class="banner" id="pending-container-mobile-cash">
                      <section class="banner-main-content">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M10.16 1.33269H5.84C3.33333 1.33269 3.14 3.58603 4.49333 4.81269L11.5067 11.186C12.86 12.4127 12.6667 14.666 10.16 14.666H5.84C3.33333 14.666 3.14 12.4127 4.49333 11.186L11.5067 4.81269C12.86 3.58603 12.6667 1.33269 10.16 1.33269Z" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <p id="banner-test">Pending test</p>
                      </section>
                      <section onClick={() => this.removeBanners()} id="close-pending-mobile" class="banner-close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M4.70449 3.99915L7.85221 0.856425C7.94629 0.762342 7.99915 0.634737 7.99915 0.501682C7.99915 0.368628 7.94629 0.241023 7.85221 0.146939C7.75812 0.0528557 7.63052 0 7.49747 0C7.36441 0 7.23681 0.0528557 7.14272 0.146939L4 3.29466L0.857278 0.146939C0.763194 0.0528557 0.635589 1.18132e-07 0.502535 1.19123e-07C0.369481 1.20114e-07 0.241876 0.0528557 0.147792 0.146939C0.0537084 0.241023 0.000852802 0.368628 0.000852801 0.501682C0.0008528 0.634737 0.0537084 0.762342 0.147792 0.856425L3.29551 3.99915L0.147792 7.14187C0.100962 7.18832 0.0637917 7.24358 0.0384257 7.30446C0.0130598 7.36535 0 7.43065 0 7.49661C0 7.56257 0.0130598 7.62788 0.0384257 7.68876C0.0637917 7.74965 0.100962 7.80491 0.147792 7.85135C0.19424 7.89818 0.2495 7.93536 0.310386 7.96072C0.371271 7.98609 0.436577 7.99915 0.502535 7.99915C0.568493 7.99915 0.633799 7.98609 0.694684 7.96072C0.75557 7.93536 0.81083 7.89818 0.857278 7.85135L4 4.70364L7.14272 7.85135C7.18917 7.89818 7.24443 7.93536 7.30532 7.96072C7.3662 7.98609 7.43151 7.99915 7.49747 7.99915C7.56342 7.99915 7.62873 7.98609 7.68961 7.96072C7.7505 7.93536 7.80576 7.89818 7.85221 7.85135C7.89904 7.80491 7.93621 7.74965 7.96157 7.68876C7.98694 7.62788 8 7.56257 8 7.49661C8 7.43065 7.98694 7.36535 7.96157 7.30446C7.93621 7.24358 7.89904 7.18832 7.85221 7.14187L4.70449 3.99915Z" fill="#091925" />
                        </svg>
                      </section>
                    </section>
                    <section class="banner" id="failed-container-mobile-cash">
                      <section class="banner-main-content">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 5.99936V9.33269" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M8 14.2727H3.96C1.64667 14.2727 0.679999 12.6194 1.8 10.5994L3.88 6.85269L5.84 3.33269C7.02666 1.19269 8.97333 1.19269 10.16 3.33269L12.12 6.85936L14.2 10.606C15.32 12.626 14.3467 14.2794 12.04 14.2794H8V14.2727Z" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M7.99634 11.3327H8.00233" stroke="#091925" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <p id="banner-test">Payment Failed</p>
                      </section>
                      <section onClick={() => this.removeBanners()} id="close-failed-mobile" class="banner-close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M4.70449 3.99915L7.85221 0.856425C7.94629 0.762342 7.99915 0.634737 7.99915 0.501682C7.99915 0.368628 7.94629 0.241023 7.85221 0.146939C7.75812 0.0528557 7.63052 0 7.49747 0C7.36441 0 7.23681 0.0528557 7.14272 0.146939L4 3.29466L0.857278 0.146939C0.763194 0.0528557 0.635589 1.18132e-07 0.502535 1.19123e-07C0.369481 1.20114e-07 0.241876 0.0528557 0.147792 0.146939C0.0537084 0.241023 0.000852802 0.368628 0.000852801 0.501682C0.0008528 0.634737 0.0537084 0.762342 0.147792 0.856425L3.29551 3.99915L0.147792 7.14187C0.100962 7.18832 0.0637917 7.24358 0.0384257 7.30446C0.0130598 7.36535 0 7.43065 0 7.49661C0 7.56257 0.0130598 7.62788 0.0384257 7.68876C0.0637917 7.74965 0.100962 7.80491 0.147792 7.85135C0.19424 7.89818 0.2495 7.93536 0.310386 7.96072C0.371271 7.98609 0.436577 7.99915 0.502535 7.99915C0.568493 7.99915 0.633799 7.98609 0.694684 7.96072C0.75557 7.93536 0.81083 7.89818 0.857278 7.85135L4 4.70364L7.14272 7.85135C7.18917 7.89818 7.24443 7.93536 7.30532 7.96072C7.3662 7.98609 7.43151 7.99915 7.49747 7.99915C7.56342 7.99915 7.62873 7.98609 7.68961 7.96072C7.7505 7.93536 7.80576 7.89818 7.85221 7.85135C7.89904 7.80491 7.93621 7.74965 7.96157 7.68876C7.98694 7.62788 8 7.56257 8 7.49661C8 7.43065 7.98694 7.36535 7.96157 7.30446C7.93621 7.24358 7.89904 7.18832 7.85221 7.14187L4.70449 3.99915Z" fill="#091925" />
                        </svg>
                      </section>
                    </section>
                    <section class="banner" id="info-container-mobile-cash">
                      <section class="banner-main-content">
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                          <path d="M8.5 14.666C12.1667 14.666 15.1667 11.666 15.1667 7.99935C15.1667 4.33269 12.1667 1.33269 8.5 1.33269C4.83333 1.33269 1.83333 4.33269 1.83333 7.99935C1.83333 11.666 4.83333 14.666 8.5 14.666Z" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M8.5 5.33269V8.66602" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M8.49634 10.666H8.50233" stroke="#091925" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <p id="banner-test">Info test</p>
                      </section>
                      <section onClick={() => this.removeBanners()} id="close-info-mobile" class="banner-close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M4.70449 3.99915L7.85221 0.856425C7.94629 0.762342 7.99915 0.634737 7.99915 0.501682C7.99915 0.368628 7.94629 0.241023 7.85221 0.146939C7.75812 0.0528557 7.63052 0 7.49747 0C7.36441 0 7.23681 0.0528557 7.14272 0.146939L4 3.29466L0.857278 0.146939C0.763194 0.0528557 0.635589 1.18132e-07 0.502535 1.19123e-07C0.369481 1.20114e-07 0.241876 0.0528557 0.147792 0.146939C0.0537084 0.241023 0.000852802 0.368628 0.000852801 0.501682C0.0008528 0.634737 0.0537084 0.762342 0.147792 0.856425L3.29551 3.99915L0.147792 7.14187C0.100962 7.18832 0.0637917 7.24358 0.0384257 7.30446C0.0130598 7.36535 0 7.43065 0 7.49661C0 7.56257 0.0130598 7.62788 0.0384257 7.68876C0.0637917 7.74965 0.100962 7.80491 0.147792 7.85135C0.19424 7.89818 0.2495 7.93536 0.310386 7.96072C0.371271 7.98609 0.436577 7.99915 0.502535 7.99915C0.568493 7.99915 0.633799 7.98609 0.694684 7.96072C0.75557 7.93536 0.81083 7.89818 0.857278 7.85135L4 4.70364L7.14272 7.85135C7.18917 7.89818 7.24443 7.93536 7.30532 7.96072C7.3662 7.98609 7.43151 7.99915 7.49747 7.99915C7.56342 7.99915 7.62873 7.98609 7.68961 7.96072C7.7505 7.93536 7.80576 7.89818 7.85221 7.85135C7.89904 7.80491 7.93621 7.74965 7.96157 7.68876C7.98694 7.62788 8 7.56257 8 7.49661C8 7.43065 7.98694 7.36535 7.96157 7.30446C7.93621 7.24358 7.89904 7.18832 7.85221 7.14187L4.70449 3.99915Z" fill="#091925" />
                        </svg>
                      </section>
                    </section>
                  </section>
                  {/* <!--This is the page that comes up for the mobile view when the user clicks on 'Test' on the initial page, it shows the content when the user clicks on test--> */}
                  <section class="mobile-page-setter" ref={el => (this.testPageMobile = el as HTMLElement)} id="mobile-test-page">
                    <section class="top-bar">
                      <section onClick={() => this.backToInitialPage()} class="back-btn-container">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                          <path d="M9.57 5.93494L3.5 12.0049L9.57 18.0749" stroke="#091925" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M20.5 12.0049H3.67004" stroke="#091925" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <p class="back-text">Back</p>
                      </section>
                      <figure class="close-icon">
                        <img onClick={() => this.closeModal()} src="../../assets/svg/close-icon.svg" alt="close icon button" loading="eager" />
                      </figure>
                    </section>
                    {/* <!--This is where the main content is when the user clicks on the test on the initial screen--> */}
                    <section class="main-content">
                      <section class="recipient-logo-and-texts">
                        <figure id="recipient-logo">
                          <img src="../../assets/svg/recipient-account-logo.svg" alt="recipient logo" loading="eager" />
                        </figure>
                        <section class="sender-texts">
                          <p class="sender-text">Pay <strong id="amount">GHS <span class="amount-value"></span></strong></p>
                          <p class="sender-email">{this.email}</p>
                        </section>
                      </section>
                      <section class="payment-content-container">
                        <section class="content-details">
                          <section class="content-top-texts">
                            <h2 class="content-title">Test</h2>
                            <p class="content-text">Click button below to test out the payment system</p>
                          </section>
                          <button id="card-btn" onClick={() => this.inMobileView()} class="mobile-btn">Pay GHS <span class="amount-value"></span></button>
                        </section>
                      </section>
                    </section>
                    {/* <!--Everything below are the various banners for alert, success, pending, failed and info which would appear respectively based on the type of action a user takes or state of things --> */}
                    <section class="banner" id="alert-container-mobile-test">
                      <section class="banner-main-content">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 5.16603V8.66603" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M14.0533 5.71938V10.2794C14.0533 11.026 13.6533 11.7194 13.0067 12.0994L9.04667 14.386C8.40001 14.7594 7.59999 14.7594 6.94666 14.386L2.98665 12.0994C2.33999 11.726 1.93998 11.0327 1.93998 10.2794V5.71938C1.93998 4.97271 2.33999 4.27935 2.98665 3.89935L6.94666 1.61269C7.59332 1.23935 8.39334 1.23935 9.04667 1.61269L13.0067 3.89935C13.6533 4.27935 14.0533 4.96604 14.0533 5.71938Z" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M8 10.7994V10.866" stroke="#091925" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <p class="banner-test">Alert test</p>
                      </section>
                      <section onClick={() => this.removeBanners()} id="close-alert-mobile" class="banner-close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M4.70449 3.99915L7.85221 0.856425C7.94629 0.762342 7.99915 0.634737 7.99915 0.501682C7.99915 0.368628 7.94629 0.241023 7.85221 0.146939C7.75812 0.0528557 7.63052 0 7.49747 0C7.36441 0 7.23681 0.0528557 7.14272 0.146939L4 3.29466L0.857278 0.146939C0.763194 0.0528557 0.635589 1.18132e-07 0.502535 1.19123e-07C0.369481 1.20114e-07 0.241876 0.0528557 0.147792 0.146939C0.0537084 0.241023 0.000852802 0.368628 0.000852801 0.501682C0.0008528 0.634737 0.0537084 0.762342 0.147792 0.856425L3.29551 3.99915L0.147792 7.14187C0.100962 7.18832 0.0637917 7.24358 0.0384257 7.30446C0.0130598 7.36535 0 7.43065 0 7.49661C0 7.56257 0.0130598 7.62788 0.0384257 7.68876C0.0637917 7.74965 0.100962 7.80491 0.147792 7.85135C0.19424 7.89818 0.2495 7.93536 0.310386 7.96072C0.371271 7.98609 0.436577 7.99915 0.502535 7.99915C0.568493 7.99915 0.633799 7.98609 0.694684 7.96072C0.75557 7.93536 0.81083 7.89818 0.857278 7.85135L4 4.70364L7.14272 7.85135C7.18917 7.89818 7.24443 7.93536 7.30532 7.96072C7.3662 7.98609 7.43151 7.99915 7.49747 7.99915C7.56342 7.99915 7.62873 7.98609 7.68961 7.96072C7.7505 7.93536 7.80576 7.89818 7.85221 7.85135C7.89904 7.80491 7.93621 7.74965 7.96157 7.68876C7.98694 7.62788 8 7.56257 8 7.49661C8 7.43065 7.98694 7.36535 7.96157 7.30446C7.93621 7.24358 7.89904 7.18832 7.85221 7.14187L4.70449 3.99915Z" fill="#091925" />
                        </svg>
                      </section>
                    </section>
                    <section class="banner" id="success-container-mobile-test">
                      <section class="banner-main-content">
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                          <path d="M8.5 14.666C12.1667 14.666 15.1667 11.666 15.1667 7.99936C15.1667 4.3327 12.1667 1.3327 8.5 1.3327C4.83333 1.3327 1.83333 4.3327 1.83333 7.99936C1.83333 11.666 4.83333 14.666 8.5 14.666Z" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M5.66667 7.99936L7.55333 9.88603L11.3333 6.11269" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <p id="banner-test">Success test</p>
                      </section>
                      <section onClick={() => this.removeBanners()} id="close-success-mobile" class="banner-close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M4.70449 3.99915L7.85221 0.856425C7.94629 0.762342 7.99915 0.634737 7.99915 0.501682C7.99915 0.368628 7.94629 0.241023 7.85221 0.146939C7.75812 0.0528557 7.63052 0 7.49747 0C7.36441 0 7.23681 0.0528557 7.14272 0.146939L4 3.29466L0.857278 0.146939C0.763194 0.0528557 0.635589 1.18132e-07 0.502535 1.19123e-07C0.369481 1.20114e-07 0.241876 0.0528557 0.147792 0.146939C0.0537084 0.241023 0.000852802 0.368628 0.000852801 0.501682C0.0008528 0.634737 0.0537084 0.762342 0.147792 0.856425L3.29551 3.99915L0.147792 7.14187C0.100962 7.18832 0.0637917 7.24358 0.0384257 7.30446C0.0130598 7.36535 0 7.43065 0 7.49661C0 7.56257 0.0130598 7.62788 0.0384257 7.68876C0.0637917 7.74965 0.100962 7.80491 0.147792 7.85135C0.19424 7.89818 0.2495 7.93536 0.310386 7.96072C0.371271 7.98609 0.436577 7.99915 0.502535 7.99915C0.568493 7.99915 0.633799 7.98609 0.694684 7.96072C0.75557 7.93536 0.81083 7.89818 0.857278 7.85135L4 4.70364L7.14272 7.85135C7.18917 7.89818 7.24443 7.93536 7.30532 7.96072C7.3662 7.98609 7.43151 7.99915 7.49747 7.99915C7.56342 7.99915 7.62873 7.98609 7.68961 7.96072C7.7505 7.93536 7.80576 7.89818 7.85221 7.85135C7.89904 7.80491 7.93621 7.74965 7.96157 7.68876C7.98694 7.62788 8 7.56257 8 7.49661C8 7.43065 7.98694 7.36535 7.96157 7.30446C7.93621 7.24358 7.89904 7.18832 7.85221 7.14187L4.70449 3.99915Z" fill="#091925" />
                        </svg>
                      </section>
                    </section>
                    <section class="banner" id="pending-container-mobile-test">
                      <section class="banner-main-content">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M10.16 1.33269H5.84C3.33333 1.33269 3.14 3.58603 4.49333 4.81269L11.5067 11.186C12.86 12.4127 12.6667 14.666 10.16 14.666H5.84C3.33333 14.666 3.14 12.4127 4.49333 11.186L11.5067 4.81269C12.86 3.58603 12.6667 1.33269 10.16 1.33269Z" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <p id="banner-test">Payment Pending</p>
                      </section>
                      <section onClick={() => this.removeBanners()} id="close-pending-mobile" class="banner-close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M4.70449 3.99915L7.85221 0.856425C7.94629 0.762342 7.99915 0.634737 7.99915 0.501682C7.99915 0.368628 7.94629 0.241023 7.85221 0.146939C7.75812 0.0528557 7.63052 0 7.49747 0C7.36441 0 7.23681 0.0528557 7.14272 0.146939L4 3.29466L0.857278 0.146939C0.763194 0.0528557 0.635589 1.18132e-07 0.502535 1.19123e-07C0.369481 1.20114e-07 0.241876 0.0528557 0.147792 0.146939C0.0537084 0.241023 0.000852802 0.368628 0.000852801 0.501682C0.0008528 0.634737 0.0537084 0.762342 0.147792 0.856425L3.29551 3.99915L0.147792 7.14187C0.100962 7.18832 0.0637917 7.24358 0.0384257 7.30446C0.0130598 7.36535 0 7.43065 0 7.49661C0 7.56257 0.0130598 7.62788 0.0384257 7.68876C0.0637917 7.74965 0.100962 7.80491 0.147792 7.85135C0.19424 7.89818 0.2495 7.93536 0.310386 7.96072C0.371271 7.98609 0.436577 7.99915 0.502535 7.99915C0.568493 7.99915 0.633799 7.98609 0.694684 7.96072C0.75557 7.93536 0.81083 7.89818 0.857278 7.85135L4 4.70364L7.14272 7.85135C7.18917 7.89818 7.24443 7.93536 7.30532 7.96072C7.3662 7.98609 7.43151 7.99915 7.49747 7.99915C7.56342 7.99915 7.62873 7.98609 7.68961 7.96072C7.7505 7.93536 7.80576 7.89818 7.85221 7.85135C7.89904 7.80491 7.93621 7.74965 7.96157 7.68876C7.98694 7.62788 8 7.56257 8 7.49661C8 7.43065 7.98694 7.36535 7.96157 7.30446C7.93621 7.24358 7.89904 7.18832 7.85221 7.14187L4.70449 3.99915Z" fill="#091925" />
                        </svg>
                      </section>
                    </section>
                    <section class="banner" id="failed-container-mobile-test">
                      <section class="banner-main-content">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 5.99936V9.33269" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M8 14.2727H3.96C1.64667 14.2727 0.679999 12.6194 1.8 10.5994L3.88 6.85269L5.84 3.33269C7.02666 1.19269 8.97333 1.19269 10.16 3.33269L12.12 6.85936L14.2 10.606C15.32 12.626 14.3467 14.2794 12.04 14.2794H8V14.2727Z" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M7.99634 11.3327H8.00233" stroke="#091925" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <p id="banner-test">Payment Failed</p>
                      </section>
                      <section onClick={() => this.removeBanners()} id="close-failed-mobile" class="banner-close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M4.70449 3.99915L7.85221 0.856425C7.94629 0.762342 7.99915 0.634737 7.99915 0.501682C7.99915 0.368628 7.94629 0.241023 7.85221 0.146939C7.75812 0.0528557 7.63052 0 7.49747 0C7.36441 0 7.23681 0.0528557 7.14272 0.146939L4 3.29466L0.857278 0.146939C0.763194 0.0528557 0.635589 1.18132e-07 0.502535 1.19123e-07C0.369481 1.20114e-07 0.241876 0.0528557 0.147792 0.146939C0.0537084 0.241023 0.000852802 0.368628 0.000852801 0.501682C0.0008528 0.634737 0.0537084 0.762342 0.147792 0.856425L3.29551 3.99915L0.147792 7.14187C0.100962 7.18832 0.0637917 7.24358 0.0384257 7.30446C0.0130598 7.36535 0 7.43065 0 7.49661C0 7.56257 0.0130598 7.62788 0.0384257 7.68876C0.0637917 7.74965 0.100962 7.80491 0.147792 7.85135C0.19424 7.89818 0.2495 7.93536 0.310386 7.96072C0.371271 7.98609 0.436577 7.99915 0.502535 7.99915C0.568493 7.99915 0.633799 7.98609 0.694684 7.96072C0.75557 7.93536 0.81083 7.89818 0.857278 7.85135L4 4.70364L7.14272 7.85135C7.18917 7.89818 7.24443 7.93536 7.30532 7.96072C7.3662 7.98609 7.43151 7.99915 7.49747 7.99915C7.56342 7.99915 7.62873 7.98609 7.68961 7.96072C7.7505 7.93536 7.80576 7.89818 7.85221 7.85135C7.89904 7.80491 7.93621 7.74965 7.96157 7.68876C7.98694 7.62788 8 7.56257 8 7.49661C8 7.43065 7.98694 7.36535 7.96157 7.30446C7.93621 7.24358 7.89904 7.18832 7.85221 7.14187L4.70449 3.99915Z" fill="#091925" />
                        </svg>
                      </section>
                    </section>
                    <section class="banner" id="info-container-mobile-test">
                      <section class="banner-main-content">
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                          <path d="M8.5 14.666C12.1667 14.666 15.1667 11.666 15.1667 7.99935C15.1667 4.33269 12.1667 1.33269 8.5 1.33269C4.83333 1.33269 1.83333 4.33269 1.83333 7.99935C1.83333 11.666 4.83333 14.666 8.5 14.666Z" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M8.5 5.33269V8.66602" stroke="#091925" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M8.49634 10.666H8.50233" stroke="#091925" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <p id="banner-test">Info test</p>
                      </section>
                      <section onClick={() => this.removeBanners()} id="close-info-mobile" class="banner-close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M4.70449 3.99915L7.85221 0.856425C7.94629 0.762342 7.99915 0.634737 7.99915 0.501682C7.99915 0.368628 7.94629 0.241023 7.85221 0.146939C7.75812 0.0528557 7.63052 0 7.49747 0C7.36441 0 7.23681 0.0528557 7.14272 0.146939L4 3.29466L0.857278 0.146939C0.763194 0.0528557 0.635589 1.18132e-07 0.502535 1.19123e-07C0.369481 1.20114e-07 0.241876 0.0528557 0.147792 0.146939C0.0537084 0.241023 0.000852802 0.368628 0.000852801 0.501682C0.0008528 0.634737 0.0537084 0.762342 0.147792 0.856425L3.29551 3.99915L0.147792 7.14187C0.100962 7.18832 0.0637917 7.24358 0.0384257 7.30446C0.0130598 7.36535 0 7.43065 0 7.49661C0 7.56257 0.0130598 7.62788 0.0384257 7.68876C0.0637917 7.74965 0.100962 7.80491 0.147792 7.85135C0.19424 7.89818 0.2495 7.93536 0.310386 7.96072C0.371271 7.98609 0.436577 7.99915 0.502535 7.99915C0.568493 7.99915 0.633799 7.98609 0.694684 7.96072C0.75557 7.93536 0.81083 7.89818 0.857278 7.85135L4 4.70364L7.14272 7.85135C7.18917 7.89818 7.24443 7.93536 7.30532 7.96072C7.3662 7.98609 7.43151 7.99915 7.49747 7.99915C7.56342 7.99915 7.62873 7.98609 7.68961 7.96072C7.7505 7.93536 7.80576 7.89818 7.85221 7.85135C7.89904 7.80491 7.93621 7.74965 7.96157 7.68876C7.98694 7.62788 8 7.56257 8 7.49661C8 7.43065 7.98694 7.36535 7.96157 7.30446C7.93621 7.24358 7.89904 7.18832 7.85221 7.14187L4.70449 3.99915Z" fill="#091925" />
                        </svg>
                      </section>
                    </section>
                  </section>
                </section>
                {/* End of Mobile View */}
              </div>
            </form>

            {/* <!--This is the page that comes up when the user has successfully completed their transaction for whichever payment method they used--> */}
            <section id="success-page-mobile" class="hidden">
              <svg id="success-illustration" xmlns="http://www.w3.org/2000/svg" width="190" height="197" viewBox="0 0 190 197" fill="none">
                <g clip-path="url(#clip0_202_52)">
                  <path d="M189.014 0H0.98584V196.057H189.014V0Z" fill="white" />
                  <path d="M188.736 134.563C188.251 129.268 187.055 124.064 185.18 119.089C184.226 116.541 183.09 114.066 181.781 111.681C180.423 109.25 178.882 106.925 177.172 104.726C175.425 102.49 173.498 100.401 171.41 98.4793C169.386 96.6475 167.241 94.9536 164.99 93.4092C162.85 91.9606 160.694 90.6684 158.571 89.4996C156.447 88.3308 154.365 87.3185 152.315 86.3719C148.2 84.4871 144.34 82.9233 140.735 81.4335C136.619 79.7216 132.759 78.1413 129.607 76.4046C126.935 75.0616 124.484 73.3185 122.339 71.2357C121.533 70.4212 120.828 69.5119 120.24 68.5278C119.618 67.4619 119.102 66.3371 118.701 65.1697C118.166 63.5798 117.732 61.9579 117.401 60.3136C117.006 58.4534 116.652 56.3711 116.257 54.0665C115.862 51.7619 115.434 49.3092 114.882 46.6589C114.276 43.781 113.498 40.9418 112.553 38.1566C110.451 32.14 107.311 26.5381 103.277 21.6047C95.4219 11.9728 84.7315 5.06095 72.7245 1.85103C66.6241 0.212768 60.284 -0.344361 53.9914 0.204891C47.7518 0.791086 41.6598 2.44774 35.9827 5.10216C24.8861 10.2862 15.6987 18.8257 9.71859 29.5144C6.68048 34.9431 4.61894 40.863 3.62786 47.0046C2.67889 53.0948 2.77915 59.3025 3.9242 65.359C3.9242 65.4907 3.9818 65.6142 4.00649 65.7458C3.74311 66.2726 3.48793 66.8076 3.26571 67.392C2.63506 68.9306 2.13398 70.5191 1.76771 72.1411C1.57018 73.1946 1.38089 74.2564 1.22451 75.3264L1.09284 76.9231L0.98584 78.4376C0.98584 79.4417 0.985838 80.4458 1.03522 81.45C1.08461 82.4541 1.21628 83.4171 1.33151 84.4048C1.88236 88.1357 2.99224 91.7622 4.62379 95.1623C5.75264 97.5176 7.11477 99.7538 8.68975 101.837C10.3908 104.122 12.3214 106.226 14.4512 108.117C14.9862 108.628 15.5541 109.105 16.1467 109.574C16.7394 110.043 17.3073 110.529 17.941 110.965C18.5748 111.401 19.2003 111.871 19.8258 112.282L21.6613 113.443C24.0948 114.895 26.6216 116.184 29.2253 117.303C33.85 119.236 38.5954 120.866 43.4315 122.184C47.695 123.385 51.4152 124.389 54.2466 125.295C57.5226 126.296 60.738 127.486 63.8765 128.859C66.4648 129.971 68.8771 131.454 71.0372 133.262C71.9294 134.064 72.7374 134.955 73.4488 135.921C74.2404 137.05 74.9291 138.248 75.5065 139.501C76.1684 140.989 76.7509 142.511 77.2514 144.061C77.7864 145.707 78.272 147.452 78.7493 149.296L79.5724 152.275C79.8687 153.32 80.1321 154.333 80.4696 155.427C81.0869 157.567 81.8523 159.847 82.7659 162.168L83.4985 163.921C83.7618 164.522 84.0664 165.14 84.3215 165.74C84.8812 166.967 85.5726 168.119 86.2311 169.288C87.6006 171.582 89.1529 173.762 90.8731 175.807C92.5658 177.823 94.4034 179.712 96.3712 181.461C98.321 183.171 100.386 184.744 102.552 186.169C106.822 188.988 111.443 191.235 116.298 192.852C121.135 194.491 126.16 195.512 131.253 195.889C136.456 196.287 141.69 195.975 146.809 194.959C152.126 193.899 157.248 192.025 161.995 189.404C166.841 186.678 171.206 183.174 174.917 179.033C178.517 174.952 181.485 170.355 183.723 165.395C185.9 160.555 187.417 155.444 188.234 150.201C189.064 145.031 189.233 139.776 188.736 134.563ZM70.0824 60.8897L68.9219 60.791L67.8354 60.6757L65.6955 60.437C64.395 60.2313 63.0205 60.0667 61.9011 59.8033C60.7817 59.5399 59.72 59.2518 58.6665 58.9802C57.8216 58.6856 56.9968 58.3365 56.1972 57.9349C55.5705 57.6496 54.9725 57.3051 54.4112 56.9061C55.7857 56.6427 56.9627 56.083 58.0245 55.869C58.7227 55.6822 59.4319 55.5392 60.148 55.441C60.8312 55.334 61.5143 55.1859 62.3703 55.0048C64.4611 54.509 66.6107 54.3068 68.7573 54.4039C69.6319 54.4498 70.5001 54.5794 71.35 54.7908L71.1524 56.9061C71.0043 58.3465 70.8808 59.688 70.7573 60.9309L70.0824 60.8897ZM141.829 135.707C142.833 135.962 143.813 136.176 144.776 136.357C144.62 136.653 144.438 136.933 144.29 137.229L143.903 137.764C143.793 137.947 143.66 138.116 143.508 138.266C143.037 138.873 142.483 139.41 141.862 139.863C141.725 139.955 141.593 140.054 141.467 140.159C141.309 140.234 141.155 140.316 141.006 140.406C140.85 140.507 140.681 140.587 140.504 140.645C140.338 140.735 140.164 140.812 139.986 140.876C139.2 141.152 138.39 141.35 137.566 141.468C136.714 141.546 135.858 141.546 135.006 141.468C133.621 141.326 132.298 140.821 131.171 140.003C131.11 139.969 131.052 139.931 130.998 139.888C130.998 139.838 130.915 139.797 130.874 139.748C130.833 139.699 130.693 139.624 130.578 139.476C130.32 139.193 130.081 138.893 129.862 138.579C129.565 138.192 129.29 137.788 129.039 137.369C128.907 137.139 128.775 136.842 128.636 136.546L128.43 136.151L128.224 135.69L127.796 134.744L127.376 133.665C127.236 133.32 127.088 132.925 126.948 132.513L126.512 131.287C125.977 129.641 125.434 128.044 124.866 126.414C129.748 130.749 135.547 133.923 141.829 135.698V135.707ZM114.734 164.646C111.188 162.264 108.253 159.08 106.166 155.353C105.944 154.892 105.713 154.44 105.474 153.987L104.799 152.415C104.585 151.847 104.363 151.312 104.157 150.719C103.952 150.127 103.762 149.6 103.565 148.991C103.672 149.197 103.762 149.394 103.861 149.6C105.491 152.831 107.554 155.824 109.993 158.497C112.706 161.393 115.9 163.796 119.434 165.601C122.792 167.326 126.404 168.504 130.134 169.09C135.552 169.967 141.095 169.687 146.397 168.267C144.53 169.092 142.575 169.702 140.57 170.086C131.577 171.698 122.31 169.744 114.734 164.638V164.646Z" fill="#E8F1F8" />
                  <path d="M1.26407 134.563C1.74877 129.268 2.94475 124.064 4.81974 119.089C5.77376 116.541 6.9098 114.066 8.21902 111.681C9.57711 109.25 11.118 106.925 12.8282 104.726C14.575 102.49 16.5019 100.401 18.5897 98.4793C20.6138 96.6475 22.7587 94.9536 25.0097 93.4092C27.1496 91.9606 29.3061 90.6684 31.4296 89.4996C33.5531 88.3308 35.6355 87.3185 37.6849 86.3719C41.8002 84.4871 45.6604 82.9233 49.2655 81.4335C53.3808 79.7216 57.241 78.1413 60.3934 76.4046C63.0649 75.0616 65.5157 73.3185 67.661 71.2357C68.4675 70.4212 69.1722 69.5119 69.7599 68.5278C70.3824 67.4619 70.8979 66.3371 71.299 65.1697C71.8337 63.5798 72.268 61.9579 72.5995 60.3136C72.9945 58.4534 73.3485 56.3711 73.7435 54.0665C74.1386 51.7619 74.5666 49.3092 75.118 46.6589C75.7246 43.781 76.5024 40.9418 77.4473 38.1566C79.5492 32.14 82.6887 26.5381 86.7233 21.6047C94.5783 11.9728 105.269 5.06095 117.276 1.85103C123.376 0.212768 129.716 -0.344361 136.009 0.204891C142.248 0.791086 148.34 2.44774 154.017 5.10216C165.114 10.2862 174.301 18.8257 180.282 29.5144C183.32 34.9431 185.381 40.863 186.372 47.0046C187.321 53.0948 187.221 59.3025 186.076 65.359C186.076 65.4907 186.018 65.6142 185.994 65.7458C186.257 66.2726 186.512 66.8076 186.734 67.392C187.365 68.9306 187.866 70.5191 188.232 72.1411C188.43 73.1946 188.619 74.2564 188.776 75.3264L188.907 76.9231L189.014 78.4376C189.014 79.4417 189.014 80.4458 188.965 81.45C188.916 82.4541 188.784 83.4171 188.669 84.4048C188.118 88.1357 187.008 91.7622 185.376 95.1623C184.247 97.5176 182.885 99.7538 181.31 101.837C179.609 104.122 177.679 106.226 175.549 108.117C175.014 108.628 174.446 109.105 173.853 109.574C173.261 110.043 172.693 110.529 172.059 110.965C171.425 111.401 170.8 111.871 170.174 112.282L168.339 113.443C165.905 114.895 163.378 116.184 160.775 117.303C156.15 119.236 151.405 120.866 146.569 122.184C142.305 123.385 138.585 124.389 135.754 125.295C132.477 126.296 129.262 127.486 126.124 128.859C123.535 129.971 121.123 131.454 118.963 133.262C118.071 134.064 117.263 134.955 116.551 135.921C115.76 137.05 115.071 138.248 114.494 139.501C113.832 140.989 113.249 142.511 112.749 144.061C112.214 145.707 111.728 147.452 111.251 149.296L110.428 152.275C110.131 153.32 109.868 154.333 109.531 155.427C108.913 157.567 108.148 159.847 107.234 162.168L106.502 163.921C106.238 164.522 105.934 165.14 105.679 165.74C105.119 166.967 104.428 168.119 103.769 169.288C102.4 171.582 100.847 173.762 99.127 175.807C97.4343 177.823 95.5967 179.712 93.6289 181.461C91.6791 183.171 89.6138 184.744 87.4476 186.169C83.178 188.988 78.5567 191.235 73.7024 192.852C68.8653 194.491 63.8404 195.512 58.7473 195.889C53.5437 196.287 48.3103 195.975 43.1912 194.959C37.8738 193.899 32.7517 192.025 28.0056 189.404C23.1593 186.678 18.7937 183.174 15.0834 179.033C11.4832 174.952 8.51467 170.355 6.27659 165.395C4.10052 160.555 2.58347 155.444 1.76613 150.201C0.936152 145.031 0.767451 139.776 1.26407 134.563ZM119.918 60.8897L121.078 60.791L122.165 60.6757L124.305 60.437C125.605 60.2313 126.98 60.0667 128.099 59.8033C129.218 59.5399 130.28 59.2518 131.334 58.9802C132.179 58.6856 133.003 58.3365 133.803 57.9349C134.43 57.6496 135.028 57.3051 135.589 56.9061C134.214 56.6427 133.037 56.083 131.976 55.869C131.277 55.6822 130.568 55.5392 129.852 55.441C129.169 55.334 128.486 55.1859 127.63 55.0048C125.539 54.509 123.389 54.3068 121.243 54.4039C120.368 54.4498 119.5 54.5794 118.65 54.7908L118.848 56.9061C118.996 58.3465 119.119 59.688 119.243 60.9309L119.918 60.8897ZM48.1708 135.707C47.1666 135.962 46.1872 136.176 45.2242 136.357C45.3806 136.653 45.5617 136.933 45.7098 137.229L46.0967 137.764C46.2072 137.947 46.3399 138.116 46.4917 138.266C46.9633 138.873 47.5173 139.41 48.1379 139.863C48.2749 139.955 48.4068 140.054 48.5329 140.159C48.6908 140.234 48.8447 140.316 48.9939 140.406C49.1503 140.507 49.3191 140.587 49.496 140.645C49.6626 140.735 49.8359 140.812 50.0145 140.876C50.7997 141.152 51.6102 141.35 52.4343 141.468C53.2857 141.546 54.1426 141.546 54.994 141.468C56.3792 141.326 57.7023 140.821 58.8295 140.003C58.8902 139.969 58.9481 139.931 59.0024 139.888C59.0024 139.838 59.0847 139.797 59.1258 139.748C59.167 139.699 59.3069 139.624 59.4222 139.476C59.6797 139.193 59.9189 138.893 60.1382 138.579C60.4351 138.192 60.7099 137.788 60.9613 137.369C61.093 137.139 61.2247 136.842 61.3646 136.546L61.5704 136.151L61.7761 135.69L62.2041 134.744L62.6239 133.665C62.7638 133.32 62.912 132.925 63.0519 132.513L63.4881 131.287C64.0231 129.641 64.5664 128.044 65.1343 126.414C60.2526 130.749 54.4533 133.923 48.1708 135.698V135.707ZM75.2662 164.646C78.8121 162.264 81.7473 159.08 83.8344 155.353C84.0566 154.892 84.2871 154.44 84.5258 153.987L85.2006 152.415C85.4146 151.847 85.6369 151.312 85.8427 150.719C86.0484 150.127 86.2377 149.6 86.4352 148.991C86.3282 149.197 86.2377 149.394 86.1389 149.6C84.5088 152.831 82.4458 155.824 80.0071 158.497C77.294 161.393 74.0999 163.796 70.5665 165.601C67.2084 167.326 63.5963 168.504 59.8666 169.09C54.448 169.967 48.9051 169.687 43.6028 168.267C45.4702 169.092 47.4251 169.702 49.4301 170.086C58.423 171.698 67.6901 169.744 75.2662 164.638V164.646Z" fill="#E8F1F8" />
                  <path d="M110.281 136.874C107.919 136.865 105.62 136.104 103.719 134.702L96.9688 129.764C96.1313 129.148 95.1184 128.815 94.0782 128.815C93.0381 128.815 92.0252 129.148 91.1876 129.764L84.4376 134.702C82.6921 135.977 80.6138 136.717 78.4554 136.833C76.2971 136.948 74.1516 136.435 72.2797 135.354C70.4078 134.273 68.8902 132.672 67.9113 130.745C66.9324 128.818 66.5345 126.648 66.7657 124.499L67.672 116.186C67.7883 115.153 67.5703 114.11 67.0501 113.21C66.5298 112.31 65.7346 111.601 64.7813 111.186L57.1407 107.811C55.1583 106.942 53.472 105.514 52.288 103.702C51.1039 101.89 50.4733 99.7726 50.4733 97.6081C50.4733 95.4435 51.1039 93.3258 52.288 91.5138C53.472 89.7019 55.1583 88.2741 57.1407 87.4049L64.7813 84.0299C65.7346 83.6153 66.5298 82.9059 67.0501 82.006C67.5703 81.106 67.7883 80.0629 67.672 79.0299L66.7657 70.7174C66.5345 68.5684 66.9324 66.3984 67.9113 64.4713C68.8902 62.5442 70.4078 60.943 72.2797 59.8622C74.1516 58.7815 76.2971 58.2677 78.4554 58.3835C80.6138 58.4993 82.6921 59.2395 84.4376 60.5143L91.1876 65.4518C92.0252 66.0686 93.0381 66.4013 94.0782 66.4013C95.1184 66.4013 96.1313 66.0686 96.9688 65.4518L103.719 60.5143C104.921 59.6246 106.293 58.9909 107.749 58.6523C109.206 58.3137 110.716 58.2773 112.188 58.5456C113.691 58.8183 115.123 59.3921 116.398 60.2326C117.674 61.073 118.766 62.1627 119.609 63.4362C119.843 63.7787 120.007 64.1644 120.09 64.5707C120.173 64.977 120.175 65.3958 120.095 65.8027C120.014 66.2096 119.854 66.5964 119.623 66.9407C119.391 67.285 119.094 67.5798 118.748 67.808C118.401 68.0361 118.013 68.193 117.605 68.2695C117.198 68.3461 116.779 68.3407 116.373 68.2538C115.968 68.1668 115.584 68 115.243 67.763C114.903 67.5261 114.613 67.2238 114.391 66.8737C114.014 66.307 113.526 65.8224 112.956 65.4492C112.387 65.076 111.748 64.8217 111.078 64.7018C110.433 64.5828 109.77 64.6006 109.132 64.7541C108.494 64.9075 107.896 65.1931 107.375 65.5924L100.625 70.5299C98.7147 71.9302 96.4078 72.6851 94.0392 72.6851C91.6706 72.6851 89.3636 71.9302 87.4532 70.5299L80.7188 65.5924C79.9535 65.0113 79.0339 64.6685 78.075 64.6069C77.116 64.5453 76.1601 64.7676 75.3267 65.2459C74.4933 65.7243 73.8193 66.4376 73.3888 67.2968C72.9584 68.1559 72.7906 69.1229 72.9063 70.0768L73.8126 78.3737C74.085 80.7214 73.6016 83.0947 72.4326 85.1488C71.2637 87.2029 69.4701 88.8307 67.3126 89.7956L59.6563 93.1706C58.7885 93.5557 58.0511 94.1845 57.5336 94.9804C57.016 95.7764 56.7405 96.7055 56.7405 97.6549C56.7405 98.6044 57.016 99.5335 57.5336 100.329C58.0511 101.125 58.7885 101.754 59.6563 102.139L67.3126 105.421C69.4819 106.372 71.2902 107.992 72.4736 110.044C73.657 112.096 74.1535 114.473 73.8907 116.827L72.9845 125.124C72.8687 126.078 73.0365 127.045 73.4669 127.904C73.8974 128.763 74.5714 129.476 75.4048 129.955C76.2382 130.433 77.1941 130.655 78.1531 130.594C79.1121 130.532 80.0316 130.189 80.797 129.608L87.5313 124.671C89.4417 123.27 91.7487 122.515 94.1173 122.515C96.4859 122.515 98.7928 123.27 100.703 124.671L107.453 129.608C108.219 130.189 109.138 130.532 110.097 130.594C111.056 130.655 112.012 130.433 112.845 129.955C113.679 129.476 114.353 128.763 114.783 127.904C115.214 127.045 115.382 126.078 115.266 125.124L114.359 116.827C114.087 114.483 114.569 112.114 115.735 110.062C116.901 108.011 118.691 106.385 120.844 105.421L128.5 102.046C129.368 101.66 130.105 101.032 130.623 100.236C131.14 99.4397 131.416 98.5106 131.416 97.5612C131.416 96.6117 131.14 95.6827 130.623 94.8867C130.105 94.0907 129.368 93.462 128.5 93.0768L124.344 91.3581C123.957 91.2006 123.606 90.9671 123.311 90.6715C123.016 90.3759 122.783 90.0241 122.626 89.637C122.469 89.2499 122.392 88.8352 122.398 88.4176C122.404 88 122.494 87.5878 122.662 87.2055C122.83 86.8232 123.073 86.4785 123.377 86.1917C123.681 85.9049 124.039 85.682 124.43 85.536C124.821 85.39 125.238 85.3239 125.655 85.3416C126.072 85.3594 126.482 85.4606 126.859 85.6393L131.016 87.4674C132.998 88.3366 134.684 89.7644 135.868 91.5763C137.053 93.3883 137.683 95.506 137.683 97.6706C137.683 99.8351 137.053 101.953 135.868 103.765C134.684 105.577 132.998 107.005 131.016 107.874L123.375 111.249C122.422 111.665 121.626 112.374 121.104 113.273C120.581 114.172 120.359 115.215 120.469 116.249L121.375 124.561C121.637 126.713 121.255 128.893 120.275 130.827C119.296 132.76 117.765 134.359 115.875 135.421C114.17 136.386 112.241 136.887 110.281 136.874Z" fill="#2C7FB9" />
                  <path d="M94.4376 108.546C94.0252 108.546 93.6169 108.465 93.2361 108.306C92.8553 108.148 92.5096 107.916 92.2188 107.624L78.7657 94.1706C78.4304 93.8919 78.1571 93.5462 77.9634 93.1556C77.7697 92.765 77.6599 92.3382 77.641 91.9026C77.6221 91.467 77.6946 91.0323 77.8537 90.6264C78.0129 90.2205 78.2552 89.8524 78.5652 89.5457C78.8751 89.2391 79.2458 89.0007 79.6533 88.8459C80.0609 88.691 80.4964 88.6232 80.9317 88.6467C81.3671 88.6703 81.7927 88.7846 82.1812 88.9825C82.5697 89.1804 82.9125 89.4573 83.1876 89.7956L94.4376 101.046L134.188 61.2331C134.783 60.6955 135.562 60.4074 136.364 60.4286C137.166 60.4497 137.929 60.7785 138.495 61.3467C139.062 61.9149 139.388 62.6792 139.406 63.4812C139.424 64.2831 139.134 65.0615 138.594 65.6549L96.6407 107.608C96.3531 107.901 96.0105 108.135 95.6325 108.296C95.2545 108.457 94.8484 108.542 94.4376 108.546Z" fill="#2C7FB9" />
                </g>
                <defs>
                  <clipPath id="clip0_202_52">
                    <rect width="190" height="197" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <section id="success-texts">
                <h1 id="success-header-text">Payment done!</h1>
                <p id="success-subtext">You've successfully paid PayBox GHS <span class="amount-value"></span> from your account.</p>
              </section>
              <button id="card-btn" class="mobile-btn" onClick={() => this.closeModal()}>Close</button>
            </section>


            {/* <!--This is the success page that comes up when the user has successfully completed their transaction using any payment method--> */}
            <section ref={el => (this.successPage = el as HTMLElement)} id="success-page" class="hidden">
              <svg id="success-illustration" xmlns="http://www.w3.org/2000/svg" width="190" height="197" viewBox="0 0 190 197" fill="none">
                <g clip-path="url(#clip0_202_52)">
                  <path d="M189.014 0H0.98584V196.057H189.014V0Z" fill="white" />
                  <path d="M188.736 134.563C188.251 129.268 187.055 124.064 185.18 119.089C184.226 116.541 183.09 114.066 181.781 111.681C180.423 109.25 178.882 106.925 177.172 104.726C175.425 102.49 173.498 100.401 171.41 98.4793C169.386 96.6475 167.241 94.9536 164.99 93.4092C162.85 91.9606 160.694 90.6684 158.571 89.4996C156.447 88.3308 154.365 87.3185 152.315 86.3719C148.2 84.4871 144.34 82.9233 140.735 81.4335C136.619 79.7216 132.759 78.1413 129.607 76.4046C126.935 75.0616 124.484 73.3185 122.339 71.2357C121.533 70.4212 120.828 69.5119 120.24 68.5278C119.618 67.4619 119.102 66.3371 118.701 65.1697C118.166 63.5798 117.732 61.9579 117.401 60.3136C117.006 58.4534 116.652 56.3711 116.257 54.0665C115.862 51.7619 115.434 49.3092 114.882 46.6589C114.276 43.781 113.498 40.9418 112.553 38.1566C110.451 32.14 107.311 26.5381 103.277 21.6047C95.4219 11.9728 84.7315 5.06095 72.7245 1.85103C66.6241 0.212768 60.284 -0.344361 53.9914 0.204891C47.7518 0.791086 41.6598 2.44774 35.9827 5.10216C24.8861 10.2862 15.6987 18.8257 9.71859 29.5144C6.68048 34.9431 4.61894 40.863 3.62786 47.0046C2.67889 53.0948 2.77915 59.3025 3.9242 65.359C3.9242 65.4907 3.9818 65.6142 4.00649 65.7458C3.74311 66.2726 3.48793 66.8076 3.26571 67.392C2.63506 68.9306 2.13398 70.5191 1.76771 72.1411C1.57018 73.1946 1.38089 74.2564 1.22451 75.3264L1.09284 76.9231L0.98584 78.4376C0.98584 79.4417 0.985838 80.4458 1.03522 81.45C1.08461 82.4541 1.21628 83.4171 1.33151 84.4048C1.88236 88.1357 2.99224 91.7622 4.62379 95.1623C5.75264 97.5176 7.11477 99.7538 8.68975 101.837C10.3908 104.122 12.3214 106.226 14.4512 108.117C14.9862 108.628 15.5541 109.105 16.1467 109.574C16.7394 110.043 17.3073 110.529 17.941 110.965C18.5748 111.401 19.2003 111.871 19.8258 112.282L21.6613 113.443C24.0948 114.895 26.6216 116.184 29.2253 117.303C33.85 119.236 38.5954 120.866 43.4315 122.184C47.695 123.385 51.4152 124.389 54.2466 125.295C57.5226 126.296 60.738 127.486 63.8765 128.859C66.4648 129.971 68.8771 131.454 71.0372 133.262C71.9294 134.064 72.7374 134.955 73.4488 135.921C74.2404 137.05 74.9291 138.248 75.5065 139.501C76.1684 140.989 76.7509 142.511 77.2514 144.061C77.7864 145.707 78.272 147.452 78.7493 149.296L79.5724 152.275C79.8687 153.32 80.1321 154.333 80.4696 155.427C81.0869 157.567 81.8523 159.847 82.7659 162.168L83.4985 163.921C83.7618 164.522 84.0664 165.14 84.3215 165.74C84.8812 166.967 85.5726 168.119 86.2311 169.288C87.6006 171.582 89.1529 173.762 90.8731 175.807C92.5658 177.823 94.4034 179.712 96.3712 181.461C98.321 183.171 100.386 184.744 102.552 186.169C106.822 188.988 111.443 191.235 116.298 192.852C121.135 194.491 126.16 195.512 131.253 195.889C136.456 196.287 141.69 195.975 146.809 194.959C152.126 193.899 157.248 192.025 161.995 189.404C166.841 186.678 171.206 183.174 174.917 179.033C178.517 174.952 181.485 170.355 183.723 165.395C185.9 160.555 187.417 155.444 188.234 150.201C189.064 145.031 189.233 139.776 188.736 134.563ZM70.0824 60.8897L68.9219 60.791L67.8354 60.6757L65.6955 60.437C64.395 60.2313 63.0205 60.0667 61.9011 59.8033C60.7817 59.5399 59.72 59.2518 58.6665 58.9802C57.8216 58.6856 56.9968 58.3365 56.1972 57.9349C55.5705 57.6496 54.9725 57.3051 54.4112 56.9061C55.7857 56.6427 56.9627 56.083 58.0245 55.869C58.7227 55.6822 59.4319 55.5392 60.148 55.441C60.8312 55.334 61.5143 55.1859 62.3703 55.0048C64.4611 54.509 66.6107 54.3068 68.7573 54.4039C69.6319 54.4498 70.5001 54.5794 71.35 54.7908L71.1524 56.9061C71.0043 58.3465 70.8808 59.688 70.7573 60.9309L70.0824 60.8897ZM141.829 135.707C142.833 135.962 143.813 136.176 144.776 136.357C144.62 136.653 144.438 136.933 144.29 137.229L143.903 137.764C143.793 137.947 143.66 138.116 143.508 138.266C143.037 138.873 142.483 139.41 141.862 139.863C141.725 139.955 141.593 140.054 141.467 140.159C141.309 140.234 141.155 140.316 141.006 140.406C140.85 140.507 140.681 140.587 140.504 140.645C140.338 140.735 140.164 140.812 139.986 140.876C139.2 141.152 138.39 141.35 137.566 141.468C136.714 141.546 135.858 141.546 135.006 141.468C133.621 141.326 132.298 140.821 131.171 140.003C131.11 139.969 131.052 139.931 130.998 139.888C130.998 139.838 130.915 139.797 130.874 139.748C130.833 139.699 130.693 139.624 130.578 139.476C130.32 139.193 130.081 138.893 129.862 138.579C129.565 138.192 129.29 137.788 129.039 137.369C128.907 137.139 128.775 136.842 128.636 136.546L128.43 136.151L128.224 135.69L127.796 134.744L127.376 133.665C127.236 133.32 127.088 132.925 126.948 132.513L126.512 131.287C125.977 129.641 125.434 128.044 124.866 126.414C129.748 130.749 135.547 133.923 141.829 135.698V135.707ZM114.734 164.646C111.188 162.264 108.253 159.08 106.166 155.353C105.944 154.892 105.713 154.44 105.474 153.987L104.799 152.415C104.585 151.847 104.363 151.312 104.157 150.719C103.952 150.127 103.762 149.6 103.565 148.991C103.672 149.197 103.762 149.394 103.861 149.6C105.491 152.831 107.554 155.824 109.993 158.497C112.706 161.393 115.9 163.796 119.434 165.601C122.792 167.326 126.404 168.504 130.134 169.09C135.552 169.967 141.095 169.687 146.397 168.267C144.53 169.092 142.575 169.702 140.57 170.086C131.577 171.698 122.31 169.744 114.734 164.638V164.646Z" fill="#E8F1F8" />
                  <path d="M1.26407 134.563C1.74877 129.268 2.94475 124.064 4.81974 119.089C5.77376 116.541 6.9098 114.066 8.21902 111.681C9.57711 109.25 11.118 106.925 12.8282 104.726C14.575 102.49 16.5019 100.401 18.5897 98.4793C20.6138 96.6475 22.7587 94.9536 25.0097 93.4092C27.1496 91.9606 29.3061 90.6684 31.4296 89.4996C33.5531 88.3308 35.6355 87.3185 37.6849 86.3719C41.8002 84.4871 45.6604 82.9233 49.2655 81.4335C53.3808 79.7216 57.241 78.1413 60.3934 76.4046C63.0649 75.0616 65.5157 73.3185 67.661 71.2357C68.4675 70.4212 69.1722 69.5119 69.7599 68.5278C70.3824 67.4619 70.8979 66.3371 71.299 65.1697C71.8337 63.5798 72.268 61.9579 72.5995 60.3136C72.9945 58.4534 73.3485 56.3711 73.7435 54.0665C74.1386 51.7619 74.5666 49.3092 75.118 46.6589C75.7246 43.781 76.5024 40.9418 77.4473 38.1566C79.5492 32.14 82.6887 26.5381 86.7233 21.6047C94.5783 11.9728 105.269 5.06095 117.276 1.85103C123.376 0.212768 129.716 -0.344361 136.009 0.204891C142.248 0.791086 148.34 2.44774 154.017 5.10216C165.114 10.2862 174.301 18.8257 180.282 29.5144C183.32 34.9431 185.381 40.863 186.372 47.0046C187.321 53.0948 187.221 59.3025 186.076 65.359C186.076 65.4907 186.018 65.6142 185.994 65.7458C186.257 66.2726 186.512 66.8076 186.734 67.392C187.365 68.9306 187.866 70.5191 188.232 72.1411C188.43 73.1946 188.619 74.2564 188.776 75.3264L188.907 76.9231L189.014 78.4376C189.014 79.4417 189.014 80.4458 188.965 81.45C188.916 82.4541 188.784 83.4171 188.669 84.4048C188.118 88.1357 187.008 91.7622 185.376 95.1623C184.247 97.5176 182.885 99.7538 181.31 101.837C179.609 104.122 177.679 106.226 175.549 108.117C175.014 108.628 174.446 109.105 173.853 109.574C173.261 110.043 172.693 110.529 172.059 110.965C171.425 111.401 170.8 111.871 170.174 112.282L168.339 113.443C165.905 114.895 163.378 116.184 160.775 117.303C156.15 119.236 151.405 120.866 146.569 122.184C142.305 123.385 138.585 124.389 135.754 125.295C132.477 126.296 129.262 127.486 126.124 128.859C123.535 129.971 121.123 131.454 118.963 133.262C118.071 134.064 117.263 134.955 116.551 135.921C115.76 137.05 115.071 138.248 114.494 139.501C113.832 140.989 113.249 142.511 112.749 144.061C112.214 145.707 111.728 147.452 111.251 149.296L110.428 152.275C110.131 153.32 109.868 154.333 109.531 155.427C108.913 157.567 108.148 159.847 107.234 162.168L106.502 163.921C106.238 164.522 105.934 165.14 105.679 165.74C105.119 166.967 104.428 168.119 103.769 169.288C102.4 171.582 100.847 173.762 99.127 175.807C97.4343 177.823 95.5967 179.712 93.6289 181.461C91.6791 183.171 89.6138 184.744 87.4476 186.169C83.178 188.988 78.5567 191.235 73.7024 192.852C68.8653 194.491 63.8404 195.512 58.7473 195.889C53.5437 196.287 48.3103 195.975 43.1912 194.959C37.8738 193.899 32.7517 192.025 28.0056 189.404C23.1593 186.678 18.7937 183.174 15.0834 179.033C11.4832 174.952 8.51467 170.355 6.27659 165.395C4.10052 160.555 2.58347 155.444 1.76613 150.201C0.936152 145.031 0.767451 139.776 1.26407 134.563ZM119.918 60.8897L121.078 60.791L122.165 60.6757L124.305 60.437C125.605 60.2313 126.98 60.0667 128.099 59.8033C129.218 59.5399 130.28 59.2518 131.334 58.9802C132.179 58.6856 133.003 58.3365 133.803 57.9349C134.43 57.6496 135.028 57.3051 135.589 56.9061C134.214 56.6427 133.037 56.083 131.976 55.869C131.277 55.6822 130.568 55.5392 129.852 55.441C129.169 55.334 128.486 55.1859 127.63 55.0048C125.539 54.509 123.389 54.3068 121.243 54.4039C120.368 54.4498 119.5 54.5794 118.65 54.7908L118.848 56.9061C118.996 58.3465 119.119 59.688 119.243 60.9309L119.918 60.8897ZM48.1708 135.707C47.1666 135.962 46.1872 136.176 45.2242 136.357C45.3806 136.653 45.5617 136.933 45.7098 137.229L46.0967 137.764C46.2072 137.947 46.3399 138.116 46.4917 138.266C46.9633 138.873 47.5173 139.41 48.1379 139.863C48.2749 139.955 48.4068 140.054 48.5329 140.159C48.6908 140.234 48.8447 140.316 48.9939 140.406C49.1503 140.507 49.3191 140.587 49.496 140.645C49.6626 140.735 49.8359 140.812 50.0145 140.876C50.7997 141.152 51.6102 141.35 52.4343 141.468C53.2857 141.546 54.1426 141.546 54.994 141.468C56.3792 141.326 57.7023 140.821 58.8295 140.003C58.8902 139.969 58.9481 139.931 59.0024 139.888C59.0024 139.838 59.0847 139.797 59.1258 139.748C59.167 139.699 59.3069 139.624 59.4222 139.476C59.6797 139.193 59.9189 138.893 60.1382 138.579C60.4351 138.192 60.7099 137.788 60.9613 137.369C61.093 137.139 61.2247 136.842 61.3646 136.546L61.5704 136.151L61.7761 135.69L62.2041 134.744L62.6239 133.665C62.7638 133.32 62.912 132.925 63.0519 132.513L63.4881 131.287C64.0231 129.641 64.5664 128.044 65.1343 126.414C60.2526 130.749 54.4533 133.923 48.1708 135.698V135.707ZM75.2662 164.646C78.8121 162.264 81.7473 159.08 83.8344 155.353C84.0566 154.892 84.2871 154.44 84.5258 153.987L85.2006 152.415C85.4146 151.847 85.6369 151.312 85.8427 150.719C86.0484 150.127 86.2377 149.6 86.4352 148.991C86.3282 149.197 86.2377 149.394 86.1389 149.6C84.5088 152.831 82.4458 155.824 80.0071 158.497C77.294 161.393 74.0999 163.796 70.5665 165.601C67.2084 167.326 63.5963 168.504 59.8666 169.09C54.448 169.967 48.9051 169.687 43.6028 168.267C45.4702 169.092 47.4251 169.702 49.4301 170.086C58.423 171.698 67.6901 169.744 75.2662 164.638V164.646Z" fill="#E8F1F8" />
                  <path d="M110.281 136.874C107.919 136.865 105.62 136.104 103.719 134.702L96.9688 129.764C96.1313 129.148 95.1184 128.815 94.0782 128.815C93.0381 128.815 92.0252 129.148 91.1876 129.764L84.4376 134.702C82.6921 135.977 80.6138 136.717 78.4554 136.833C76.2971 136.948 74.1516 136.435 72.2797 135.354C70.4078 134.273 68.8902 132.672 67.9113 130.745C66.9324 128.818 66.5345 126.648 66.7657 124.499L67.672 116.186C67.7883 115.153 67.5703 114.11 67.0501 113.21C66.5298 112.31 65.7346 111.601 64.7813 111.186L57.1407 107.811C55.1583 106.942 53.472 105.514 52.288 103.702C51.1039 101.89 50.4733 99.7726 50.4733 97.6081C50.4733 95.4435 51.1039 93.3258 52.288 91.5138C53.472 89.7019 55.1583 88.2741 57.1407 87.4049L64.7813 84.0299C65.7346 83.6153 66.5298 82.9059 67.0501 82.006C67.5703 81.106 67.7883 80.0629 67.672 79.0299L66.7657 70.7174C66.5345 68.5684 66.9324 66.3984 67.9113 64.4713C68.8902 62.5442 70.4078 60.943 72.2797 59.8622C74.1516 58.7815 76.2971 58.2677 78.4554 58.3835C80.6138 58.4993 82.6921 59.2395 84.4376 60.5143L91.1876 65.4518C92.0252 66.0686 93.0381 66.4013 94.0782 66.4013C95.1184 66.4013 96.1313 66.0686 96.9688 65.4518L103.719 60.5143C104.921 59.6246 106.293 58.9909 107.749 58.6523C109.206 58.3137 110.716 58.2773 112.188 58.5456C113.691 58.8183 115.123 59.3921 116.398 60.2326C117.674 61.073 118.766 62.1627 119.609 63.4362C119.843 63.7787 120.007 64.1644 120.09 64.5707C120.173 64.977 120.175 65.3958 120.095 65.8027C120.014 66.2096 119.854 66.5964 119.623 66.9407C119.391 67.285 119.094 67.5798 118.748 67.808C118.401 68.0361 118.013 68.193 117.605 68.2695C117.198 68.3461 116.779 68.3407 116.373 68.2538C115.968 68.1668 115.584 68 115.243 67.763C114.903 67.5261 114.613 67.2238 114.391 66.8737C114.014 66.307 113.526 65.8224 112.956 65.4492C112.387 65.076 111.748 64.8217 111.078 64.7018C110.433 64.5828 109.77 64.6006 109.132 64.7541C108.494 64.9075 107.896 65.1931 107.375 65.5924L100.625 70.5299C98.7147 71.9302 96.4078 72.6851 94.0392 72.6851C91.6706 72.6851 89.3636 71.9302 87.4532 70.5299L80.7188 65.5924C79.9535 65.0113 79.0339 64.6685 78.075 64.6069C77.116 64.5453 76.1601 64.7676 75.3267 65.2459C74.4933 65.7243 73.8193 66.4376 73.3888 67.2968C72.9584 68.1559 72.7906 69.1229 72.9063 70.0768L73.8126 78.3737C74.085 80.7214 73.6016 83.0947 72.4326 85.1488C71.2637 87.2029 69.4701 88.8307 67.3126 89.7956L59.6563 93.1706C58.7885 93.5557 58.0511 94.1845 57.5336 94.9804C57.016 95.7764 56.7405 96.7055 56.7405 97.6549C56.7405 98.6044 57.016 99.5335 57.5336 100.329C58.0511 101.125 58.7885 101.754 59.6563 102.139L67.3126 105.421C69.4819 106.372 71.2902 107.992 72.4736 110.044C73.657 112.096 74.1535 114.473 73.8907 116.827L72.9845 125.124C72.8687 126.078 73.0365 127.045 73.4669 127.904C73.8974 128.763 74.5714 129.476 75.4048 129.955C76.2382 130.433 77.1941 130.655 78.1531 130.594C79.1121 130.532 80.0316 130.189 80.797 129.608L87.5313 124.671C89.4417 123.27 91.7487 122.515 94.1173 122.515C96.4859 122.515 98.7928 123.27 100.703 124.671L107.453 129.608C108.219 130.189 109.138 130.532 110.097 130.594C111.056 130.655 112.012 130.433 112.845 129.955C113.679 129.476 114.353 128.763 114.783 127.904C115.214 127.045 115.382 126.078 115.266 125.124L114.359 116.827C114.087 114.483 114.569 112.114 115.735 110.062C116.901 108.011 118.691 106.385 120.844 105.421L128.5 102.046C129.368 101.66 130.105 101.032 130.623 100.236C131.14 99.4397 131.416 98.5106 131.416 97.5612C131.416 96.6117 131.14 95.6827 130.623 94.8867C130.105 94.0907 129.368 93.462 128.5 93.0768L124.344 91.3581C123.957 91.2006 123.606 90.9671 123.311 90.6715C123.016 90.3759 122.783 90.0241 122.626 89.637C122.469 89.2499 122.392 88.8352 122.398 88.4176C122.404 88 122.494 87.5878 122.662 87.2055C122.83 86.8232 123.073 86.4785 123.377 86.1917C123.681 85.9049 124.039 85.682 124.43 85.536C124.821 85.39 125.238 85.3239 125.655 85.3416C126.072 85.3594 126.482 85.4606 126.859 85.6393L131.016 87.4674C132.998 88.3366 134.684 89.7644 135.868 91.5763C137.053 93.3883 137.683 95.506 137.683 97.6706C137.683 99.8351 137.053 101.953 135.868 103.765C134.684 105.577 132.998 107.005 131.016 107.874L123.375 111.249C122.422 111.665 121.626 112.374 121.104 113.273C120.581 114.172 120.359 115.215 120.469 116.249L121.375 124.561C121.637 126.713 121.255 128.893 120.275 130.827C119.296 132.76 117.765 134.359 115.875 135.421C114.17 136.386 112.241 136.887 110.281 136.874Z" fill="#2C7FB9" />
                  <path d="M94.4376 108.546C94.0252 108.546 93.6169 108.465 93.2361 108.306C92.8553 108.148 92.5096 107.916 92.2188 107.624L78.7657 94.1706C78.4304 93.8919 78.1571 93.5462 77.9634 93.1556C77.7697 92.765 77.6599 92.3382 77.641 91.9026C77.6221 91.467 77.6946 91.0323 77.8537 90.6264C78.0129 90.2205 78.2552 89.8524 78.5652 89.5457C78.8751 89.2391 79.2458 89.0007 79.6533 88.8459C80.0609 88.691 80.4964 88.6232 80.9317 88.6467C81.3671 88.6703 81.7927 88.7846 82.1812 88.9825C82.5697 89.1804 82.9125 89.4573 83.1876 89.7956L94.4376 101.046L134.188 61.2331C134.783 60.6955 135.562 60.4074 136.364 60.4286C137.166 60.4497 137.929 60.7785 138.495 61.3467C139.062 61.9149 139.388 62.6792 139.406 63.4812C139.424 64.2831 139.134 65.0615 138.594 65.6549L96.6407 107.608C96.3531 107.901 96.0105 108.135 95.6325 108.296C95.2545 108.457 94.8484 108.542 94.4376 108.546Z" fill="#2C7FB9" />
                </g>
                <defs>
                  <clipPath id="clip0_202_52">
                    <rect width="190" height="197" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <section id="success-texts">
                <h1 id="success-header-text">Payment done!</h1>
                <p id="success-subtext">You've successfully paid PayBox GHS <span class="amount-value"></span> from your account.</p>
              </section>
              <button id="card-btn" type='button' onClick={() => this.closeModal()} class="desktop-btn">Close</button>
            </section>


          </div>

        </div>

      </Host >
    );
  }

}
