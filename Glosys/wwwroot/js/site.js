var swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    spaceBetween: 10,
});
var swiper = new Swiper(".home-services .mySwiper", {
    spaceBetween: 0,
});
var swiper = new Swiper(".home-partners .mySwiper", {
    // centeredSlides: true,
    slidesPerView: 6,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
});

// document.addEventListener('scroll', function () {
//     const box = document.querySelector("nav");
//     const svgItem = document.querySelectorAll("nav svg path")
//     const logo = document.querySelector(".nav-left img")
//     if (window.scrollY > 0) {
//         box.classList.add('nav-scrolled');
//         svgItem.forEach(function (element) {
//             element.setAttribute('stroke', '#002E4C')
//         })
//         logo.setAttribute('src', '/img/GLOSYS-dark.png')
//     } else {
//         box.classList.remove('nav-scrolled');
//         svgItem.forEach(function (element) {
//             element.setAttribute('stroke', 'white')
//         })
//         logo.setAttribute('src', '/img/GLOSYS.png')
//     }
// });
// document.querySelector(".lang").addEventListener("click", function () {
//     document.querySelector(".lang").classList.toggle("show-dropdown");

// })

$(".big-photo img").attr("src", $(".selected-photo img").attr("src"))
$(".mini-photos .item").click(function () {
    $(".mini-photos .item").removeClass("selected-photo")
    $(this).addClass("selected-photo")
    $(".big-photo img").attr("src", $(this).children().attr("src"))
})