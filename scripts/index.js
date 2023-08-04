/* 
const currencies = ['USD', 'EUR', 'CNH', 'JPY', 'INR', 'MXN'];

async function getExchange() {
  let obj = {}

  currencies.forEach(async item => {
    //console.log(item)

    const response = await fetch(`https://currency-exchange.p.rapidapi.com/exchange?to=RUB&from=${item}&q=1.0`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "5f91ee47e9mshc8436068fd8f0a7p107f97jsn34d66fb784a5",
        "x-rapidapi-host": "currency-exchange.p.rapidapi.com"
      }
    })
    const value = await response.json();
    //console.log(value)
    obj[item] = value.toFixed(2)
  })
  
  return obj
}


showCurrencies()
setInterval(showCurrencies, 10000);


async function showCurrencies() {
  let obj = await getExchange()
  
  console.log('f', obj)

  let exchangeRateItems = document.querySelectorAll('.exchangeRate-item')

  exchangeRateItems.forEach(item => {

    let paragraphs = item.querySelectorAll('p')
    let title = paragraphs[0].textContent.slice(0,3)
 // console.log(obj.EUR)
    let value = paragraphs[1]
    value.textContent = obj[title]
    console.log(title, value)
  })
} */

const currencies = ['USD', 'CNH', 'INR', 'EUR', 'JPY', 'MXN'];

async function getExchange() {
  Promise.all(currencies.map(async( item )=> {
    let response = await fetch(`https://currency-exchange.p.rapidapi.com/exchange?to=RUB&from=${item}&q=1.0`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "5f91ee47e9mshc8436068fd8f0a7p107f97jsn34d66fb784a5",
        "x-rapidapi-host": "currency-exchange.p.rapidapi.com"
      }
    })
    const value = await response.json();
    return (value*Math.random()).toFixed(2);
  })).then(values => {
    showCurrencies(values);
  });
}


getExchange()
setInterval(getExchange, 60000);


function showCurrencies(arr) {
  console.log('f', arr)

  let exchangeRateItems = document.querySelectorAll('.exchangeRate-item');
  
  arr.forEach((item, index) => {
    let elem = exchangeRateItems[index];
     
    let paragraphs = elem.querySelectorAll('p');
    let value = paragraphs[1];
    value.textContent = item;
  })  
}

function my() {
  let key = 'af2516f1c3454c5e98c984f39355252f'
  let country = 'us'
  let category = 'business'
  fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${key})`, {
      "method": "GET"
    })

    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
}

my()