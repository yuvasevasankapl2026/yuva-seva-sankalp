/* =====================================
   BLOOD DONOR LIST
===================================== */


const donorTable =

document.getElementById(

    "donorTable"

);


const donorSearch =

document.getElementById(

    "donorSearch"

);


/* =====================================
   DONOR DATA LOAD
===================================== */

function loadDonors() {


    const bloodDonors =

    JSON.parse(

        localStorage.getItem(

            "bloodDonors"

        )

    ) || [];


    donorTable.innerHTML = "";


    /* कोई रक्तदाता नहीं */

    if (

        bloodDonors.length === 0

    ) {


        donorTable.innerHTML =

        `

        <tr>

            <td colspan="9">

                अभी कोई रक्तदाता पंजीकृत नहीं है।

            </td>

        </tr>

        `;


        return;


    }


    /* सभी रक्तदाता दिखाएँ */

    bloodDonors.forEach(

        function(

            donor,

            index

        ) {


            donorTable.innerHTML +=

            `

            <tr>


                <td>

                    ${index + 1}

                </td>


                <td>

                    ${donor.donorId}

                </td>


                <td>

                    ${donor.name}

                </td>


                <td>

                    ${donor.mobile}

                </td>


                <td>

                    🩸 ${donor.bloodGroup}

                </td>


                <td>

                    ${donor.age} वर्ष

                </td>


                <td>

                    ${donor.address}

                </td>


                <td>

                    ✅ ${donor.status}

                </td>


                <td>


                    <button

                        type="button"

                        onclick="deleteDonor(${index})"

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
   DONOR SEARCH
===================================== */

donorSearch.addEventListener(

    "input",

    function() {


        const searchValue =

        donorSearch.value

        .toLowerCase()

        .trim();


        const rows =

        donorTable.querySelectorAll(

            "tr"

        );


        rows.forEach(

            function(row) {


                const rowText =

                row.innerText

                .toLowerCase();


                if (

                    rowText.includes(

                        searchValue

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


/* =====================================
   DELETE DONOR
===================================== */

function deleteDonor(

    index

) {


    const confirmDelete =

    confirm(

        "क्या आप इस रक्तदाता की जानकारी हटाना चाहते हैं?"

    );


    if (

        !confirmDelete

    ) {


        return;


    }


    const bloodDonors =

    JSON.parse(

        localStorage.getItem(

            "bloodDonors"

        )

    ) || [];


    bloodDonors.splice(

        index,

        1

    );


    localStorage.setItem(

        "bloodDonors",

        JSON.stringify(

            bloodDonors

        )

    );


    loadDonors();


}


/* =====================================
   PAGE LOAD
===================================== */

loadDonors();
