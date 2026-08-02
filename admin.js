const loginForm =
document.getElementById(
    "adminLoginForm"
);


loginForm.addEventListener(
    "submit",

    function(event) {

        event.preventDefault();


        const username =
        document.getElementById(
            "adminUsername"
        ).value.trim();


        const password =
        document.getElementById(
            "adminPassword"
        ).value.trim();


        if (

            username === "admin"

            &&

            password === "admin123"

        ) {

            localStorage.setItem(
                "adminLoggedIn",
                "true"
            );


            alert(
                "लॉगिन सफल हुआ"
            );


            window.location.href =
            "admin-dashboard.html";

        }

        else {

            alert(
                "यूज़रनेम या पासवर्ड गलत है"
            );

        }

    }

);
