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
   SAFE LOCAL STORAGE DATA
===================================== */

function getStorageData(

    key

) {

    try {

        const data =

        JSON.parse(

            localStorage.getItem(

                key

            )

        );


        return Array.isArray(

            data

        )

        ? data

        : [];


    }

    catch (

        error

    ) {

        console.error(

            key +

            " डेटा पढ़ने में समस्या:",

            error

        );


        return [];

    }

}


/* =====================================
   MEMBER DATA
===================================== */

let members =

getStorageData(

    "members"

);


/* =====================================
   VOLUNTEER DATA
===================================== */

let volunteers =

getStorageData(

    "volunteers"

);


/* =====================================
   CONTACT DATA
===================================== */

let contacts =

getStorageData(

    "contactMessages"

);


/* =====================================
   SAVE MEMBER DATA
===================================== */

function saveMembers() {

    localStorage.setItem(

        "members",

        JSON.stringify(

            members

        )

    );

}


/* =====================================
   SAVE VOLUNTEER DATA
===================================== */

function saveVolunteers() {

    localStorage.setItem(

        "volunteers",

        JSON.stringify(

            volunteers

        )

    );

}


/* =====================================
   SAVE CONTACT DATA
===================================== */

function saveContacts() {

    localStorage.setItem(

        "contactMessages",

        JSON.stringify(

            contacts

        )

    );

}


/* =====================================
   MEMBER STATUS CLASS
===================================== */

function getMemberStatusClass(

    status

) {

    const currentStatus =

    String(

        status || "लंबित"

    )

    .toLowerCase();


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


    return "pending";

}


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


    memberList.forEach(

        function(

            member,

            displayIndex

        ) {


            const originalIndex =

            members.indexOf(

                member

            );


            const memberId =

            member.memberId ||

            member.memberID ||

            member.id ||

            "YSSF-" +

            (

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

            "-";


            const membership =

            member.membership ||

            member.membershipType ||

            member.category ||

            "-";


            const status =

            member.status ||

            "लंबित";


            const statusClass =

            getMemberStatusClass(

                status

            );


            memberTable.innerHTML += `

                <tr>

                    <td>

                        ${displayIndex + 1}

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

                        <span

                            class="status ${statusClass}"

                        >

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

function approveMember(

    index

) {

    if (

        !members[index]

    ) {

        alert(

            "सदस्य आवेदन नहीं मिला।"

        );

        return;

    }


    members[index].status =

    "स्वीकृत";


    saveMembers();


    showMembers();


    alert(

        "✅ सदस्य को स्वीकृत कर दिया गया।"

    );

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

        alert(

            "सदस्य आवेदन नहीं मिला।"

        );

        return;

    }


    members[index].status =

    "अस्वीकृत";


    saveMembers();


    showMembers();


    alert(

        "❌ सदस्य आवेदन अस्वीकृत कर दिया गया।"

    );

}


/* =====================================
   DELETE MEMBER
===================================== */

function deleteMember(

    index

) {

    if (

        !members[index]

    ) {

        alert(

            "सदस्य आवेदन नहीं मिला।"

        );

        return;

    }


    const confirmDelete =

    confirm(

        "क्या आप इस सदस्य को स्थायी रूप से हटाना चाहते हैं?"

    );


    if (

        !confirmDelete

    ) {

        return;

    }


    members.splice(

        index,

        1

    );


    saveMembers();


    showMembers();


    alert(

        "🗑 सदस्य सफलतापूर्वक हटा दिया गया।"

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

            displayIndex

        ) {


            const originalIndex =

            volunteers.indexOf(

                volunteer

            );


            const volunteerId =

            volunteer.volunteerId ||

            volunteer.id ||

            "VOL-" +

            (

                originalIndex + 1

            );


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

            volunteer.area ||

            "-";


            const availability =

            volunteer.availability ||

            volunteer.availableTime ||

            "-";


            const status =

            volunteer.status ||

            "लंबित";


            const statusClass =

            getMemberStatusClass(

                status

            );


            volunteerTable.innerHTML += `

                <tr>

                    <td>

                        ${displayIndex + 1}

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

                        <span

                            class="status ${statusClass}"

                        >

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

function approveVolunteer(

    index

) {

    if (

        !volunteers[index]

    ) {

        alert(

            "वॉलंटियर आवेदन नहीं मिला।"

        );

        return;

    }


    volunteers[index].status =

    "स्वीकृत";


    saveVolunteers();


    showVolunteers();


    alert(

        "✅ वॉलंटियर आवेदन स्वीकृत कर दिया गया।"

    );

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

        alert(

            "वॉलंटियर आवेदन नहीं मिला।"

        );

        return;

    }


    volunteers[index].status =

    "अस्वीकृत";


    saveVolunteers();


    showVolunteers();


    alert(

        "❌ वॉलंटियर आवेदन अस्वीकृत कर दिया गया।"

    );

}


/* =====================================
   DELETE VOLUNTEER
===================================== */

function deleteVolunteer(

    index

) {

    if (

        !volunteers[index]

    ) {

        alert(

            "वॉलंटियर आवेदन नहीं मिला।"

        );

        return;

    }


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


    saveVolunteers();


    showVolunteers();


    alert(

        "🗑 वॉलंटियर आवेदन हटा दिया गया।"

    );

}


/* =====================================
   CONTACT TABLE
===================================== */

function loadContactMessages(

    contactList = contacts

) {

    const contactTable =

    document.getElementById(

        "contactTable"

    );


    if (

        !contactTable

    ) {

        return;

    }


    contactTable.innerHTML = "";


    if (

        contactList.length === 0

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


    contactList.forEach(

        function(

            contact,

            displayIndex

        ) {


            const originalIndex =

            contacts.indexOf(

                contact

            );


            const status =

            contact.status ||

            "नया";


            contactTable.innerHTML += `

                <tr>

                    <td>

                        ${displayIndex + 1}

                    </td>


                    <td>

                        ${

                            contact.contactId ||

                            contact.id ||

                            "-"

                        }

                    </td>


                    <td>

                        ${

                            contact.name ||

                            "-"

                        }

                    </td>


                    <td>

                        ${

                            contact.mobile ||

                            contact.phone ||

                            "-"

                        }

                    </td>


                    <td>

                        ${

                            contact.email ||

                            "-"

                        }

                    </td>


                    <td>

                        ${

                            contact.subject ||

                            "-"

                        }

                    </td>


                    <td>

                        ${

                            contact.message ||

                            "-"

                        }

                    </td>


                    <td>

                        ${

                            contact.date ||

                            contact.createdAt ||

                            "-"

                        }

                    </td>


                    <td>

                        <span

                            class="contact-status"

                        >

                            ${status}

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

function markContactRead(

    index

) {

    if (

        !contacts[index]

    ) {

        alert(

            "संपर्क संदेश नहीं मिला।"

        );

        return;

    }


    contacts[index].status =

    "पढ़ा गया";


    saveContacts();


    loadContactMessages();


    alert(

        "✓ संदेश को पढ़ा गया के रूप में चिन्हित कर दिया गया।"

    );

}


/* =====================================
   DELETE CONTACT
===================================== */

function deleteContact(

    index

) {

    if (

        !contacts[index]

    ) {

        alert(

            "संपर्क संदेश नहीं मिला।"

        );

        return;

    }


    const confirmDelete =

    confirm(

        "क्या आप यह संपर्क संदेश हटाना चाहते हैं?"

    );


    if (

        !confirmDelete

    ) {

        return;

    }


    contacts.splice(

        index,

        1

    );


    saveContacts();


    loadContactMessages();


    alert(

        "🗑 संपर्क संदेश हटा दिया गया।"

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

            const status =

            String(

                member.status ||

                ""

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

        function(

            member

        ) {

            const status =

            String(

                member.status ||

                "लंबित"

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

function setupMemberSearch() {

    const memberSearch =

    document.getElementById(

        "memberSearch"

    );


    if (

        !memberSearch

    ) {

        return;

    }


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


                    const memberId =

                    String(

                        member.memberId ||

                        member.memberID ||

                        member.id ||

                        ""

                    )

                    .toLowerCase();


                    const name =

                    String(

                        member.name ||

                        member.fullName ||

                        member.memberName ||

                        ""

                    )

                    .toLowerCase();


                    const mobile =

                    String(

                        member.mobile ||

                        member.phone ||

                        member.mobileNumber ||

                        ""

                    );


                    return (

                        memberId.includes(

                            searchText

                        )

                        ||

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


    if (

        !volunteerSearch

    ) {

        return;

    }


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


                    const volunteerId =

                    String(

                        volunteer.volunteerId ||

                        volunteer.id ||

                        ""

                    )

                    .toLowerCase();


                    const name =

                    String(

                        volunteer.name ||

                        volunteer.fullName ||

                        ""

                    )

                    .toLowerCase();


                    const mobile =

                    String(

                        volunteer.mobile ||

                        volunteer.phone ||

                        ""

                    );


                    return (

                        volunteerId.includes(

                            searchText

                        )

                        ||

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


    if (

        !contactSearch

    ) {

        return;

    }


    contactSearch.addEventListener(

        "input",

        function() {


            const searchText =

            this.value

            .toLowerCase()

            .trim();


            const filteredContacts =

            contacts.filter(

                function(

                    contact

                ) {


                    const name =

                    String(

                        contact.name ||

                        ""

                    )

                    .toLowerCase();


                    const mobile =

                    String(

                        contact.mobile ||

                        contact.phone ||

                        ""

                    );


                    const subject =

                    String(

                        contact.subject ||

                        ""

                    )

                    .toLowerCase();


                    return (

                        name.includes(

                            searchText

                        )

                        ||

                        mobile.includes(

                            searchText

                        )

                        ||

                        subject.includes(

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

    function() {


        members =

        getStorageData(

            "members"

        );


        volunteers =

        getStorageData(

            "volunteers"

        );


        contacts =

        getStorageData(

            "contactMessages"

        );


        showMembers();


        showVolunteers();


        loadContactMessages();


        updateDashboard();


        setupMemberSearch();


        setupVolunteerSearch();


        setupContactSearch();


    }

);
