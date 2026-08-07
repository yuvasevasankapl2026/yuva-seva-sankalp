const SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL";

const form = document.getElementById("membershipForm");

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const submitBtn = document.querySelector(".member-submit");
    submitBtn.disabled = true;
    submitBtn.innerText = "कृपया प्रतीक्षा करें...";

    const data = {
        name: document.getElementById("name").value,
        mobile: document.getElementById("mobile").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        membership_type: document.getElementById("membership-type").value,
        date: new Date().toLocaleString("hi-IN")
    };

    try {

        const response = await fetch(SCRIPT_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.text();

        alert("✅ आपका सदस्यता आवेदन सफलतापूर्वक जमा हो गया।");

        form.reset();

    } catch (error) {

        console.error(error);

        alert("❌ डेटा सेव नहीं हो पाया।");

    }

    submitBtn.disabled = false;
    submitBtn.innerText = "सदस्यता के लिए आवेदन करें";

});
