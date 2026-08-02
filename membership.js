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


        /* =====================================
           MEMBER ID बनाने का Function
        ===================================== */

        function generateMemberId(
            members
        ) {

            let lastNumber = 0;


            members.forEach(
                function(member) {

                    if (
                        member.memberId
                    ) {

                        const numberPart =

                        member.memberId
                        .split("-")
                        .pop();


                        const number =

                        parseInt(
                            numberPart
                        );


                        if (
                            number > lastNumber
                        ) {

                            lastNumber =
                            number;

                        }

                    }

                }
            );


            const newNumber =

            lastNumber + 1;


            const formattedNumber =

            String(
                newNumber
            ).padStart(
                4,
                "0"
            );


            return (

                "YSSF-2026-" +

                formattedNumber

            );

        }


        /* =====================================
           MEMBERSHIP FORM SUBMIT
        ===================================== */

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


                /* मोबाइल नंबर जांच */

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


                /* पुराने सदस्य लोड करें */

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


                /* नया Member ID */

                const memberId =

                generateMemberId(
                    members
                );


                /* नया सदस्य */

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


                /* सदस्य Save करें */

                members.push(
                    newMember
                );


                localStorage.setItem(

                    "members",

                    JSON.stringify(
                        members
                    )

                );


                /* सफलता का Message */

                alert(

                    "आपका सदस्यता आवेदन सफलतापूर्वक जमा हो गया।\n\n" +

                    "आपकी Member ID: " +

                    memberId

                );


                membershipForm.reset();

            }

        );

    }
);
