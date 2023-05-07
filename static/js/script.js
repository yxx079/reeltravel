( function( $ ) {
$( document ).ready(function() {
$('#cssmenu').prepend('<div id="menu-button">Menu</div>');
	$('#cssmenu #menu-button').on('click', function(){
		var menu = $(this).next('ul');
		if (menu.hasClass('open')) {
			menu.removeClass('open');
		}
		else {
			menu.addClass('open');
		}
	});
});
} )( jQuery );
// privacy popup
document.addEventListener("DOMContentLoaded", function () {
  const footerLink = document.getElementById("footer-link");
  const lightbox = document.getElementById("lightbox");
  const closeLightbox = document.getElementById("close-lightbox");

  footerLink.addEventListener("click", function (event) {
    event.preventDefault();
    lightbox.classList.remove("lightbox-hidden");
    $("body").css("overflow", "hidden");
  });
if(closeLightbox){
  closeLightbox.addEventListener("click", function () {
    lightbox.classList.add("lightbox-hidden");
    $("body").css("overflow", "auto"); // 还原主背景的overflow属性
  });}

  window.addEventListener("click", function (event) {
    if (event.target === lightbox) {
      lightbox.classList.add("lightbox-hidden");
      $("body").css("overflow", "auto"); // 还原主背景的overflow属性
    }
  });
});
//load term of use page in footer

$(document).ready(function() {
  // 当点击"terms of use"链接时，使用jQuery的.load()方法加载terms of use文件
  $("#footer-terms-link").on("click", function(event) {
    event.preventDefault(); // 阻止链接的默认行为

    // 使用.load()方法加载terms of use文件，并将其插入到id为"terms-container"的div中
    $("#terms-container").load($(this).data("target"));
  });
});










