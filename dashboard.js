document.addEventListener(
    "DOMContentLoaded",
    function () {

        let members = JSON.parse(
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


        const memberSearch =
        document.getElementById(
            "memberSearch"
        );


        function saveMembers() {

            localStorage.setItem(

                "members",

                JSON.stringify(
                    members
                )

            );

        }


        function getMembershipName(
            type
        ) {

            if (
                type === "active"
            ) {

                return "सक्रिय सदस्य";

            }


            if (
                type === "lifetime"
            ) {

                return "आजीवन सदस्य";

            }


            return "सामान्य सदस्य";

        }


        function updateDashboard(
            memberList
        ) {

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


            totalMembers.textContent =
            members.length;


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

                        कोई सदस्य नहीं मिला।

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

                    const status =

                    member.status ||
                    "लंबित";


                    let statusClass =

                    "status-pending";


                    if (
                        status ===
                        "स्वीकृत"
                    ) {

                        statusClass =

                        "status-approved";

                    }


                    let actionButton =

                    `
                    <button
                        class="approve-btn"
                        onclick="
                        approveMember(
                        ${member.id}
                        )
                        "
                    >

                        स्वीकृत करें

                    </button>
                    `;


                    if (
                        status ===
                        "स्वीकृत"
                    ) {

                        actionButton =

                        `
                        <span class="approved-text">

                            ✓ स्वीकृत

                        </span>
                        `;

                    }


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

                            ${getMembershipName(
                                member.membershipType
                            )}

                        </td>


                        <td>

                            <span
                                class="${statusClass}"
                            >

                                ${status}

                            </span>

                        </td>


                        <td>

                            ${actionButton}


                            <button
                                class="delete-btn"
                                onclick="
                                deleteMember(
                                ${member.id}
                                )
                                "
                            >

                                हटाएँ

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

            const confirmApprove =

            confirm(
                "क्या आप इस सदस्य को स्वीकृत करना चाहते हैं?"
            );


            if (
                !confirmApprove
            ) {

                return;

            }


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


            saveMembers();


            updateDashboard(
                members
            );

        };


        window.deleteMember =

        function (
            memberId
        ) {

            const confirmDelete =

            confirm(
                "क्या आप इस सदस्य को हटाना चाहते हैं?"
            );


            if (
                !confirmDelete
            ) {

                return;

            }


            members =

            members.filter(

                function (
                    member
                ) {

                    return (
                        member.id !==
                        memberId
                    );

                }

            );


            saveMembers();


            updateDashboard(
                members
            );

        };


        if (
            memberSearch
        ) {

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

                            const name =

                            (
                                member.name ||
                                ""
                            )
                            .toLowerCase();


                            const mobile =

                            member.mobile ||
                            "";


                            return (

                                name.includes(
                                    searchText
                                )

                                ||

                                mobile.includes(
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

        }


        updateDashboard(
            members
        );

    }
);
