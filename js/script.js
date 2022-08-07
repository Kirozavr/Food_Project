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

    // Slider VAR 1

    let slideIndex = 1;
    let offset =0;

    const sliderPrev = document.querySelector('.offer__slider-prev'),
          sliderNext = document.querySelector('.offer__slider-next'),
          slides = document.querySelectorAll('.offer__slide'),
        //   переменные для общего количества слайдов и текущего слайда
          slider = document.querySelector('.offer__slider'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
        // Ширина блока
        // Метод getComputedStyle() возвращает объект, содержащий значения всех CSS-свойств элемента
        // из объекта нужно достать свойство с шириной
          width = window.getComputedStyle(slidesWrapper).width;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    function deletePX(str) {
        return +str.replace(/\D/g, '');
    }

    // задаем ширину обертки, чтобы поместить все слайды внутрь
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    // transition описывает скорость перехода объекта от одного значения к другому.
    slidesField.style.transition = '0.5s all';
    // скрыли все слайды, которые не помещаются в обертку, как кодовый замок
    slidesWrapper.style.overflow = 'hidden';
    // каждому слайду задаем фиксированную ширину
    slides.forEach(slide => slide.style.width = width);

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            // opacity устанавливает непрозрачность элемента
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    sliderNext.addEventListener('click', () => {
        // проверяем пролистали ли мы слайды до самого конца, чтобы вернуться в начало
        if (offset == (deletePX(width) * (slides.length - 1))) {
            offset = 0;
        } else {
            // при нажатии кнопки вперед добавляется ширина еще одного слайда
            // слайд смещается
            offset += deletePX(width);
        }
        // при нажатии на кнопку вперед необходимо сдвинуть слайд
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    sliderPrev.addEventListener('click', () => {
        // узнаем, что у нас первый слайд
        if (offset == 0) {
            // перемещаемся в самый конец
            // в переменную записываем последний слайд
            offset = deletePX(width) * (slides.length - 1);
        } else {
            // отнимаем ширину слайда, на которую смещаемся
            offset -= deletePX(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deletePX(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;
            
            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = 1;

        });
    });
});
// npx json-server --watch db.json --port 3000