// desktop view variables and functions
// const cardDesktopContent = document.getElementById('card-payment-content');
// const mobileMoneyDesktopContent = document.getElementById('mobile-money-content');
// const cashPaymentDesktopContent = document.getElementById('cash-payment-content');
// const testPaymentDesktopContent = document.getElementById('test-payment-content');
// const paymentMethodContainer = document.getElementById('payment-method-container');
// const cardNavItem = document.getElementById('card-nav-item');
// const mobileMoneyNavItem = document.getElementById('mobile-money-nav-item');
// const cashPaymentNavItem = document.getElementById('cash-payment-nav-item');
// const testNavItem = document.getElementById('test-nav-item');
// const navItems = document.querySelectorAll('.nav-tab');

export const placeCardContent = (navItems, cardNavItem,
    mobileMoneyDesktopContent, cashPaymentDesktopContent,
    testPaymentDesktopContent, cardDesktopContent) => {
    currentTab(navItems);
    cardNavItem.classList.add('active-tab');
    mobileMoneyDesktopContent.style.display = 'none';
    cashPaymentDesktopContent.style.display = 'none';
    testPaymentDesktopContent.style.display = 'none';
    cardDesktopContent.style.display = 'flex';
}

export const placeMobileMoneyContent = (
    paymentMethodContainer,
    mobileMoneyDesktopContent,
    cardDesktopContent,
    cashPaymentDesktopContent,
    testPaymentDesktopContent,
    mobileMoneyNavItem,
    navItems
) => {
    const currentContent = paymentMethodContainer.firstElementChild;
    if (currentContent !== mobileMoneyDesktopContent) {
        currentTab(navItems);
        mobileMoneyNavItem.classList.add('active-tab');
        cardDesktopContent.style.display = 'none';
        cashPaymentDesktopContent.style.display = 'none';
        testPaymentDesktopContent.style.display = 'none';
        mobileMoneyDesktopContent.style.display = 'flex';
    }
};

export const placeCashPaymentContent = (
    paymentMethodContainer,
    cashPaymentDesktopContent,
    cardDesktopContent,
    mobileMoneyDesktopContent,
    testPaymentDesktopContent,
    cashPaymentNavItem,
    navItems
) => {
    const currentContent = paymentMethodContainer.firstElementChild;
    if (currentContent !== cashPaymentDesktopContent) {
        currentTab(navItems);
        cashPaymentNavItem.classList.add('active-tab');
        cardDesktopContent.style.display = 'none';
        mobileMoneyDesktopContent.style.display = 'none';
        testPaymentDesktopContent.style.display = 'none';
        cashPaymentDesktopContent.style.display = 'flex';
    }
};

export const placeTestContent = (
    paymentMethodContainer,
    testPaymentDesktopContent,
    cardDesktopContent,
    mobileMoneyDesktopContent,
    cashPaymentDesktopContent,
    testNavItem,
    navItems
) => {
    const currentContent = paymentMethodContainer.firstElementChild;
    if (currentContent !== testPaymentDesktopContent) {
        currentTab(navItems);
        testNavItem.classList.add('active-tab');
        cardDesktopContent.style.display = 'none';
        mobileMoneyDesktopContent.style.display = 'none';
        cashPaymentDesktopContent.style.display = 'none';
        testPaymentDesktopContent.style.display = 'flex';
    }
};

export const currentTab = nav => {
    let navArr = [];
    for (let i = 0; i < nav.length; i++) {
        if (nav[i].classList.length === 2) {
            navArr.push(nav[i]);
        }
    }
    if (navArr.length > 0) { navArr[0].classList.remove('active-tab') };
}

// remove banner functions
export const removeAlertBanner = e => {
    alertBanner.style.display = "none";
    console.log(alertBanner);
}

export const removeSuccessBanner = e => {
    successBanner.style.display = "none";
}

export const removePendingBanner = e => {
    pendingBanner.style.display = "none";
}

export const removeFailedBanner = e => {
    failedBanner.style.display = "none";
}

export const removeInfoBanner = e => {
    infoBanner.style.display = "none";
}


// mobile view variables and functions
const initialMobilePage = document.getElementById('mobile-initial-page');
const cardPageMobile = document.getElementById('mobile-card-page');
const mobileMoneyPageMobile = document.getElementById('mobile-mobilemoney-page');
const cashPaymentPageMobile = document.getElementById('mobile-cash-payment-page');
const testPageMobile = document.getElementById('mobile-test-page');
const backBtnList = document.getElementsByClassName('back-btn-container');

export const goMobileCardPage = e => {
    initialMobilePage.style.display = 'none';
    mobileMoneyPageMobile.style.display = 'none';
    cashPaymentPageMobile.style.display = 'none';
    testPageMobile.style.display = 'none';
    cardPageMobile.style.display = 'flex';
}

export const goMobileCashPaymentPage = e => {
    initialMobilePage.style.display = 'none';
    mobileMoneyPageMobile.style.display = 'none';
    cardPageMobile.style.display = 'none';
    testPageMobile.style.display = 'none';
    cashPaymentPageMobile.style.display = 'flex';
}

export const goMobileMobilemoneyPage = e => {
    initialMobilePage.style.display = 'none';
    cardPageMobile.style.display = 'none';
    cashPaymentPageMobile.style.display = 'none';
    testPageMobile.style.display = 'none';
    mobileMoneyPageMobile.style.display = 'flex';
}

export const goMobileTestPage = e => {
    initialMobilePage.style.display = 'none';
    mobileMoneyPageMobile.style.display = 'none';
    cashPaymentPageMobile.style.display = 'none';
    cardPageMobile.style.display = 'none';
    testPageMobile.style.display = 'flex';
}

export const backToInitialPage = e => {
    for (let i = 0; i < backBtnList.length; i++) {
        initialMobilePage.style.display = 'flex';
        mobileMoneyPageMobile.style.display = 'none';
        cashPaymentPageMobile.style.display = 'none';
        cardPageMobile.style.display = 'none';
        testPageMobile.style.display = 'none';
    }
}

// remove banner variable & function
const banners = document.getElementsByClassName('banner');

export const removeBanner = e => {

    for (let i = 0; i < banners.length; i++) {
        console.log(banners[i]);
        banners[i].style.display = "none";
    }
}