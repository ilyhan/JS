const btnLeft = document.getElementById('btn_left');
const btnRight = document.getElementById('btn_right');
const cardsContainer = document.getElementById('container');
const slider = document.getElementById('slider');

let currentScroll = 0;
const  scrollAmount = 360;
const sliderWidth = slider.offsetWidth;
let maxScroll;

async function getCards(path) {
  try {
    const response = await axios.get(path);
    return data = response.data.results;
  } catch {
    alert('Ошибка загрузки данных');
  }
}

async function loadCards() {
  //в процессе работы с jsonplaceholder столкнулся с проблемой: долгая загрузка и в результате ошибка
  //в связи с этим нашел другую апи
  const data = await getCards("https://api.unsplash.com/search/photos/?page=2&query=wallpaper&client_id=xz5MUitr6CDevL5gRiAEXSHVeD14I4XYpSLvv6zTd2s");

  if (data) {
    const templateCard = document.getElementById('card');

    data.slice(0, 30).forEach(item => {
      const clonedCard = templateCard.cloneNode(true);

      const img = clonedCard.querySelector('.card__image');
      img.src = item.urls.full;
      img.alt = item.alt_description;

      const p = clonedCard.querySelector('.card__content');
      p.textContent = item.alt_description;

      clonedCard.classList.remove('unvisible');

      cardsContainer.appendChild(clonedCard);
    });

    const addedCardsWidth = cardsContainer.offsetWidth;
    maxScroll = addedCardsWidth - sliderWidth;
  }
}

loadCards();

function updateButton() {
  const isLeft = currentScroll == 0;
  const isRight = currentScroll == -maxScroll;

  btnLeft.disabled = isLeft;
  btnRight.disabled = isRight;
};

function updateScrollPosition() {
  cardsContainer.style.translate = `${currentScroll}px`;
  updateButton();
}

btnLeft.onclick = () => {
  currentScroll = Math.min(currentScroll + scrollAmount, 0);
  updateScrollPosition();
}

btnRight.onclick = () => {
  currentScroll = Math.max(currentScroll - scrollAmount, -maxScroll);
  updateScrollPosition();
}

//свайп для мобильных устройств
let touchStart;

cardsContainer.ontouchstart = (e) => {
  touchStart = e.targetTouches[0].clientX;
}

cardsContainer.ontouchend = (e) => {
  const scroll = touchStart - e.changedTouches[0].clientX;

  if (scroll > 70) {
    currentScroll = Math.max(currentScroll - scrollAmount, -maxScroll);
    updateScrollPosition();
  }
  if (scroll < -70) {
    currentScroll = Math.min(currentScroll + scrollAmount, 0);
    updateScrollPosition();
  }
}
