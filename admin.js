function adminLogin(event) {

    event.preventDefault();


    const username =

    document.getElementById(
        "adminUsername"
    ).value.trim();


    const password =

    document.getElementById(
        "adminPassword"
    ).value;


    const message =

    document.getElementById(
        "loginMessage"
    );


    if (

        username === "admin"

        &&

        password === "12345"

    ) {

        message.style.color =
        "#247331";


        message.innerHTML =

        "लॉगिन सफल हो गया।";


        setTimeout(

            function () {

                window.location.href =

                "admin-dashboard.html";

            },

            1000

        );

    }

    else {

        message.style.color =
        "#d32f2f";


        message.innerHTML =

        "यूज़रनेम या पासवर्ड गलत है।";

    }


    return false;

}
