document.addEventListener("DOMContentLoaded", () => {
    let header = document.getElementById('header');
    let burger = document.getElementById('burger')
    let headerMainLinks = document.querySelectorAll('.header__item');
    let headerBottomSide = document.querySelector(".header__bottom");
    let bottomNavs = document.querySelectorAll(".header__bottom nav");
    let headerMenu = document.querySelector('.header__menu');
    let headerHiddenMenu = document.querySelector('.header__hidden-menu');


    //Бургер меню
    burger.addEventListener("click", function () {
        document.querySelector("header").classList.toggle("open")
    })


    // Открытие меню разделов
    headerMainLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();

            headerMainLinks.forEach(function (link) {
                link.classList.remove('active');
            });

            link.classList.add('active');

            headerMainLinks.forEach(link => link.parentElement.classList.remove("active"));

            let index = link.getAttribute('data-index');

            bottomNavs.forEach(function (nav) {
                nav.style.display = "none";
                nav.style.opacity = "0";
            });

            let targetNav = document.querySelector(`[data-nav="${index}"]`);

            if (targetNav) {
                targetNav.style.display = "block";
                setTimeout(() => {
                    targetNav.style.opacity = "1";
                }, 100);
            }
        });
    });

    function updateHeaderStyles() {
        if (headerMainLinks.length > 0 && window.innerWidth > 1024) {
            headerMainLinks[0].click();
            headerMainLinks[0].classList.add('active');
        }

        if (window.innerWidth < 577) {
            headerBottomSide.style.top = `${headerHiddenMenu.offsetHeight + header.offsetHeight - 16}px`;
        } else if (window.innerWidth < 769) {
            headerBottomSide.style.top = `${headerHiddenMenu.offsetHeight + header.offsetHeight}px`;
        } else if (window.innerWidth < 925) {
            headerBottomSide.style.top = `${headerMenu.offsetHeight + header.offsetHeight}px`;
        }
    }

    updateHeaderStyles();

    window.addEventListener('resize', updateHeaderStyles);
});