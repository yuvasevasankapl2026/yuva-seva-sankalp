/* =====================================
   ADMIN LOGIN CHECK
===================================== */

if (localStorage.getItem("adminLoggedIn") !== "true") {

    window.location.href = "admin-login.html";

}


/* =====================================
   SAFE LOCAL STORAGE DATA
===================================== */

function getStorageData(storageKey) {

    try {

        const data = JSON.parse(
            localStorage.getItem(storageKey)
        );

        return Array.isArray(data) ? data : [];

    }

    catch (error) {

        console.error(
            storageKey + " data पढ़ने में समस्या:",
            error
        );

        return [];

    }

}


/* =====================================
   SAVE LOCAL STORAGE DATA
===================================== */

function saveStorageData(
    storageKey,
    data
) {

    localStorage.setItem(
        storageKey,
        JSON.stringify(data)
    );

}


/* =====================================
   HTML SAFE TEXT
===================================== */

function escapeHTML(value) {

    return String(
        value ?? ""
    )

    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


/* =====================================
   STATUS CLASS
===================================== */

function getStatusClass(status) {

    const currentStatus = String(
        status || "लंबित"
    )

    .toLowerCase()

    .trim();


    if (

        currentStatus === "स्वीकृत" ||

        currentStatus === "approved"

    ) {

        return "approved";

    }


    if (

        currentStatus === "अस्वीकृत" ||

        currentStatus === "rejected"

    ) {

        return "rejected";

    }


    if (

        currentStatus === "पढ़ा गया" ||

        currentStatus === "read"

    ) {

        return "read";

    }


    return "pending";

}


/* =====================================
   MEMBER TABLE
===================================== */

function showMembers(
    memberList
) {

    const memberTable =

    document.getElementById(
        "memberTable"
    );


    if (!memberTable) {

        return;

    }


    const members =

    getStorageData(
        "members"
    );


    const displayMembers =

    memberList || members;


    memberTable.innerHTML = "";


    if (

        displayMembers.length === 0

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


    displayMembers.forEach(

        function (
            member,
            displayIndex
        ) {


            const originalIndex =

            members.indexOf(
                member
            );


            const memberId =

            member.memberId ||

            member.id ||

            member.memberID ||

            "YSSF-" + (
                originalIndex + 1
            );


            const name =

            member.name ||

            member.fullName ||

            member.memberName ||

            "नाम उपलब्ध नहीं";


            const mobile =

            member.mobile ||

            member.phone ||

            member.mobileNumber ||

            "—";


            const membership =

            member.membership ||

            member.membershipType ||

            member.category ||

            "General";


            const status =

            member.status ||

            "लंबित";


            const statusClass =

            getStatusClass(
                status
            );


            memberTable.innerHTML += `

                <tr>

                    <td>

                        ${displayIndex + 1}

                    </td>


                    <td>

                        ${escapeHTML(memberId)}

                    </td>


                    <td>

                        ${escapeHTML(name)}

                    </td>


                    <td>

                        ${escapeHTML(mobile)}

                    </td>


                    <td>

                        ${escapeHTML(membership)}

                    </td>


                    <td>

                        <span
                            class="status ${statusClass}"
                        >

                            ${escapeHTML(status)}

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

                            🗑 Delete

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

function approveMember(index) {

    const members =

    getStorageData(
        "members"
    );


    if (!members[index]) {

        alert(
            "सदस्य आवेदन नहीं मिला।"
        );

        return;

    }


    members[index].status =

    "स्वीकृत";


    saveStorageData(
        "members",
        members
    );


    showMembers();


    alert(
        "✅ सदस्य आवेदन स्वीकृत कर दिया गया।"
    );

}


/* =====================================
   REJECT MEMBER
===================================== */

function rejectMember(index) {

    const members =

    getStorageData(
        "members"
    );


    if (!members[index]) {

        alert(
            "सदस्य आवेदन नहीं मिला।"
        );

        return;

    }


    members[index].status =

    "अस्वीकृत";


    saveStorageData(
        "members",
        members
    );


    showMembers();


    alert(
        "❌ सदस्य आवेदन अस्वीकृत कर दिया गया।"
    );

}


/* =====================================
   DELETE MEMBER
===================================== */

function deleteMember(index) {

    const confirmDelete =

    confirm(

        "क्या आप इस सदस्य को स्थायी रूप से हटाना चाहते हैं?"

    );


    if (!confirmDelete) {

        return;

    }


    const members =

    getStorageData(
        "members"
    );


    if (!members[index]) {

        alert(
            "सदस्य आवेदन नहीं मिला।"
        );

        return;

    }


    members.splice(
        index,
        1
    );


    saveStorageData(
        "members",
        members
    );


    const memberSearch =

    document.getElementById(
        "memberSearch"
    );


    if (memberSearch) {

        memberSearch.value = "";

    }


    showMembers();


    alert(
        "🗑 सदस्य सफलतापूर्वक हटा दिया गया।"
    );

}


/* =====================================
   VOLUNTEER TABLE
===================================== */

function showVolunteers(
    volunteerList
) {

    const volunteerTable =

    document.getElementById(
        "volunteerTable"
    );


    if (!volunteerTable) {

        return;

    }


    const volunteers =

    getStorageData(
        "volunteers"
    );


    const displayVolunteers =

    volunteerList || volunteers;


    volunteerTable.innerHTML = "";


    if (

        displayVolunteers.length === 0

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


    displayVolunteers.forEach(

        function (
            volunteer,
            displayIndex
        ) {


            const originalIndex =

            volunteers.indexOf(
                volunteer
            );


            const volunteerId =

            volunteer.volunteerId ||

            volunteer.id ||

            "VOL-" + (
                originalIndex + 1
            );


            const name =

            volunteer.name ||

            volunteer.fullName ||

            "नाम उपलब्ध नहीं";


            const mobile =

            volunteer.mobile ||

            volunteer.phone ||

            "—";


            const service =

            volunteer.service ||

            volunteer.serviceArea ||

            volunteer.work ||

            "—";


            const availability =

            volunteer.availability ||

            volunteer.availableTime ||

            "—";


            const status =

            volunteer.status ||

            "लंबित";


            const statusClass =

            getStatusClass(
                status
            );


            volunteerTable.innerHTML += `

                <tr>

                    <td>

                        ${displayIndex + 1}

                    </td>


                    <td>

                        ${escapeHTML(volunteerId)}

                    </td>


                    <td>

                        ${escapeHTML(name)}

                    </td>


                    <td>

                        ${escapeHTML(mobile)}

                    </td>


                    <td>

                        ${escapeHTML(service)}

                    </td>


                    <td>

                        ${escapeHTML(availability)}

                    </td>


                    <td>

                        <span
                            class="
                                volunteer-status
                                ${statusClass}
                            "
                        >

                            ${escapeHTML(status)}

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

                            🗑 Delete

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

function approveVolunteer(index) {

    const volunteers =

    getStorageData(
        "volunteers"
    );


    if (!volunteers[index]) {

        alert(
            "वॉलंटियर आवेदन नहीं मिला।"
        );

        return;

    }


    volunteers[index].status =

    "स्वीकृत";


    saveStorageData(
        "volunteers",
        volunteers
    );


    showVolunteers();


    alert(
        "✅ वॉलंटियर आवेदन स्वीकृत कर दिया गया।"
    );

}


/* =====================================
   REJECT VOLUNTEER
===================================== */

function rejectVolunteer(index) {

    const volunteers =

    getStorageData(
        "volunteers"
    );


    if (!volunteers[index]) {

        alert(
            "वॉलंटियर आवेदन नहीं मिला।"
        );

        return;

    }


    volunteers[index].status =

    "अस्वीकृत";


    saveStorageData(
        "volunteers",
        volunteers
    );


    showVolunteers();


    alert(
        "❌ वॉलंटियर आवेदन अस्वीकृत कर दिया गया।"
    );

}


/* =====================================
   DELETE VOLUNTEER
===================================== */

function deleteVolunteer(index) {

    const confirmDelete =

    confirm(

        "क्या आप इस वॉलंटियर आवेदन को हटाना चाहते हैं?"

    );


    if (!confirmDelete) {

        return;

    }


    const volunteers =

    getStorageData(
        "volunteers"
    );


    if (!volunteers[index]) {

        alert(
            "वॉलंटियर आवेदन नहीं मिला।"
        );

        return;

    }


    volunteers.splice(
        index,
        1
    );


    saveStorageData(
        "volunteers",
        volunteers
    );


    const volunteerSearch =

    document.getElementById(
        "volunteerSearch"
    );


    if (volunteerSearch) {

        volunteerSearch.value = "";

    }


    showVolunteers();


    alert(
        "🗑 वॉलंटियर आवेदन हटा दिया गया।"
    );

}


/* =====================================
   CONTACT MESSAGE TABLE
===================================== */

function loadContactMessages(
    contactList
) {

    const contactTable =

    document.getElementById(
        "contactTable"
    );


    if (!contactTable) {

        return;

    }


    const contacts =

    getStorageData(
        "contactMessages"
    );


    const displayContacts =

    contactList || contacts;


    contactTable.innerHTML = "";


    if (

        displayContacts.length === 0

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


    displayContacts.forEach(

        function (
            contact,
            displayIndex
        ) {


            const originalIndex =

            contacts.indexOf(
                contact
            );


            const contactId =

            contact.contactId ||

            contact.id ||

            "MSG-" + (
                originalIndex + 1
            );


            const name =

            contact.name ||

            "—";


            const mobile =

            contact.mobile ||

            contact.phone ||

            "—";


            const email =

            contact.email ||

            "—";


            const subject =

            contact.subject ||

            "—";


            const message =

            contact.message ||

            "—";


            const date =

            contact.date ||

            contact.createdAt ||

            "—";


            const status =

            contact.status ||

            "नया";


            const statusClass =

            getStatusClass(
                status
            );


            contactTable.innerHTML += `

                <tr>

                    <td>

                        ${displayIndex + 1}

                    </td>


                    <td>

                        ${escapeHTML(contactId)}

                    </td>


                    <td>

                        ${escapeHTML(name)}

                    </td>


                    <td>

                        ${escapeHTML(mobile)}

                    </td>


                    <td>

                        ${escapeHTML(email)}

                    </td>


                    <td>

                        ${escapeHTML(subject)}

                    </td>


                    <td>

                        ${escapeHTML(message)}

                    </td>


                    <td>

                        ${escapeHTML(date)}

                    </td>


                    <td>

                        <span
                            class="
                                contact-status
                                ${statusClass}
                            "
                        >

                            ${escapeHTML(status)}

                        </span>

                    </td>


                    <td>

                        <button
                            type="button"
                            class="contact-read-btn"
                            onclick="markContactRead(
                                ${originalIndex}
                            )"
                        >

                            ✓ पढ़ा

                        </button>


                        <button
                            type="button"
                            class="contact-delete-btn"
                            onclick="deleteContact(
                                ${originalIndex}
                            )"
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
   MARK CONTACT AS READ
===================================== */

function markContactRead(index) {

    const contacts =

    getStorageData(
        "contactMessages"
    );


    if (!contacts[index]) {

        alert(
            "संपर्क संदेश नहीं मिला।"
        );

        return;

    }


    contacts[index].status =

    "पढ़ा गया";


    saveStorageData(
        "contactMessages",
        contacts
    );


    loadContactMessages();


    alert(
        "✓ संदेश को पढ़ा गया कर दिया गया।"
    );

}


/* =====================================
   DELETE CONTACT
===================================== */

function deleteContact(index) {

    const confirmDelete =

    confirm(

        "क्या आप यह संपर्क संदेश हटाना चाहते हैं?"

    );


    if (!confirmDelete) {

        return;

    }


    const contacts =

    getStorageData(
        "contactMessages"
    );


    if (!contacts[index]) {

        alert(
            "संपर्क संदेश नहीं मिला।"
        );

        return;

    }


    contacts.splice(
        index,
        1
    );


    saveStorageData(
        "contactMessages",
        contacts
    );


    const contactSearch =

    document.getElementById(
        "contactSearch"
    );


    if (contactSearch) {

        contactSearch.value = "";

    }


    loadContactMessages();


    alert(
        "🗑 संपर्क संदेश हटा दिया गया।"
    );

}


/* =====================================
   DASHBOARD COUNTS
===================================== */

function updateDashboard() {

    const members =

    getStorageData(
        "members"
    );


    const totalMembers =

    members.length;


    const approvedMembers =

    members.filter(

        function (member) {

            const status =

            String(
                member.status || ""
            )

            .toLowerCase();


            return (

                status === "स्वीकृत" ||

                status === "approved"

            );

        }

    ).length;


    const pendingMembers =

    members.filter(

        function (member) {

            const status =

            String(
                member.status || "लंबित"
            )

            .toLowerCase();


            return (

                status === "लंबित" ||

                status === "pending" ||

                status === ""

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


    if (totalElement) {

        totalElement.textContent =

        totalMembers;

    }


    if (newElement) {

        newElement.textContent =

        pendingMembers;

    }


    if (approvedElement) {

        approvedElement.textContent =

        approvedMembers;

    }


    if (pendingElement) {

        pendingElement.textContent =

        pendingMembers;

    }

}


/* =====================================
   MEMBER SEARCH
===================================== */

function setupMemberSearch() {

    const memberSearch =

    document.getElementById(
        "memberSearch"
    );


    if (!memberSearch) {

        return;

    }


    memberSearch.addEventListener(

        "input",

        function () {


            const searchText =

            this.value

            .toLowerCase()

            .trim();


            const members =

            getStorageData(
                "members"
            );


            const filteredMembers =

            members.filter(

                function (member) {


                    const searchableText =

                    [

                        member.memberId,

                        member.id,

                        member.memberID,

                        member.name,

                        member.fullName,

                        member.memberName,

                        member.mobile,

                        member.phone,

                        member.mobileNumber,

                        member.membership,

                        member.membershipType

                    ]

                    .join(" ")

                    .toLowerCase();


                    return (

                        searchableText.includes(
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

function setupVolunteerSearch() {

    const volunteerSearch =

    document.getElementById(
        "volunteerSearch"
    );


    if (!volunteerSearch) {

        return;

    }


    volunteerSearch.addEventListener(

        "input",

        function () {


            const searchText =

            this.value

            .toLowerCase()

            .trim();


            const volunteers =

            getStorageData(
                "volunteers"
            );


            const filteredVolunteers =

            volunteers.filter(

                function (volunteer) {


                    const searchableText =

                    [

                        volunteer.volunteerId,

                        volunteer.id,

                        volunteer.name,

                        volunteer.fullName,

                        volunteer.mobile,

                        volunteer.phone,

                        volunteer.service,

                        volunteer.serviceArea

                    ]

                    .join(" ")

                    .toLowerCase();


                    return (

                        searchableText.includes(
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
   CONTACT SEARCH
===================================== */

function setupContactSearch() {

    const contactSearch =

    document.getElementById(
        "contactSearch"
    );


    if (!contactSearch) {

        return;

    }


    contactSearch.addEventListener(

        "input",

        function () {


            const searchText =

            this.value

            .toLowerCase()

            .trim();


            const contacts =

            getStorageData(
                "contactMessages"
            );


            const filteredContacts =

            contacts.filter(

                function (contact) {


                    const searchableText =

                    [

                        contact.contactId,

                        contact.id,

                        contact.name,

                        contact.mobile,

                        contact.phone,

                        contact.email,

                        contact.subject,

                        contact.message

                    ]

                    .join(" ")

                    .toLowerCase();


                    return (

                        searchableText.includes(
                            searchText
                        )

                    );

                }

            );


            loadContactMessages(
                filteredContacts
            );

        }

    );

}


/* =====================================
   PAGE LOAD
===================================== */

document.addEventListener(

    "DOMContentLoaded",

    function () {


        showMembers();


        showVolunteers();


        loadContactMessages();


        updateDashboard();


        setupMemberSearch();


        setupVolunteerSearch();


        setupContactSearch();


    }

);
