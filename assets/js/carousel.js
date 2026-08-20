const track = document.querySelector(".carousel__track");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const dots = document.querySelectorAll(".dot");

const getScrollAmount = () => {

    const card = track.querySelector(".project-card");

    if (!card) return 350;

    return card.offsetWidth + 30;
};

/* BOTÕES */

nextBtn?.addEventListener("click", () => {

    track.scrollBy({
        left: getScrollAmount(),
        behavior: "smooth"
    });

});

prevBtn?.addEventListener("click", () => {

    track.scrollBy({
        left: -getScrollAmount(),
        behavior: "smooth"
    });

});

/* DOTS */

function updateDots() {

    const cards = document.querySelectorAll(".project-card");

    if (!cards.length || !dots.length) return;

    const currentIndex = Math.round(
        track.scrollLeft / getScrollAmount()
    );

    dots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === currentIndex
        );

    });

}

track?.addEventListener("scroll", updateDots);

updateDots();