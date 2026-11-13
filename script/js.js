// FASHION MODEL GATHERING

window.addEventListener("load", () => {

    const section = document.querySelector(".fashion_gather");

    if (!section) return;

    const models = section.querySelectorAll(".model");

    Promise.all(
        [...models].map(img => {

            if (img.complete && img.naturalWidth > 0) {
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


const issueModal = document.querySelector("#issueModal");
const modalClose = document.querySelector("#modalClose");
const modalDim = document.querySelector(".modal_dim");
const modelVideo = document.querySelector("#modelVideo");

const issueButtons = document.querySelectorAll(".issue_open");

// 화살표 클릭 시 영상 열기
issueButtons.forEach((button) => {
  button.addEventListener("click", () => {

    const videoSrc = button.dataset.video;

    modelVideo.src = videoSrc;

    issueModal.classList.add("active");
    document.body.style.overflow = "hidden";

    modelVideo.load();
    modelVideo.play().catch(error => {
      console.log("영상 재생 오류:", error);
    });

  });
});

// 팝업 닫기
function closeTrendModal() {
  issueModal.classList.remove("active");

  document.body.style.overflow = "";

  modelVideo.pause();
  modelVideo.removeAttribute("src");
  modelVideo.load();
}

modalClose.addEventListener("click", closeTrendModal);
modalDim.addEventListener("click", closeTrendModal);

// ESC 키로 닫기
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" &&
      issueModal.classList.contains("active")) {
    closeTrendModal();
  }
});


document.addEventListener("DOMContentLoaded", () => {

    const menuBtn = document.querySelector(".menu_btn");
    const mobileNav = document.querySelector("#mobile_nav");
    const menuIcon = menuBtn.querySelector("i");

    menuBtn.addEventListener("click", () => {

        // 메뉴 열기 / 닫기
        const isOpen = mobileNav.classList.toggle("is-open");

        // 접근성 상태 변경
        menuBtn.setAttribute("aria-expanded", isOpen);

        // 아이콘 변경
        if (isOpen) {
            menuIcon.classList.remove("fa-bars");
            menuIcon.classList.add("fa-xmark");
            menuBtn.setAttribute("aria-label", "메뉴 닫기");
        } else {
            menuIcon.classList.remove("fa-xmark");
            menuIcon.classList.add("fa-bars");
            menuBtn.setAttribute("aria-label", "메뉴 열기");
        }
    });

    // 메뉴 항목 클릭 시 닫기
    mobileNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            mobileNav.classList.remove("is-open");

            menuBtn.setAttribute("aria-expanded", "false");
            menuBtn.setAttribute("aria-label", "메뉴 열기");

            menuIcon.classList.remove("fa-xmark");
            menuIcon.classList.add("fa-bars");
        });
    });

});




$(function () {

  // 화살표 hover 애니메이션
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
$(function () {

  function trendTextAnimation() {

    $(".trend_info").each(function () {

      const $section = $(this);

      // 이미 실행한 콘텐츠는 다시 실행하지 않음
      if ($section.hasClass("animated")) return;

      const sectionTop = $section.offset().top;
      const scrollBottom = $(window).scrollTop() + $(window).height();

      // 화면에 콘텐츠가 들어오면 실행
      if (scrollBottom > sectionTop + 100) {

        $section.addClass("animated");

        $section.children().each(function (index) {

          $(this)
            .delay(index * 0)
            .animate({
              opacity: 1,
              top: 0
            }, 600);

        });
      }
    });
  }

  // 처음 화면 진입 시
  trendTextAnimation();

  // 스크롤할 때
  $(window).on("scroll", trendTextAnimation);

});
