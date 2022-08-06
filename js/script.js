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
    const deadLine = '2022-08-30';
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
    // const getResource = async (url) => {
    //     const res = await fetch(url);
    //     if (!res.ok) {
    //         // объект ошибки
    //         // обрабатываем ошибку - если запрос не смог получить ответ от сервера
    //         throw new Error(`Could not fetch ${url}, status ${res.status}`);
    //     }
    //     return await res.json();
    // };
    // вызов функции для того, чтобы получить данные карточек с сервера
    // getResource('http://localhost:3000/menu')
    // // обрабатываем массивы с данными карточек
    // .then(data => {
    //     // используем деструктуризацию объекта
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         // конструктор создается столько раз, сколько объектов в массиве
    //         // кусочки объекта передаются во внутрь класса, который запишутся
    //         new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //     });
    // });

    // Отправка запроса с помощью axios
    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
    // Forms
    const forms = document.querySelectorAll('form');
    const answersUser = {
        // Чтобы была картинка вместо загрузки прописываем путь
        loading: 'img/form/spinner.svg',
        success: 'Мы скоро с Вами свяжемся!',
        failure: 'Что-то пошло не так!'
    };
    forms.forEach((item) => {
        bindPostData(item);
    });
    // функция postData посылает запрос на сервер, получает ответ и трансформирует его в JSON
    // при вызове функции - передаем URL, который передается в Fetch
    // data - данные, которые будут поститься в функции
    // async сообщает функции, что внутри будет асинхронный код
    const postData = async (url, data) => {
        // res - promise
        // создается запрос, который уходит на сервер и записывается в res
        // await стоит перед операциями, которые необходимо дождаться, прежде чем выполнять код дальше
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
        // возвращаем fetch в формате JSON
        return await res.json();
    };

    function bindPostData(form) {
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

            // преобразование formData в JSON
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(answersUser.success);
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(answersUser.failure);
                })
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

    // Slider
    const sliderPrev = document.querySelector('.offer__slider-prev'),
          sliderNext = document.querySelector('.offer__slider-next'),
          slides = document.querySelectorAll('.offer__slide'),
        //   переменные для общего количества слайдов и текущего слайда
          total = document.querySelector('#total'),
          current = document.querySelector('#current');
    let slideIndex = 1;
    // вызов функции с вызовом начального значения
    showSlides(slideIndex);
    // общее количество слайдов. Не помещаем в функцию, чтобы при каждом ее вызове количество не показывалось заново
    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }
    // Функция для показа слайдеров. Принимает индекс слайда.
    function showSlides(n) {
        // если номер слайдера уходит за границу - возвращаемся к первому или последнему элементу
        if (n > slides.length) {
            slideIndex = 1;
        } 

        if (n < 1) {
            slideIndex = slides.length;
        }
        // скрываем все слайды
        slides.forEach(item => item.classList.add('hide'));
        // показываем только первый слайд на странице
        // в зависимости от индекса функция добавляет классы к разным слайдам в псевдомассиве.
        slides[slideIndex - 1].classList.add('show');
        slides[slideIndex - 1].classList.remove('hide');
        // показываем текущий номер слайда
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }
    // функция, которая добавляет значение к слайдеру
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }
    showSlides(1);
    // при нажатии на стрелочку функция добавляет или отнимает значение к индексу слайда
    sliderNext.addEventListener('click', () => {
        plusSlides(1);
    });

    sliderPrev.addEventListener('click', () => {
        plusSlides(-1);
    });
});
// npx json-server --watch db.json --port 3000