document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".navbar .menu");
    const menuLinks = document.querySelectorAll(".menu-link");

    // Открытие/закрытие меню
    menuToggle.addEventListener("click", function() {
        menu.classList.toggle("active");
    });

    // Закрытие меню при переходе по ссылке
    menuLinks.forEach(link => {
        link.addEventListener("click", function() {
            menu.classList.remove("active");
        });
    });

    // Плавный скролл к секциям
    menuLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault(); // Отменяем стандартное поведение ссылки
            const targetId = this.getAttribute("href"); // Получаем ID целевой секции
            const targetSection = document.querySelector(targetId); // Находим секцию

            if (targetSection) {
                // Плавный скролл к секции
                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                // Закрываем меню после перехода
                menu.classList.remove("active");
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const teamMembers = document.querySelectorAll('.team-member');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 300); // Задержка для каждого блока
            }
        });
    }, {
        threshold: 0.1
    });

    teamMembers.forEach(member => {
        observer.observe(member);
    });

    // Раскрытие блоков на мобильных устройствах
    const expandButtons = document.querySelectorAll('.expand-button');
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const memberInfo = this.parentElement;
            memberInfo.classList.toggle('expanded');
        });
    });

    const memberInfos = document.querySelectorAll('.member-info');
    memberInfos.forEach(info => {
        info.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                this.classList.toggle('expanded');
            }
        });
    });
});