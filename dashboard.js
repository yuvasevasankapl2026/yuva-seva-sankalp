document.addEventListener(
    "DOMContentLoaded",
    function () {

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


        const totalMembers =

        document.getElementById(
            "totalMembers"
        );


        const newApplications =

        document.getElementById(
            "newApplications"
        );


        const approvedMembers =

        document.getElementById(
            "approvedMembers"
        );


        const pendingMembers =

        document.getElementById(
            "pendingMembers"
        );


        const memberTable =

        document.getElementById(
            "memberTable"
        );


        function updateDashboard(
            memberList
        ) {


            totalMembers.textContent =

            members.length;


            const approved =

            members.filter(
                function (member) {

                    return (
                        member.status ===
                        "स्वीकृत"
                    );

                }
            );


            const pending =

            members.filter(
                function (member) {

                    return (
                        member.status !==
                        "स्वीकृत"
                    );

                }
            );


            newApplications.textContent =

            pending.length;


            approvedMembers.textContent =

            approved.length;


            pendingMembers.textContent =

            pending.length;


            memberTable.innerHTML = "";


            if (
                memberList.length === 0
            ) {

                memberTable.innerHTML =

                `
                <tr>

                    <td colspan="6">

                        कोई सदस्यता आवेदन नहीं मिला।

                    </td>

                </tr>
                `;


                return;

            }


            memberList.forEach(

                function (
                    member,
                    index
                ) {


                    let membershipName =

                    "सामान्य सदस्य";


                    if (
                        member.membershipType ===
                        "active"
                    ) {

                        membershipName =

                        "सक्रिय सदस्य";

                    }


                    if (
                        member.membershipType ===
                        "lifetime"
                    ) {

                        membershipName =

                        "आजीवन सदस्य";

                    }


                    const status =

                    member.status ||
                    "लंबित";


                    memberTable.innerHTML +=

                    `
                    <tr>

                        <td>

                            ${index + 1}

                        </td>


                        <td>

                            ${member.name}

                        </td>


                        <td>

                            ${member.mobile}

                        </td>


                        <td>

                            ${membershipName}

                        </td>


                        <td>

                            ${status}

                        </td>


                        <td>

                            <button
                                onclick="
                                approveMember(
                                ${member.id}
                                )
                                "
                            >

                                स्वीकृत करें

                            </button>

                        </td>

                    </tr>
                    `;

                }

            );

        }


        window.approveMember =

        function (
            memberId
        ) {


            members =

            members.map(

                function (
                    member
                ) {


                    if (
                        member.id ===
                        memberId
                    ) {

                        member.status =

                        "स्वीकृत";

                    }


                    return member;

                }

            );


            localStorage.setItem(

                "members",

                JSON.stringify(
                    members
                )

            );


            updateDashboard(
                members
            );

        };


        const memberSearch =

        document.getElementById(
            "memberSearch"
        );


        memberSearch.addEventListener(

            "input",

            function () {


                const searchText =

                this.value
                .toLowerCase()
                .trim();


                const filteredMembers =

                members.filter(

                    function (
                        member
                    ) {


                        return (

                            member.name
                            .toLowerCase()
                            .includes(
                                searchText
                            )

                            ||

                            member.mobile
                            .includes(
                                searchText
                            )

                        );

                    }

                );


                updateDashboard(
                    filteredMembers
                );

            }

        );


        updateDashboard(
            members
        );

    }
);
