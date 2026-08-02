document.addEventListener(
    "DOMContentLoaded",
    function () {

        const membershipForm =
            document.getElementById(
                "membershipForm"
            );


        if (
            membershipForm
        ) {

            membershipForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    const name =

                        document.querySelector(
                            'input[name="name"]'
                        ).value.trim();


                    const mobile =

                        document.querySelector(
                            'input[name="mobile"]'
                        ).value.trim();


                    const email =

                        document.querySelector(
                            'input[name="email"]'
                        ).value.trim();


                    const address =

                        document.querySelector(
                            'textarea[name="address"]'
                        ).value.trim();


                    const membershipType =

                        document.querySelector(
                            'select[name="membership_type"]'
                        ).value;


                    if (
                        mobile.length !== 10
                    ) {

                        alert(
                            "कृपया 10 अंकों का सही मोबाइल नंबर दर्ज करें।"
                        );

                        return;

                    }


                    const members =

                        JSON.parse(
                            localStorage.getItem(
                                "members"
                            )
                        )
                        ||
                        [];


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

                        "✓ सदस्यता आवेदन सफलतापूर्वक जमा हो गया।"

                    );


                    membershipForm.reset();


                    window.location.href =

                        "member-login.html";

                }

            );

        }

    }
);
