window.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tabheader__item"),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');
    
    function hideTabsContent() {
        // скрываем табы со страницы
        tabsContent.forEach((item) => {
            item.style.display = 'none';
        });
        // удаляем класс активности у каждого таба
        tabs.forEach((item) => {
            item.classList.remove('tabheader__item_active');
        });
    }
    hideTabsContent();
});

