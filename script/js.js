
// ===================================
// FASHION MODEL GATHERING
// ===================================

window.addEventListener("load", () => {

  const section = document.querySelector(".fashion_gather");

  if (!section) return;

  const models = section.querySelectorAll(".model");

  Promise.all(
    [...models].map(img => {

      if (img.complete) {
        return Promise.resolve();
      }

      return new Promise(resolve => {
        img.addEventListener("load", resolve, { once: true });
        img.addEventListener("error", resolve, { once: true });
      });

    })
  ).then(() => {
    section.classList.add("is-animate");
  });

});


// ===================================
// MOBILE MENU
// ===================================

document.addEventListener("DOMContentLoaded", () => {

  const menuBtn = document.querySelector(".menu_btn");
  const mobileNav = document.querySelector("#mobile_nav");

  if (!menuBtn || !mobileNav) return;

  const menuIcon = menuBtn.querySelector("i");

  menuBtn.addEventListener("click", () => {

    const isOpen = mobileNav.classList.toggle("is-open");

    menuBtn.setAttribute("aria-expanded", isOpen);

    if (menuIcon) {
      menuIcon.classList.toggle("fa-bars", !isOpen);
      menuIcon.classList.toggle("fa-xmark", isOpen);
    }

    menuBtn.setAttribute(
      "aria-label",
      isOpen ? "메뉴 닫기" : "메뉴 열기"
    );

  });

  mobileNav.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      mobileNav.classList.remove("is-open");

      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.setAttribute("aria-label", "메뉴 열기");

      if (menuIcon) {
        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");
      }

    });

  });

});


// ===================================
// TREND ARROW HOVER
// ===================================

$(function () {

  $(".issue_open").hover(

    function () {
      $(this).stop().animate({
        left: "68px"
      }, 300);
    },

    function () {
      $(this).stop().animate({
        left: "60px"
      }, 300);
    }

  );

});


// ===================================
// TREND TEXT SCROLL ANIMATION
// ===================================

$(function () {

  function trendTextAnimation() {

    $(".trend_info").each(function () {

      const $section = $(this);

      if ($section.hasClass("animated")) return;

      const sectionTop = $section.offset().top;
      const scrollBottom =
        $(window).scrollTop() + $(window).height();

      if (scrollBottom > sectionTop + 100) {

        $section.addClass("animated");

        $section.children().each(function (index) {

          $(this)
            .delay(index * 180)
            .animate({
              opacity: 1,
              top: 0
            }, 600);

        });

      }

    });

  }

  trendTextAnimation();

  $(window).on("scroll", trendTextAnimation);

});


// ===================================
// VINTAGE MAGAZINE MODAL
// ===================================

document.addEventListener("DOMContentLoaded", () => {

  const issueModal = document.querySelector("#issueModal");
  const modalClose = document.querySelector("#modalClose");
  const modalDim = document.querySelector(".modal_dim");
  const modalImage = document.querySelector("#modalImage");

  const issueButtons = document.querySelectorAll(".issue_open");

  if (!issueModal || !modalClose || !modalDim || !modalImage) {
    return;
  }

  // 매거진 열기
  issueButtons.forEach(button => {

    button.addEventListener("click", () => {

      const imagePath = button.dataset.image;

      if (!imagePath) {
        console.warn("data-image 경로를 확인해 주세요.");
        return;
      }

      modalImage.src = imagePath;

      issueModal.classList.add("active");

      document.body.style.overflow = "hidden";

    });

  });

  // 매거진 닫기
  function closeMagazine() {

    issueModal.classList.remove("active");

    document.body.style.overflow = "";

    modalImage.removeAttribute("src");

  }

  modalClose.addEventListener("click", closeMagazine);

  modalDim.addEventListener("click", closeMagazine);

  // ESC 키로 닫기
  document.addEventListener("keydown", e => {

    if (
      e.key === "Escape" &&
      issueModal.classList.contains("active")
    ) {
      closeMagazine();
    }

  });

});
