let initialFontSizes = new Map();

function getInitialFontSizes() {
  const allElements = document.querySelectorAll('*');
  allElements.forEach(function (element) {
    const currentFontSize = parseFloat(window.getComputedStyle(element).fontSize);
    initialFontSizes.set(element, currentFontSize);
  });
}

function scaleAllFonts(scaleFactor) {
  initialFontSizes.forEach(function (initialFontSize, element) {
    const newFontSize = initialFontSize * scaleFactor;
    element.style.fontSize = newFontSize + 'px';
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Get the initial font sizes when the page loads.
  getInitialFontSizes();

  document.getElementById("increase-font").addEventListener("click", function () {
    scaleAllFonts(1.2);
  });

  document.getElementById("decrease-font").addEventListener("click", function () {
    scaleAllFonts(1 / 1.2);
  });

  document.getElementById("gray-scale").addEventListener("click", function () {
    document.body.classList.toggle("gray-scale");
  });

  document.getElementById("high-contrast").addEventListener("click", function () {
    document.body.classList.toggle("high-contrast");
    document.body.classList.toggle("high-contrast-text");
  });

  document.getElementById("invert-colors").addEventListener("click", function () {
    document.body.classList.toggle("invert-colors");
    document.body.classList.toggle("invert-text-colors");
  });

  document.getElementById("light-background").addEventListener("click", function () {
    document.body.classList.toggle("light-background");
    document.body.classList.toggle("light-background-text");
  });

  document.getElementById("link-underline").addEventListener("click", function () {
    document.body.classList.toggle("link-underline");
  });

  document.getElementById("readable-font").addEventListener("click", function () {
    document.body.classList.toggle("readable-font");
  });

  document.getElementById("reset").addEventListener("click", function () {
    document.body.removeAttribute("style");
    document.body.className = "";
  });
});
$(document).ready(function () {
  var sidebarVisible = false;

  $('.accessibility-btn').on('click', function () {
    if (!sidebarVisible) {
      // 显示侧栏
      $('.sidebar').css('right', '0');
      sidebarVisible = true;
    } else {
      // 隐藏侧栏
      $('.sidebar').css('right', '-60px');
      sidebarVisible = false;
    }
  });
});
