// वेबसाइट लोड होने पर संदेश
window.onload = function () {
    console.log("युवा सेवा संकल्प फाउंडेशन वेबसाइट सफलतापूर्वक लोड हो गई।");
};

// "और जानें" बटन पर क्लिक करने पर About सेक्शन पर जाएँ
const btn = document.querySelector(".hero button");

if (btn) {
    btn.addEventListener("click", function () {
        document.getElementById("about").scrollIntoView({
            behavior: "smooth"
        });
    });
}

// नेविगेशन लिंक पर स्मूथ स्क्रॉल
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function (e) {
        const target = this.getAttribute('href');

        if (target.startsWith("#")) {
            e.preventDefault();
            document.querySelector(target).scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});
