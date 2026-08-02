const membershipForm =
document.getElementById(
    "membershipForm"
);


if (membershipForm) {

    membershipForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =

            document.querySelector(
                '[name="name"]'
            ).value.trim();


            const mobile =

            document.querySelector(
                '[name="mobile"]'
            ).value.trim();


            const email =

            document.querySelector(
                '[name="email"]'
            ).value.trim();


            const address =

            document.querySelector(
                '[name="address"]'
            ).value.trim();


            const membershipType =

            document.querySelector(
                '[name="membership_type"]'
            ).value;


            if (
                mobile.length !== 10
            ) {

                alert(
                    "मोबाइल नंबर 10 अंकों का होना चाहिए।"
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
                !members
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
                "लंबित"

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
                "सदस्यता आवेदन सफलतापूर्वक जमा हो गया।"
            );


            membershipForm.reset();

        }

    );

}
