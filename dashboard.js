/* =====================================
   ADMIN LOGIN CHECK
===================================== */

if (

    localStorage.getItem(

        "adminLoggedIn"

    ) !== "true"

) {


    window.location.href =

    "admin-login.html";


}


/* =====================================
   MEMBER DATA
===================================== */

let members =

JSON.parse(

    localStorage.getItem(

        "members"

    )

) || [];


/* =====================================
   VOLUNTEER DATA
===================================== */

let volunteers =

JSON.parse(

    localStorage.getItem(

        "volunteers"

    )

) || [];


/* =====================================
   MEMBER TABLE
===================================== */

function showMembers(

    memberList = members

) {


    const memberTable =

    document.getElementById(

        "memberTable"

    );


    if (

        !memberTable

    ) {


        return;


    }


    memberTable.innerHTML = "";


    if (

        memberList.length === 0

    ) {


        memberTable.innerHTML =

        `

        <tr>

            <td
                colspan="7"
                style="
                    text-align:center;
                    padding:20px;
                "
            >

                अभी कोई सदस्य उपलब्ध नहीं है।

            </td>

        </tr>

        `;


        updateDashboard();


        return;


    }


    memberList.forEach(

        function(

            member,

            index

        ) {


            const memberId =

            member.memberId ||

            member.id ||

            "-";


            const name =

            member.name ||

            member.fullName ||

            "-";


            const mobile =

            member.mobile ||

            member.phone ||

            "-";


            const membership =

            member.membership ||

            member.membershipType ||

            "-";


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

                    ${memberId}

                </td>


                <td>

                    ${name}

                </td>


                <td>

                    ${mobile}

                </td>


                <td>

                    ${membership}

                </td>


                <td>

                    <span class="status-${status}">

                        ${status}

                    </span>

                </td>


                <td>


                    <button
                        type="button"
                        onclick="approveMember(${members.indexOf(member)})"
                    >

                        ✅ Approve

                    </button>


                    <button
                        type="button"
                        onclick="rejectMember(${members.indexOf(member)})"
                    >

                        ❌ Reject

                    </button>


                </td>


            </tr>

            `;


        }

    );


    updateDashboard();


}


/* =====================================
   VOLUNTEER TABLE
===================================== */

function showVolunteers(

    volunteerList = volunteers

) {


    const volunteerTable =

    document.getElementById(

        "volunteerTable"

    );


    if (

        !volunteerTable

    ) {


        return;


    }


    volunteerTable.innerHTML = "";


    if (

        volunteerList.length === 0

    ) {


        volunteerTable.innerHTML =

        `

        <tr>

            <td
                colspan="8"
                style="
                    text-align:center;
                    padding:20px;
                "
            >

                अभी कोई वॉलंटियर आवेदन उपलब्ध नहीं है।

            </td>

        </tr>

        `;


        return;


    }


    volunteerList.forEach(

        function(

            volunteer,

            index

        ) {


            const volunteerId =

            volunteer.volunteerId ||

            "-";


            const name =

            volunteer.name ||

            "-";


            const mobile =

            volunteer.mobile ||

            "-";


            const service =

            volunteer.service ||

            "-";


            const availability =

            volunteer.availability ||

            "-";


            const status =

            volunteer.status ||

            "लंबित";


            volunteerTable.innerHTML +=

            `

            <tr>


                <td>

                    ${index + 1}

                </td>


                <td>

                    ${volunteerId}

                </td>


                <td>

                    ${name}

                </td>


                <td>

                    ${mobile}

                </td>


                <td>

                    ${service}

                </td>


                <td>

                    ${availability}

                </td>


                <td>

                    <span class="volunteer-status">

                        ${status}

                    </span>

                </td>


                <td>


                    <button
                        type="button"
                        class="approve-btn"
                        onclick="approveVolunteer(${volunteers.indexOf(volunteer)})"
                    >

                        ✅ Approve

                    </button>


                    <button
                        type="button"
                        class="reject-btn"
                        onclick="rejectVolunteer(${volunteers.indexOf(volunteer)})"
                    >

                        ❌ Reject

                    </button>


                </td>


            </tr>

            `;


        }

    );


}


/* =====================================
   APPROVE VOLUNTEER
===================================== */

function approveVolunteer(

    index

) {


    volunteers[index].status =

    "स्वीकृत";


    localStorage.setItem(

        "volunteers",

        JSON.stringify(

            volunteers

        )

    );


    showVolunteers();


}


/* =====================================
   REJECT VOLUNTEER
===================================== */

function rejectVolunteer(

    index

) {


    volunteers[index].status =

    "अस्वीकृत";


    localStorage.setItem(

        "volunteers",

        JSON.stringify(

            volunteers

        )

    );


    showVolunteers();


}


/* =====================================
   APPROVE MEMBER
===================================== */

function approveMember(

    index

) {


    members[index].status =

    "स्वीकृत";


    localStorage.setItem(

        "members",

        JSON.stringify(

            members

        )

    );


    showMembers();


}


/* =====================================
   REJECT MEMBER
===================================== */

function rejectMember(

    index

) {


    members[index].status =

    "अस्वीकृत";


    localStorage.setItem(

        "members",

        JSON.stringify(

            members

        )

    );


    showMembers();


}


/* =====================================
   DASHBOARD COUNT
===================================== */

function updateDashboard() {


    const totalMembers =

    members.length;


    const approvedMembers =

    members.filter(

        function(

            member

        ) {


            return (

                member.status ===

                "स्वीकृत"

            );


        }

    ).length;


    const pendingMembers =

    members.filter(

        function(

            member

        ) {


            return (

                !member.status ||

                member.status ===

                "लंबित"

            );


        }

    ).length;


    const totalElement =

    document.getElementById(

        "totalMembers"

    );


    const newElement =

    document.getElementById(

        "newApplications"

    );


    const approvedElement =

    document.getElementById(

        "approvedMembers"

    );


    const pendingElement =

    document.getElementById(

        "pendingMembers"

    );


    if (

        totalElement

    ) {


        totalElement.textContent =

        totalMembers;


    }


    if (

        newElement

    ) {


        newElement.textContent =

        pendingMembers;


    }


    if (

        approvedElement

    ) {


        approvedElement.textContent =

        approvedMembers;


    }


    if (

        pendingElement

    ) {


        pendingElement.textContent =

        pendingMembers;


    }


}


/* =====================================
   MEMBER SEARCH
===================================== */

const memberSearch =

document.getElementById(

    "memberSearch"

);


if (

    memberSearch

) {


    memberSearch.addEventListener(

        "input",

        function() {


            const searchText =

            this.value

            .toLowerCase()

            .trim();


            const filteredMembers =

            members.filter(

                function(

                    member

                ) {


                    return (

                        String(

                            member.memberId ||

                            member.id ||

                            ""

                        )

                        .toLowerCase()

                        .includes(

                            searchText

                        )

                        ||

                        String(

                            member.name ||

                            member.fullName ||

                            ""

                        )

                        .toLowerCase()

                        .includes(

                            searchText

                        )

                        ||

                        String(

                            member.mobile ||

                            member.phone ||

                            ""

                        )

                        .includes(

                            searchText

                        )

                    );


                }

            );


            showMembers(

                filteredMembers

            );


        }

    );


}


/* =====================================
   VOLUNTEER SEARCH
===================================== */

const volunteerSearch =

document.getElementById(

    "volunteerSearch"

);


if (

    volunteerSearch

) {


    volunteerSearch.addEventListener(

        "input",

        function() {


            const searchText =

            this.value

            .toLowerCase()

            .trim();


            const filteredVolunteers =

            volunteers.filter(

                function(

                    volunteer

                ) {


                    return (

                        String(

                            volunteer.volunteerId ||

                            ""

                        )

                        .toLowerCase()

                        .includes(

                            searchText

                        )

                        ||

                        String(

                            volunteer.name ||

                            ""

                        )

                        .toLowerCase()

                        .includes(

                            searchText

                        )

                        ||

                        String(

                            volunteer.mobile ||

                            ""

                        )

                        .includes(

                            searchText

                        )

                    );


                }

            );


            showVolunteers(

                filteredVolunteers

            );


        }

    );


}


/* =====================================
   PAGE LOAD
===================================== */

showMembers();

showVolunteers();
/* =====================================
   CONTACT MESSAGES
===================================== */


function loadContactMessages() {


    const contactTable =

    document.getElementById(

        "contactTable"

    );


    if (

        !contactTable

    ) {


        return;


    }


    const contacts =

    JSON.parse(

        localStorage.getItem(

            "contactMessages"

        )

    ) || [];


    contactTable.innerHTML = "";


    /* कोई संदेश नहीं */

    if (

        contacts.length === 0

    ) {


        contactTable.innerHTML = `

        <tr>

            <td
                colspan="10"
                style="
                text-align:center;
                padding:25px;
                "
            >

                अभी कोई संपर्क संदेश उपलब्ध नहीं है।

            </td>

        </tr>

        `;


        return;


    }


    /* सभी संदेश दिखाएँ */

    contacts.forEach(

        function(

            contact,

            index

        ) {


            const status =

            contact.status ||

            "नया";


            contactTable.innerHTML += `


            <tr>


                <td>

                    ${index + 1}

                </td>


                <td>

                    ${contact.contactId || ""}

                </td>


                <td>

                    ${contact.name || ""}

                </td>


                <td>

                    ${contact.mobile || ""}

                </td>


                <td>

                    ${contact.email || "-"}

                </td>


                <td>

                    ${contact.subject || ""}

                </td>


                <td>

                    ${contact.message || ""}

                </td>


                <td>

                    ${contact.date || "-"}

                </td>


                <td>

                    <span class="contact-status">

                        ${status}

                    </span>

                </td>


                <td>


                    <button

                        type="button"

                        class="contact-read-btn"

                        onclick="markContactRead(${index})"

                    >

                        ✓ पढ़ा

                    </button>


                    <button

                        type="button"

                        class="contact-delete-btn"

                        onclick="deleteContact(${index})"

                    >

                        🗑 हटाएँ

                    </button>


                </td>


            </tr>


            `;


        }

    );


}


/* =====================================
   MARK MESSAGE AS READ
===================================== */


function markContactRead(

    index

) {


    let contacts =

    JSON.parse(

        localStorage.getItem(

            "contactMessages"

        )

    ) || [];


    if (

        contacts[index]

    ) {


        contacts[index].status =

        "पढ़ा गया";


        localStorage.setItem(

            "contactMessages",

            JSON.stringify(

                contacts

            )

        );


        loadContactMessages();


    }


}


/* =====================================
   DELETE CONTACT MESSAGE
===================================== */


function deleteContact(

    index

) {


    const confirmDelete =

    confirm(

        "क्या आप यह संपर्क संदेश हटाना चाहते हैं?"

    );


    if (

        !confirmDelete

    ) {


        return;


    }


    let contacts =

    JSON.parse(

        localStorage.getItem(

            "contactMessages"

        )

    ) || [];


    contacts.splice(

        index,

        1

    );


    localStorage.setItem(

        "contactMessages",

        JSON.stringify(

            contacts

        )

    );


    loadContactMessages();


}


/* =====================================
   CONTACT SEARCH
===================================== */


const contactSearch =

document.getElementById(

    "contactSearch"

);


if (

    contactSearch

) {


    contactSearch.addEventListener(

        "input",

        function() {


            const searchText =

            this.value

            .toLowerCase()

            .trim();


            const rows =

            document

            .querySelectorAll(

                "#contactTable tr"

            );


            rows.forEach(

                function(

                    row

                ) {


                    const rowText =

                    row.innerText

                    .toLowerCase();


                    if (

                        rowText.includes(

                            searchText

                        )

                    ) {


                        row.style.display =

                        "";


                    }


                    else {


                        row.style.display =

                        "none";


                    }


                }

            );


        }

    );


}


/* =====================================
   LOAD CONTACT MESSAGES
===================================== */


document.addEventListener(

    "DOMContentLoaded",

    function() {


        loadContactMessages();


    }

);
