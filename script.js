// Website Loaded
document.addEventListener("DOMContentLoaded", function () {
    console.log("Website Loaded Successfully!");

    // Mobile Menu
    const menuBtn = document.getElementById("menu-btn");
    const navMenu = document.getElementById("nav-menu");

    if (menuBtn && navMenu) {
        menuBtn.addEventListener("click", function () {
            navMenu.classList.toggle("active");
        });
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href"))
                .scrollIntoView({
                    behavior: "smooth"
                });
        });
    });
});
