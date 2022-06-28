window.addEventListener("DOMContentLoaded", () => {
    // Tabs
    const tabs = document.querySelectorAll(".tabheader__item"),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');
    function hideTabsContent() {
        // скрываем табы со страницы
        tabsContent.forEach((item) => {
            // добавляем классы, которые скрывают и показывают эелемент
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        // удаляем класс активности у каждого таба
        tabs.forEach((item) => {
            item.classList.remove('tabheader__item_active');
        });
    }
    function showTabsContent(i = 0) {
        // показываем первый таб на странице. также назначем ему класс анимации
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        // добавляем первому табу класс активности
        tabs[i].classList.add('tabheader__item_active');
    }
    // назначаем обработчик событий на родителя
    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        // проверяем тыкнул ли пользователь в таб
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                // проверяем совпадает ли эелемент на который нажал пользователь с эелементом , который мы перебираем
                if (target == item) {
                    hideTabsContent();
                    showTabsContent(i);
                }
            });
        }
    });
    hideTabsContent();
    showTabsContent();
    // Timer
    const deadLine = '2022-06-30';
// функция получает разницу между временем конца таймера и временем на ПК пользователя.
// Затем преобразует миллисекунды в дни, часы, минуты, секунды.
// На выходе получаем объект, который содержит в себе время до конца таймера = total, и т.д.
    function getTimeRemaining(endTime) {
        const t = Date.parse(endTime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60)) % 24),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }
});





