// =========================
// Website Loaded
// =========================
document.addEventListener("DOMContentLoaded", () => {

    console.log("Yuva Seva Sankalp Foundation Website Loaded");

    // =========================
    // Smooth Scroll
    // =========================
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {
                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });
            }

        });
    });

    // =========================
    // Fade Animation
    // =========================
    const cards = document.querySelectorAll(".card");

    function showCards() {

        cards.forEach(card => {

            const top = card.getBoundingClientRect().top;

            if (top < window.innerHeight - 100) {

                card.style.opacity = "1";
                card.style.transform = "translateY(0)";

            }

        });

    }

    cards.forEach(card => {

        card.style.opacity = "0";
        card.style.transform = "translateY(40px)";
        card.style.transition = "0.6s";

    });

    window.addEventListener("scroll", showCards);

    showCards();

});

// =========================
// Back To Top Button
// =========================

const topButton = document.createElement("button");

topButton.innerHTML = "↑";

topButton.style.position = "fixed";
topButton.style.right = "20px";
topButton.style.bottom = "20px";
topButton.style.width = "50px";
topButton.style.height = "50px";
topButton.style.border = "none";
topButton.style.borderRadius = "50%";
topButton.style.background = "#0066cc";
topButton.style.color = "#fff";
topButton.style.fontSize = "22px";
topButton.style.cursor = "pointer";
topButton.style.display = "none";
topButton.style.zIndex = "999";

document.body.appendChild(topButton);

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        topButton.style.display = "block";

    } else {

        topButton.style.display = "none";

    }

});

topButton.addEventListener("click", () => {

    window.scrollTo({

        top: 0,
        behavior: "smooth"

    });

});
