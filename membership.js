document.addEventListener(
    "DOMContentLoaded",
    function () {

        const membershipForm =
        document.getElementById(
            "membershipForm"
        );


        if (!membershipForm) {

            console.log(
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
                    mobile.length !== 10
                ) {

                    alert(
                        "कृपया 10 अंकों का सही मोबाइल नंबर लिखें।"
                    );

                    return;

                }


                let members =

                JSON.parse(

                    localStorage.getItem(
                        "members"
                    )

                );


                if (
                    !Array.isArray(
                        members
                    )
                ) {

                    members = [];

                }


                const newMember = {

                    id:
                    Date.now(),


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
                    "लंबित",


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

                    "आपका सदस्यता आवेदन सफलतापूर्वक जमा हो गया है।"

                );


                membershipForm.reset();

            }

        );

    }
);
