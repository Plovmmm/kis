// Получаем все слайды и устанавливаем переменные
const slides = Array.from(document.querySelectorAll('.slide'));
let isScrolling = false;
let currentIndex = 0; // Текущий индекс активного слайда

const slider = document.querySelector('.slider');
slider.style.width = '100%';
slider.style.maxWidth = '100%';
slider.style.height = '1000px';

// Задаем размеры карточек слайдов
slides.forEach(slide => {
  const card = slide.querySelector('.slide-card');
  card.style.width = '80%';
  card.style.maxWidth = '500px';
  card.style.height = '300px';
});

// Перестановка слайдов при скролле
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
    card.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
    card.style.zIndex = slides.length - Math.abs(index - currentIndex);
    card.style.opacity = 1 - Math.abs(index - currentIndex) * 0.2;
    card.style.transform = `translateY(${(index - currentIndex) * 60}px) translateX(${(index - currentIndex) * 40}px)`;
    
    
  });

  // Ждем завершения анимации перед разблокировкой
  await new Promise(resolve => setTimeout(resolve, 800));
  isScrolling = false;

  // Если достигнут конец или начало, разблокируем скролл страницы
  if (currentIndex === 0 || currentIndex === slides.length - 1) {
    document.body.style.overflow = 'auto';
  }
}

// Проверка, находится ли слайдер в видимой зоне (на 20% выше центра экрана)
function isSliderInViewport() {
  const sliderRect = slider.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  return sliderRect.top <= windowHeight * 0.1 && sliderRect.bottom >= windowHeight * 0.7;
}

// Обработка события скролла мыши
window.addEventListener('wheel', (e) => {
  if (isSliderInViewport()) {
    e.preventDefault(); // Запрещаем стандартный скролл
    document.body.style.overflow = 'hidden';
    if (e.deltaY > 0) {
      reorderSlides('next');
    } else if (e.deltaY < 0) {
      reorderSlides('prev');
    }
  }
});

// Блокировка и разблокировка скролла всей страницы
window.addEventListener('scroll', () => {
  if (isSliderInViewport() && currentIndex !== slides.length - 1 && currentIndex !== 0) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
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
    if (swipeDistance > 30) {
      reorderSlides('next');
    } else if (swipeDistance < -30) {
      reorderSlides('prev');
    }
  }
});

// Инициализация слайдов при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  slides.forEach((slide, index) => {
    const card = slide.querySelector('.slide-card');
    card.style.zIndex = slides.length - index;
    card.style.opacity = 1 - index * 0.2;
    card.style.transform = `translateY(${index * 60}px) translateX(${index * 40}px)`;

    
  });
});
