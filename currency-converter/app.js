const country_list = {
    "AED": "AE", "AFN": "AF", "XCD": "AG", "ALL": "AL", "AMD": "AM", "ANG": "AN", "AOA": "AO", "AQD": "AQ", "ARS": "AR", "AUD": "AU", "AZN": "AZ", "BAM": "BA", "BBD": "BB", "BDT": "BD", "BEF": "BE", "BGN": "BG", "BHD": "BH", "BIF": "BI", "BMD": "BM", "BND": "BN", "BOB": "BO", "BRL": "BR", "BSD": "BS", "NOK": "BV", "BWP": "BW", "BYR": "BY", "BZD": "BZ", "CAD": "CA", "CDF": "CD", "XAF": "CF", "CHF": "CH", "CLP": "CL", "CNY": "CN", "COP": "CO", "CRC": "CR", "CUP": "CU", "CVE": "CV", "CYP": "CY", "CZK": "CZ", "DJF": "DJ", "DKK": "DK", "DOP": "DO", "DZD": "DZ", "ECS": "EC", "EEK": "EE", "EGP": "EG", "ETB": "ET", "EUR": "FR", "FJD": "FJ", "FKP": "FK", "GBP": "GB", "GEL": "GE", "GGP": "GG", "GHS": "GH", "GIP": "GI", "GMD": "GM", "GNF": "GN", "GTQ": "GT", "GYD": "GY", "HKD": "HK", "HNL": "HN", "HRK": "HR", "HTG": "HT", "HUF": "HU", "IDR": "ID", "ILS": "IL", "INR": "IN", "IQD": "IQ", "IRR": "IR", "ISK": "IS", "JMD": "JM", "JOD": "JO", "JPY": "JP", "KES": "KE", "KGS": "KG", "KHR": "KH", "KMF": "KM", "KPW": "KP", "KRW": "KR", "KWD": "KW", "KYD": "KY", "KZT": "KZ", "LAK": "LA", "LBP": "LB", "LKR": "LK", "LRD": "LR", "LSL": "LS", "LTL": "LT", "LVL": "LV", "LYD": "LY", "MAD": "MA", "MDL": "MD", "MGA": "MG", "MKD": "MK", "MMK": "MM", "MNT": "MN", "MOP": "MO", "MRO": "MR", "MTL": "MT", "MUR": "MU", "MVR": "MV", "MWK": "MW", "MXN": "MX", "MYR": "MY", "MZN": "MZ", "NAD": "NA", "XPF": "NC", "NGN": "NG", "NIO": "NI", "NLG": "NL", "NOK": "NO", "NPR": "NP", "NZD": "NZ", "OMR": "OM", "PAB": "PA", "PEN": "PE", "PGK": "PG", "PHP": "PH", "PKR": "PK", "PLN": "PL", "PTE": "PT", "PYG": "PY", "QAR": "QA", "RON": "RO", "RSD": "RS", "RUB": "RU", "RWF": "RW", "SAR": "SA", "SBD": "SB", "SCR": "SC", "SDG": "SD", "SEK": "SE", "SGD": "SG", "SKK": "SK", "SLL": "SL", "SOS": "SO", "SRD": "SR", "STD": "ST", "SVC": "SV", "SYP": "SY", "SZL": "SZ", "THB": "TH", "TJS": "TJ", "TMT": "TM", "TND": "TN", "TOP": "TO", "TRY": "TR", "TTD": "TT", "TWD": "TW", "TZS": "TZ", "UAH": "UA", "UGX": "UG", "USD": "US", "UYU": "UY", "UZS": "UZ", "VEF": "VE", "VND": "VN", "VUV": "VU", "YER": "YE", "ZAR": "ZA", "ZMK": "ZM", "ZWD": "ZW"
};

const fromCurrency = document.querySelector("#from-currency");
const toCurrency = document.querySelector("#to-currency");
const getBtn = document.querySelector("#convert-btn");
const swapBtn = document.querySelector("#swap-currencies");
const amountInput = document.querySelector("#amount");
const resultText = document.querySelector("#result-text");
const rateText = document.querySelector("#exchange-rate-text");

for (let currency_code in country_list) {
    let selectedFrom = currency_code == "USD" ? "selected" : "";
    let selectedTo = currency_code == "PKR" ? "selected" : "";
    fromCurrency.insertAdjacentHTML("beforeend", `<option value="${currency_code}" ${selectedFrom}>${currency_code}</option>`);
    toCurrency.insertAdjacentHTML("beforeend", `<option value="${currency_code}" ${selectedTo}>${currency_code}</option>`);
}

fromCurrency.onchange = (e) => loadFlag(e.target);
toCurrency.onchange = (e) => loadFlag(e.target);

function loadFlag(element) {
    let code = element.value;
    let imgTag = element.parentElement.querySelector("img");
    imgTag.src = `https://flagsapi.com/${country_list[code]}/flat/64.png`;
}

swapBtn.onclick = () => {
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
};

async function getExchangeRate() {
    let val = amountInput.value || 1;
    rateText.innerText = "Getting rate...";
    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency.value}`);
        const data = await response.json();
        let rate = data.rates[toCurrency.value];
        rateText.innerText = `1 ${fromCurrency.value} = ${rate} ${toCurrency.value}`;
        resultText.innerText = `${(val * rate).toFixed(2)} ${toCurrency.value}`;
    } catch {
        rateText.innerText = "Error fetching rate";
    }
}

getBtn.onclick = getExchangeRate;
window.onload = getExchangeRate;
