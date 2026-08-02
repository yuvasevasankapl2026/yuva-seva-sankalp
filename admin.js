/* =====================================
   ADMIN LOGIN JAVASCRIPT
===================================== */

const loginForm = document.getElementById(
    "adminLoginForm"
);

const loginMessage = document.getElementById(
    "loginMessage"
);


/* =====================================
   LOGIN
===================================== */

if (loginForm) {

    loginForm.addEventListener(
        "submit",

        function (event) {

            event.preventDefault();


            const username = document
                .getElementById(
                    "adminUsername"
                )
                .value
                .trim();


            const password = document
                .getElementById(
                    "adminPassword"
                )
                .value
                .trim();


            /* अपना यूज़रनेम और पासवर्ड */

            const correctUsername =
                "admin";


            const correctPassword =
                "admin123";


            if (
                username === correctUsername
                &&
                password === correctPassword
            ) {

                localStorage.setItem(
                    "adminLoggedIn",
                    "true"
                );


                loginMessage.textContent =
                    "लॉगिन सफल हुआ।";


                loginMessage.style.color =
                    "green";


                setTimeout(

                    function () {

                        window.location.href =
                            "admin-dashboard.html";

                    },

                    500

                );

            }

            else {

                loginMessage.textContent =
                    "यूज़रनेम या पासवर्ड गलत है।";


                loginMessage.style.color =
                    "red";

            }

        }

    );

}
