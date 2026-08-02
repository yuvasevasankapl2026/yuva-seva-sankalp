document.addEventListener(
    "DOMContentLoaded",
    function () {

        const membershipForm =

        document.getElementById(
            "membershipForm"
        );


        if (!membershipForm) {

            alert(
                "Membership form नहीं मिला।"
            );

            return;

        }


        membershipForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =

                document.getElementById(
                    "name"
                ).value.trim();


                const mobile =

                document.getElementById(
                    "mobile"
                ).value.trim();


                const email =

                document.getElementById(
                    "email"
                ).value.trim();


                const address =

                document.getElementById(
                    "address"
                ).value.trim();


                const membershipType =

                document.getElementById(
                    "membership-type"
                ).value;


                if (
                    !/^[0-9]{10}$/.test(
                        mobile
                    )
                ) {

                    alert(
                        "कृपया 10 अंकों का सही मोबाइल नंबर लिखें।"
                    );

                    return;

                }


                let members = [];


                try {

                    members = JSON.parse(

                        localStorage.getItem(
                            "members"
                        )

                    ) || [];

                }

                catch (error) {

                    members = [];

                }


                if (
                    !Array.isArray(
                        members
                    )
                ) {

                    members = [];

                }


                const memberNumber =

                members.length + 1;


                const memberId =

                "YSSF-2026-" +

                String(
                    memberNumber
                ).padStart(
                    4,
                    "0"
                );


                const newMember = {

                    id:

                    Date.now(),


                    memberId:

                    memberId,


                    name:

                    name,


                    mobile:

                    mobile,


                    email:

                    email,


                    address:

                    address,


                    membershipType:

                    membershipType,


                    status:

                    "pending",


                    date:

                    new Date()
                    .toLocaleDateString(
                        "hi-IN"
                    )

                };


                members.push(
                    newMember
                );


                localStorage.setItem(

                    "members",

                    JSON.stringify(
                        members
                    )

                );


                alert(

                    "सदस्यता आवेदन सफलतापूर्वक जमा हो गया।" +

                    "\n\n" +

                    "आपकी Member ID: " +

                    memberId

                );


                membershipForm.reset();

            }

        );

    }
);
