//import './styles/scss/all.scss'

import "./styles/scss/index.scss";
import "./styles/scss/header.scss";
import "./styles/scss/main.scss";
import "./styles/scss/chooseDesign.scss";
import "./styles/scss/features.scss";
import "./styles/scss/exchangeRate.scss";
import "./styles/scss/map.scss";
import "./styles/scss/news.scss";
import "./styles/scss/support.scss";
import "./styles/scss/footer.scss";


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
    return value.toFixed(2);
  })).then(values => {
    showCurrencies(values);
  });
}


function setExchange(arr) {
  let parent = document.querySelector('.exchangeRate-currency');
  currencies.forEach((currency, index) => {
    let div = document.createElement('div');
    div.classList.add('exchangeRate-item');

    let title = document.createElement('p');
    title.classList.add('exchangeRate__text-bold');

    let span = document.createElement('span');
    span.textContent = currency + ':';

    title.appendChild(span);

    let text = document.createElement('p');
    text.classList.add('exchangeRate__text-bold');
    text.textContent = arr[index];

    div.appendChild(title);
    div.appendChild(text);

    parent.appendChild(div);
  })
}


getExchange();
setInterval(getExchange, 60000);


function showCurrencies(arr) {
  console.log('f', arr);

  let exchangeRateItems = document.querySelectorAll('.exchangeRate-item');

  if (exchangeRateItems.length === 0) {
    setExchange(arr);
    return;
  }
  
  arr.forEach((item, index) => {
    let elem = exchangeRateItems[index];
     
    let paragraphs = elem.querySelectorAll('p');
    let value = paragraphs[1];
    value.textContent = item;
  })  
}

function getNews() {
  fetch(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=af2516f1c3454c5e98c984f39355252f`, {
      "method": "GET"
    })

    .then(res => res.json())
    .then(data => {
      console.log(data);
      showNews(data.articles);
      setSlider();
    })
    .catch(err => console.log(err));
}

getNews();

function setSlider() {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 'auto',
    spaceBetween: 80,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    
    keyboard: true,
  });
}

function showNews(obj) {
  let news = document.querySelector('.slider');

  obj.forEach(item => {
    let element = document.createElement('div');
    element.classList.add('slider__item');
    element.classList.add('swiper-slide');

    let div = document.createElement('div');
    let img = document.createElement('img');
    img.src = item.urlToImage !== null ? item.urlToImage : '';
    let imgLink = document.createElement('a');
    imgLink.href = item.url;
    imgLink.target = 'blank';
    imgLink.appendChild(img);
    div.appendChild(imgLink);

    let title = document.createElement('p');
    title.classList.add('slider__title');
    title.textContent = item.title !== null ? item.title : '';
    let titleLink = document.createElement('a');
    titleLink.href = item.url;
    titleLink.target = 'blank';
    titleLink.appendChild(title);

    let text = document.createElement('p');
    text.classList.add('slider__text');
    text.innerHTML = item.description !== null ? item.description : '';
    let textLink = document.createElement('a');
    textLink.href = item.url;
    textLink.target = 'blank';
    textLink.appendChild(text);

    element.appendChild(div);
    element.appendChild(titleLink);
    element.appendChild(textLink);

    news.appendChild(element);
  })
}