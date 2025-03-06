let currentCarouselIndex = 0;
const carouselItems = document.querySelectorAll('.carousel-item');

function updateCarousel() {
    carouselItems.forEach((item, index) => {
        item.classList.remove('active', 'prev', 'next');

        if (index === currentCarouselIndex) {
            item.classList.add('active');
        } else if (index === (currentCarouselIndex - 1 + carouselItems.length) % carouselItems.length) {
            item.classList.add('prev');
        } else if (index === (currentCarouselIndex + 1) % carouselItems.length) {
            item.classList.add('next');
        }
    });
}

function moveCarousel(direction) {
    currentCarouselIndex = (currentCarouselIndex + direction + carouselItems.length) % carouselItems.length;
    updateCarousel();
}

// Инициализация карусели
document.addEventListener('DOMContentLoaded', () => {
    updateCarousel();
});

// Переключение по клику на слайды
carouselItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        if (item.classList.contains('prev')) {
            moveCarousel(-1); // Переключение на предыдущий слайд
        } else if (item.classList.contains('next')) {
            moveCarousel(1); // Переключение на следующий слайд
        }
    });
});