// Получаем все слайды и устанавливаем переменные
const slides = Array.from(document.querySelectorAll('.slide'));
let isScrolling = false;
let currentIndex = 0; // Текущий индекс активного слайда

const slider = document.querySelector('.slider');
const sliderWrapper = document.querySelector('.slider-wrapper');

// Устанавливаем размеры слайдера и обертки
slider.style.width = '80%'; 
slider.style.height = window.innerWidth <= 768 ? '320px' : window.innerWidth >= 1200 ? '640px' : '480px'; // Уменьшено на 20%
sliderWrapper.style.position = 'relative';
sliderWrapper.style.height = '90%';

// Функция для обновления размеров и позиционирования слайдов
function updateSlides() {
  slides.forEach((slide, index) => {
    const image = slide.querySelector('.slide-image');
    image.style.maxWidth = window.innerWidth <= 768 ? '90%' : window.innerWidth >= 1200 ? '80%' : '70%'; // Адаптируем ширину изображения
    image.style.maxHeight = window.innerWidth <= 768 ? '90%' : window.innerWidth >= 1200 ? '80%' : '70%'; // Адаптируем высоту изображения
    image.style.position = 'absolute';
    image.style.top = '50%';
    image.style.left = '50%';
    image.style.transform = `translate(-50%, -50%) translateY(${index * 24}px) translateX(${index * 32}px)`; // Уменьшено на 20%
    image.style.transition = 'transform 0.9s ease';
    image.style.zIndex = slides.length - index;
    image.style.opacity = 1; /* Убираем прозрачность */
  });
}

// Инициализация слайдов при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  updateSlides();
});

// Функция для перестановки слайдов
async function reorderSlides(direction) {
  if (isScrolling) return; // Блокируем скролл во время анимации
  isScrolling = true;

  // Логика перелистывания вперед или назад
  if (direction === 'next' && currentIndex < slides.length - 1) {
    currentIndex++;
  } else if (direction === 'prev' && currentIndex > 0) {
    currentIndex--;
  } else {
    isScrolling = false; // Если достигнут конец, снимаем блокировку
    return;
  }

  // Обновляем стили слайдов с анимацией
  slides.forEach((slide, index) => {
    const image = slide.querySelector('.slide-image');
    image.style.zIndex = slides.length - Math.abs(index - currentIndex); // Обновляем z-index
    image.style.transform = `translate(-50%, -50%) translateY(${(index - currentIndex) * 24}px) translateX(${(index - currentIndex) * 32}px)`; // Уменьшено на 20%
  });

  // Ждем завершения анимации перед разблокировкой
  await new Promise(resolve => setTimeout(resolve, 300)); // Уменьшаем время анимации для мобильных устройств
  isScrolling = false;
}

// Проверка, находится ли слайдер в видимой зоне
function isSliderInViewport() {
  const sliderRect = slider.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  return sliderRect.top <= windowHeight * 0.9 && sliderRect.bottom >= windowHeight * 0.2; // Уточняем зону видимости
}

// Обработка события скролла мыши (только для десктопов)
window.addEventListener('wheel', (e) => {
  if (isSliderInViewport() && window.innerWidth > 768) { // Только для экранов шире 768px
    e.preventDefault(); // Запрещаем стандартный скролл
    if (e.deltaY > 0) {
      reorderSlides('next');
    } else if (e.deltaY < 0) {
      reorderSlides('prev');
    }
  }
});

// Обработка свайпов для мобильных устройств
let touchStartX = 0;
window.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
});

window.addEventListener('touchend', (e) => {
  const touchEndX = e.changedTouches[0].clientX;
  const swipeDistanceX = touchStartX - touchEndX;

  if (isSliderInViewport()) {
    if (swipeDistanceX > 40) {
      reorderSlides('prev');
    } else if (swipeDistanceX < -40) {
      reorderSlides('next');
    }
  }
});

// Переключение слайдов по клику на мобильных устройствах
sliderWrapper.addEventListener('click', (e) => {
  if (window.innerWidth <= 768) { // Только для экранов уже 768px
    const rect = sliderWrapper.getBoundingClientRect();
    const clickX = e.clientX - rect.left; // Позиция клика относительно слайдера
    if (clickX > rect.width / 2) {
      reorderSlides('next'); // Клик справа — следующий слайд
    } else {
      reorderSlides('prev'); // Клик слева — предыдущий слайд
    }
  }
});

// Обновление размеров слайдов при изменении размера окна
window.addEventListener('resize', () => {
  slider.style.width = '90%'; // Уменьшено на 5% (было 95%)
  slider.style.height = window.innerWidth <= 768 ? '320px' : window.innerWidth >= 1200 ? '640px' : '480px'; // Уменьшено на 20%
  updateSlides();
});