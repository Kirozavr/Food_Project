window.addEventListener("DOMContentLoaded", () => {
    // Tabs
    const tabs = document.querySelectorAll(".tabheader__item"),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabsContent() {
        // скрываем табы со страницы
        tabsContent.forEach((item) => {
            // добавляем классы, которые скрывают и показывают эллемент
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
    const deadLine = '2022-07-30';
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

    function setClock(selector, endtime) {
        // получаем эелементы со страницы
        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds"),
            //   запускает функцию updateClock каждую секунду
            timeInterval = setInterval(updateClock, 1000);
        // вызываем функцию здесь, чтобы не ждать секунду 
        updateClock();
        // функция для подстановки нуля, если число однозначное
        function getZero(num) {
            if (num >= 0 && num < 10) {
                return `0${num}`;
            } else {
                return num;
            }
        }
        // обновляем таймер
        function updateClock() {
            // вызываем функцию, чтобы получить объект из функции getTimeRemaining
            const t = getTimeRemaining(deadLine);
            // из объекта вставляем лементы в HTML
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            // останавливем таймер, если время вышло
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock('.timer', deadLine);
    // Modal
    const btnModal = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    }

    function showModal(button) {
        button.forEach((item) => {
            item.addEventListener('click', () => {
                openModal();
                clearInterval(modalTimerId);
            });
        });
    }

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function hideModal(modalWindow) {
        modalWindow.addEventListener('click', (e) => {
            if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
                closeModal();
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Escape') {
                closeModal();
            }
        });
    }
    const modalTimerId = setTimeout(openModal, 6000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener("scroll", showModalByScroll);
        }
    }
    window.addEventListener("scroll", showModalByScroll);
    showModal(btnModal);
    hideModal(modal);
    // Используем классы для карточек
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            // создаем родительский элемент, в который будем добавлять нашу верстку
            this.parentSelector = document.querySelector(parentSelector);
            this.classes = classes;
        }
        render() {
            // вызовом метода рендер создаем структуру, которая будет помещаться в определенный див
            const element = document.createElement('div');
            // задаем класс по умолчанию, если в аргумент classes не передавался
            if (this.classes.length === 0) {
                // передается массив, проверяем пустой ли он
                this.classes = 'menu__item';
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML =
                `<img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>
            </div>`;
            // новый созданный элемент помещаем внутрь родительского эелемента, который будет передаваться
            this.parentSelector.append(element);
        }
    }
    // создаем новые менюшки
    new MenuCard(
            "img/tabs/vegy.jpg",
            "vegy",
            'Меню "Фитнес"',
            'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
            600,
            ".menu .container")
        .render();

    new MenuCard(
            "img/tabs/elite.jpg",
            "elite",
            'Меню “Премиум”',
            'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан! Будет безумно вкусно!',
            1000,
            ".menu .container")
        .render();

    new MenuCard(
            "img/tabs/post.jpg",
            "post",
            'Меню "Постное"',
            'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
            860,
            ".menu .container")
        .render();
    // Forms
    const forms = document.querySelectorAll('form');
    const answersUser = {
        // Чтобы была картинка вместо загрузки прописываем путь
        loading: 'img/form/spinner.svg',
        success: 'Мы скоро с Вами свяжемся!',
        failure: 'Что-то пошло не так!'
    };
    forms.forEach((item) => {
        formData(item);
    });

    function formData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const statusMessage = document.createElement('img');
            statusMessage.src = answersUser.loading;
            // устанавливаем стиль для изображения
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            `;
            // Добавляем спиннер внизу формы, чтобы ее не плющило
            form.insertAdjacentElement('afterend', statusMessage);
            // Реализация скрипта отправки данныз через fetch()
            const formData = new FormData(form);
            const object = {};
            formData.forEach((value, key) => {
                object[key] = value;
            });
            fetch('server.php', {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(object)
                })
                // основное действие
                .then(data => {
                    console.log(data);
                    showThanksModal(answersUser.success);
                    statusMessage.remove();
                })
                // действие на случай ошибки
                .catch(() => {
                    showThanksModal(answersUser.failure);
                })
                // действие, которое выполняется всегда - очистка формы
                .finally(() => {
                    form.reset();
                });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        // Добавляем класс, чтобы скрыть первое модальное окно
        prevModalDialog.classList.add('hide');
        openModal();
        // Создание нового окна с ответом
        const thanksModal = document.createElement('div');
        // Одно модальное окно заменяем другим. Добавляем класс модального окна
        thanksModal.classList.add('modal__dialog');
        // Создание верстки в новом окне
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close">×</div>
            <div class="modal__title">${message}</div>
        </div>
        `;
        // Помещаем новое модальное на страницу
        document.querySelector('.modal').append(thanksModal);
        // Удаление нового модального окна и вызов старого
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }
    fetch('http://localhost:3000/menu')
    .then(data => data.json())
    .then(res => console.log(res));
});
