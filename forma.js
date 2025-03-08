// Функция для открытия формы
function openForm() {
    document.getElementById('formOverlay').style.display = 'flex';
}

// Функция для закрытия формы
function closeForm() {
    document.getElementById('formOverlay').style.display = 'none';
}

// Функция для отправки данных в Telegram
async function sendToTelegram(data) {
    const token = '7738593320:AAGwhw_Y9kjaNL_5UglEPdlT6atKPxA2NvQ'; // Ваш токен
    const chatIds = ['1323961884', '1997508478']; // Массив с chat_id

    const message = `Новая заявка:\nИмя: ${data.name}\nТелефон: ${data.phone}\nМаркетплейс: ${data.marketplace}`;

    // Отправляем сообщение каждому пользователю
    for (const chatId of chatIds) {
        const url = `https://api.telegram.org/bot${token}/sendMessage`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                }),
            });

            const result = await response.json(); // Парсим ответ от сервера
            console.log('Ответ от сервера для chat_id', chatId, ':', result);

            if (!result.ok) {
                console.error('Ошибка для chat_id', chatId, ':', result);
            }
        } catch (error) {
            console.error('Ошибка для chat_id', chatId, ':', error);
        }
    }

    alert('Ваша заявка успешно отправлена!');
    closeForm();
}

// Обработка отправки формы
document.getElementById('applicationForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const marketplace = document.getElementById('marketplace').value;

    const formData = {
        name,
        phone,
        marketplace,
    };

    sendToTelegram(formData);
});



// Функция для отправки данных в Telegram
async function sendToTelegram(data) {
    const token = '7738593320:AAGwhw_Y9kjaNL_5UglEPdlT6atKPxA2NvQ'; // Ваш токен
    const chatIds = ['1323961884', '1997508478']; // Массив с chat_id

    const message = `Новая заявка:\nИмя: ${data.name}\nТелефон: ${data.phone}\nМаркетплейс: ${data.marketplace}`;

    // Отправляем сообщение каждому пользователю
    for (const chatId of chatIds) {
        const url = `https://api.telegram.org/bot${token}/sendMessage`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                }),
            });

            const result = await response.json(); // Парсим ответ от сервера
            console.log('Ответ от сервера для chat_id', chatId, ':', result);

            if (!result.ok) {
                console.error('Ошибка для chat_id', chatId, ':', result);
            }
        } catch (error) {
            console.error('Ошибка для chat_id', chatId, ':', error);
        }
    }

    alert('Ваша заявка успешно отправлена!');
}

// Обработка отправки формы в разделе контактов
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName').value;
    const phone = document.getElementById('contactPhone').value;
    const marketplace = document.getElementById('contactMarketplace').value;

    const formData = {
        name,
        phone,
        marketplace,
    };

    sendToTelegram(formData);
});