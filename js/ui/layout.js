function initialize() {
  var Menu = (function() {
    var burger = document.querySelector('.burger');
    var menu = document.querySelector('.menu');
    var menuList = document.querySelector('.menu__list');
    var graphs = document.querySelector('.menu__graphs');
    var menuItems = document.querySelectorAll('.menu__item');

    console.log(burger);

    var active = false;

    var toggleMenu = function() {
      if (!active) {
        menu.classList.add('menu--active');
        menuList.classList.add('menu__list--active');
        graphs.classList.add('menu__graphs--active');
        burger.classList.add('burger--close');
        for (var i = 0, ii = menuItems.length; i < ii; i++) {
          menuItems[i].classList.add('menu__item--active');
        }

        active = true;
      } else {
        menu.classList.remove('menu--active');
        menuList.classList.remove('menu__list--active');
        graphs.classList.remove('menu__graphs--active');
        burger.classList.remove('burger--close');
        for (var i = 0, ii = menuItems.length; i < ii; i++) {
          menuItems[i].classList.remove('menu__item--active');
        }

        active = false;
      }
    };

    var bindActions = function() {
      burger.addEventListener('click', toggleMenu, false);
    };

    var init = function() {
      bindActions();
    };

    return {
      init: init
    };

  }());

  Menu.init();
}

module.exports = {
  initialize
}
