let intro_text;
let active;
let isIntroTextHidden = false;

const color1 = "#d45f7f";
const color2 = "#d457ec";

function initialize() {
  intro_text = d3.selectAll(".intro-text");
  var Menu = (function() {
    var burger = document.querySelector('.burger');
    var menu = document.querySelector('.menu');
    var menuList = document.querySelector('.menu__list');
    var graphs = document.querySelector('.menu__graphs');
    var menuItems = document.querySelectorAll('.menu__item');

    active = false;

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

  let color_background = d3.select("#color-background");
  let gradient = color_background.append("defs")
  .append("linearGradient")
    .attr("id", "gradient")
    .attr("x1", "50%")
    .attr("y1", "0%")
    .attr("x2", "50%")
    .attr("y2", "100%")
    .attr("spreadMethod", "pad");

  gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", color1)
      .attr("stop-opacity", 1)
      .attr("id", "color1");

  gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", color2)
      .attr("stop-opacity", 1)
      .attr("id", "color2");

  color_background.append("rect")
      .attr("width", "100%")
      .attr("height", "100%")
      .style("fill", "url(#gradient)");
  color_background.transition().style("opacity", 1);

}

// on key hit, changes the layout slightly to fade out instructions
function updateLayout (new_key, is_key_down, held_keys) {
  if (!isIntroTextHidden && new_key && intro_text) {
    isIntroTextHidden = true;
    intro_text.transition().delay(500).duration(1000).style("opacity", 0);
  }
}

module.exports = {
  initialize,
  updateLayout,
  getMenuActive: () => active
}
