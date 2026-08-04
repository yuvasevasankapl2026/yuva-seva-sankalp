/* =====================================
   BLOOD DONATION FORM
===================================== */

const bloodDonationForm =

document.getElementById(

    "bloodDonationForm"

);


/* =====================================
   FORM SUBMIT
===================================== */

bloodDonationForm.addEventListener(

    "submit",

    function(event) {


        /* PAGE RELOAD रोकें */

        event.preventDefault();


        /* FORM DATA लें */

        const donorName =

        document.getElementById(

            "donorName"

        ).value.trim();


        const donorMobile =

        document.getElementById(

            "donorMobile"

        ).value.trim();


        const bloodGroup =

        document.getElementById(

            "bloodGroup"

        ).value;


        const donorAge =

        document.getElementById(

            "donorAge"

        ).value;


        const donorAddress =

        document.getElementById(

            "donorAddress"

        ).value.trim();


        const lastDonation =

        document.getElementById(

            "lastDonation"

        ).value;


        const bloodMessage =

        document.getElementById(

            "bloodMessage"

        );


        /* =====================================
           MOBILE NUMBER CHECK
        ===================================== */

        if (

            !/^[0-9]{10}$/.test(

                donorMobile

            )

        ) {


            bloodMessage.innerHTML =

            "❌ कृपया सही 10 अंकों का मोबाइल नंबर लिखें।";


            bloodMessage.style.color =

            "red";


            return;


        }


        /* =====================================
           AGE CHECK
        ===================================== */

        if (

            donorAge < 18 ||

            donorAge > 65

        ) {


            bloodMessage.innerHTML =

            "❌ कृपया 18 से 65 वर्ष के बीच की उम्र लिखें।";


            bloodMessage.style.color =

            "red";


            return;


        }


        /* =====================================
           OLD DONOR DATA
        ===================================== */

        let bloodDonors =

        JSON.parse(

            localStorage.getItem(

                "bloodDonors"

            )

        ) || [];


        /* =====================================
           DUPLICATE MOBILE CHECK
        ===================================== */

        const alreadyRegistered =

        bloodDonors.some(

            function(donor) {


                return (

                    donor.mobile ===

                    donorMobile

                );


            }

        );


        if (

            alreadyRegistered

        ) {


            bloodMessage.innerHTML =

            "⚠️ इस मोबाइल नंबर से पहले ही पंजीकरण हो चुका है।";


            bloodMessage.style.color =

            "orange";


            return;


        }


        /* =====================================
           NEW DONOR DATA
        ===================================== */

        const newDonor = {


            donorId:

            "YSSF-BD-" +

            String(

                bloodDonors.length + 1

            ).padStart(

                4,

                "0"

            ),


            name:

            donorName,


            mobile:

            donorMobile,


            bloodGroup:

            bloodGroup,


            age:

            donorAge,


            address:

            donorAddress,


            lastDonation:

            lastDonation ||

            "पहली बार",


            registrationDate:

            new Date()

            .toLocaleDateString(

                "hi-IN"

            ),


            status:

            "सक्रिय"


        };


        /* =====================================
           SAVE DONOR
        ===================================== */

        bloodDonors.push(

            newDonor

        );


        localStorage.setItem(

            "bloodDonors",

            JSON.stringify(

                bloodDonors

            )

        );


        /* =====================================
           SUCCESS MESSAGE
        ===================================== */

        bloodMessage.innerHTML =

        "✅ आपका रक्तदाता पंजीकरण सफलतापूर्वक हो गया।<br>" +

        "आपका Donor ID: <strong>" +

        newDonor.donorId +

        "</strong>";


        bloodMessage.style.color =

        "green";


        /* =====================================
           FORM RESET
        ===================================== */

        bloodDonationForm.reset();


    }

);
