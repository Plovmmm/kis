// Получаем все слайды и устанавливаем переменные
const slides = Array.from(document.querySelectorAll('.slide'));
let isScrolling = false;
let currentIndex = 0; // Текущий индекс активного слайда

const slider = document.querySelector('.slider');
const sliderWrapper = document.querySelector('.slider-wrapper');

// Устанавливаем размеры слайдера и обертки
slider.style.width = '100%';
slider.style.height = '600px'; // Уменьшаем высоту для лучшего визуального восприятия
sliderWrapper.style.position = 'relative';
sliderWrapper.style.height = '100%';

// Задаем размеры карточек слайдов
slides.forEach((slide, index) => {
  const card = slide.querySelector('.slide-card');
  card.style.width = '80%';
  card.style.maxWidth = '600px';
  card.style.height = '300px';
  card.style.position = 'absolute'; // Позиционируем карточки абсолютно
  card.style.top = '50%'; // Центрируем по вертикали
  card.style.left = '50%'; // Центрируем по горизонтали
  card.style.transform = `translate(-50%, -50%) translateY(${index * 50}px) translateX(${index * 60}px)`; // Начальное положение карточек
  card.style.transition = 'transform 0.8s ease, opacity 0.8s ease'; // Плавные переходы
  card.style.zIndex = slides.length - index; // Устанавливаем z-index для правильного порядка
  card.style.opacity = index === 0 ? 1 : 0.8; // Убираем прозрачность для всех слайдов
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
    const card = slide.querySelector('.slide-card');
    card.style.zIndex = slides.length - Math.abs(index - currentIndex); // Обновляем z-index
    card.style.opacity = 1 - Math.abs(index - currentIndex) * 0.2; // Убираем прозрачность
    card.style.transform = `translate(-50%, -50%) translateY(${(index - currentIndex) * 50}px) translateX(${(index - currentIndex) * 60}px)`; // Плавное перемещение
  });

  // Ждем завершения анимации перед разблокировкой
  await new Promise(resolve => setTimeout(resolve, 400)); // Уменьшаем время анимации
  isScrolling = false;
}

// Проверка, находится ли слайдер в видимой зоне
function isSliderInViewport() {
  const sliderRect = slider.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  return sliderRect.top <= windowHeight * 0.8 && sliderRect.bottom >= windowHeight * 0.2; // Уточняем зону видимости
}

// Обработка события скролла мыши
window.addEventListener('wheel', (e) => {
  if (isSliderInViewport()) {
    e.preventDefault(); // Запрещаем стандартный скролл
    if (e.deltaY > 0) {
      reorderSlides('next');
    } else if (e.deltaY < 0) {
      reorderSlides('prev');
    }
  }
});

// Обработка свайпов для мобильных устройств
let touchStartY = 0;
window.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
});

window.addEventListener('touchend', (e) => {
  const touchEndY = e.changedTouches[0].clientY;
  const swipeDistance = touchStartY - touchEndY;

  if (isSliderInViewport()) {
    if (swipeDistance > 40) {
      reorderSlides('next');
    } else if (swipeDistance < -40) {
      reorderSlides('prev');
    }
  }
});

// Инициализация слайдов при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  slides.forEach((slide, index) => {
    const card = slide.querySelector('.slide-card');
    card.style.zIndex = slides.length - index;
    card.style.opacity = index === 0 ? 1 : 1; // Убираем прозрачность
    card.style.transform = `translate(-50%, -50%) translateY(${index * 60}px) translateX(${index * 40}px)`; // Начальное положение
  });
});