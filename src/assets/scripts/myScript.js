import intTelInput from "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js";

//var input = document.querySelector("#telephone");

export function initTelInput(input) {
    window.intlTelInput(input,({
        onlyCountries: ["gh"],
        allowDropdown: false,
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js",
    }));
}


