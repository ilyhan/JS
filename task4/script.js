
// возникли проблемы с получением ключа на https://rapidapi.com/, поэтому использовал другую апи https://manage.exchangeratesapi.io/

const selectedCurrency = ['USD', 'EUR', 'CAD', 'CNY', 'CHF', 'SGD'];
const baseURl = "https://api.exchangeratesapi.io/v1";
const accessKey = "9a4cc928c16f005b568b70a288de57ed";

async function getCurrencyRate() {
    try {
        const res = await axios.get(`${baseURl}/latest?access_key=${accessKey}`);
        return res.data;
    } catch (e) {
        alert("ошибка загрузки данных");
    }
}

function getFullDate(timestamp) {
    const date = new Date(timestamp * 1000); //в апи timestamp в секундах

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${day}.${month}.${year}`;
}

async function updateCurses() {
    const data = await getCurrencyRate();

    if (data) {
        // В данной апи не работает смена базовой валюты на рубли, поэтому конвертирую в коде
        const currencyRub = data.rates['RUB'];
        const currencyList = document.getElementById('currency-list');

        selectedCurrency.forEach(currency => {
            let item = document.querySelector(`.currency-rates__item[data-currency="${currency}"]`);

            if (!item) {
                item = document.createElement('li');
                item.classList.add('currency-rates__item');
                item.setAttribute('data-currency', currency);
                currencyList.appendChild(item);
            }

            item.innerHTML = `
                <span class="currency-rates__currency">${currency}:</span>
                <span class="currency-rates__course">${(currencyRub / data.rates[currency]).toFixed(2)}</span>
            `;
        });

        const timeUpdate = document.getElementById('update-time');
        const newTime = getFullDate(data.timestamp);

        timeUpdate.innerText = `Update every 15 minutes, MSC ${newTime}`;
    }
}

updateCurses();
setInterval(updateCurses, 15 * 60 * 1000);