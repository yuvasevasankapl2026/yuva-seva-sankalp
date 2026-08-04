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


    /* MEMBER नहीं होने पर */

    if (

        memberList.length === 0

    ) {


        memberTable.innerHTML = `

        <tr>

            <td
                colspan="7"
                style="
                    text-align:center;
                    padding:25px;
                "
            >

                अभी कोई सदस्य आवेदन उपलब्ध नहीं है।

            </td>

        </tr>

        `;


        updateDashboard();


        return;

    }


    /* MEMBER DATA दिखाएँ */

    memberList.forEach(

        function(

            member,

            index

        ) {


            const originalIndex =

            members.indexOf(

                member

            );


            const memberId =

            member.memberId ||

            member.id ||

            member.memberID ||

            "-";


            const name =

            member.name ||

            member.fullName ||

            member.memberName ||

            "-";


            const mobile =

            member.mobile ||

            member.phone ||

            member.mobileNumber ||

            "-";


            const membership =

            member.membership ||

            member.membershipType ||

            member.category ||

            "-";


            const status =

            member.status ||

            "लंबित";


            memberTable.innerHTML += `

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
                        class="approve-btn"
                        onclick="approveMember(
                            ${originalIndex}
                        )"
                    >

                        ✅ Approve

                    </button>


                    <button
                        type="button"
                        class="reject-btn"
                        onclick="rejectMember(
                            ${originalIndex}
                        )"
                    >

                        ❌ Reject

                    </button>


                    <button
                        type="button"
                        class="delete-btn"
                        onclick="deleteMember(
                            ${originalIndex}
                        )"
                    >

                        🗑️ Delete

                    </button>


                </td>


            </tr>

            `;

        }

    );


    updateDashboard();

}


/* =====================================
   APPROVE MEMBER
===================================== */

function approveMember(

    index

) {


    if (

        !members[index]

    ) {

        return;

    }


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


    if (

        !members[index]

    ) {

        return;

    }


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
   DELETE MEMBER
===================================== */

function deleteMember(

    index

) {


    const confirmDelete =

    confirm(

        "क्या आप इस सदस्य आवेदन को हटाना चाहते हैं?"

    );


    if (

        !confirmDelete

    ) {

        return;

    }


    if (

        !members[index]

    ) {

        alert(

            "सदस्य आवेदन नहीं मिला।"

        );

        return;

    }


    /* MEMBER हटाएँ */

    members.splice(

        index,

        1

    );


    /* नया DATA SAVE करें */

    localStorage.setItem(

        "members",

        JSON.stringify(

            members

        )

    );


    /* TABLE फिर से LOAD करें */

    showMembers();


    alert(

        "✅ सदस्य आवेदन सफलतापूर्वक हटा दिया गया।"

    );

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


        volunteerTable.innerHTML = `

        <tr>

            <td
                colspan="8"
                style="
                    text-align:center;
                    padding:25px;
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


            const originalIndex =

            volunteers.indexOf(

                volunteer

            );


            const volunteerId =

            volunteer.volunteerId ||

            volunteer.id ||

            "-";


            const name =

            volunteer.name ||

            volunteer.fullName ||

            "-";


            const mobile =

            volunteer.mobile ||

            volunteer.phone ||

            "-";


            const service =

            volunteer.service ||

            volunteer.serviceArea ||

            "-";


            const availability =

            volunteer.availability ||

            "-";


            const status =

            volunteer.status ||

            "लंबित";


            volunteerTable.innerHTML += `

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
                        onclick="approveVolunteer(
                            ${originalIndex}
                        )"
                    >

                        ✅ Approve

                    </button>


                    <button
                        type="button"
                        class="reject-btn"
                        onclick="rejectVolunteer(
                            ${originalIndex}
                        )"
                    >

                        ❌ Reject

                    </button>


                    <button
                        type="button"
                        class="delete-btn"
                        onclick="deleteVolunteer(
                            ${originalIndex}
                        )"
                    >

                        🗑️ Delete

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


    if (

        !volunteers[index]

    ) {

        return;

    }


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


    if (

        !volunteers[index]

    ) {

        return;

    }


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
   DELETE VOLUNTEER
===================================== */

function deleteVolunteer(

    index

) {


    const confirmDelete =

    confirm(

        "क्या आप इस वॉलंटियर आवेदन को हटाना चाहते हैं?"

    );


    if (

        !confirmDelete

    ) {

        return;

    }


    volunteers.splice(

        index,

        1

    );


    localStorage.setItem(

        "volunteers",

        JSON.stringify(

            volunteers

        )

    );


    showVolunteers();


    alert(

        "✅ वॉलंटियर आवेदन हटा दिया गया।"

    );

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

                            volunteer.id ||

                            ""

                        )

                        .toLowerCase()

                        .includes(

                            searchText

                        )

                        ||

                        String(

                            volunteer.name ||

                            volunteer.fullName ||

                            ""

                        )

                        .toLowerCase()

                        .includes(

                            searchText

                        )

                        ||

                        String(

                            volunteer.mobile ||

                            volunteer.phone ||

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

                    ${contact.contactId || "-"}

                </td>


                <td>

                    ${contact.name || "-"}

                </td>


                <td>

                    ${contact.mobile || "-"}

                </td>


                <td>

                    ${contact.email || "-"}

                </td>


                <td>

                    ${contact.subject || "-"}

                </td>


                <td>

                    ${contact.message || "-"}

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
                        onclick="markContactRead(
                            ${index}
                        )"
                    >

                        ✓ पढ़ा

                    </button>


                    <button
                        type="button"
                        class="contact-delete-btn"
                        onclick="deleteContact(
                            ${index}
                        )"
                    >

                        🗑️ हटाएँ

                    </button>


                </td>


            </tr>

            `;

        }

    );

}


/* =====================================
   MARK CONTACT READ
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

        !contacts[index]

    ) {

        return;

    }


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


/* =====================================
   DELETE CONTACT
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

            document.querySelectorAll(

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

                        row.style.display = "";

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
   PAGE LOAD
===================================== */

document.addEventListener(

    "DOMContentLoaded",

    function() {


        showMembers();


        showVolunteers();


        loadContactMessages();


        updateDashboard();


    }

);
