const API = {
    CREATE: {
        URL: "create.json",
        METHOD: "GET" // POST
    },
    READ: {
        URL: "team.json",
        METHOD: "GET"
    },
    UPDATE: {
        URL: "",
        METHOD: "GET"
    },
    DELETE: {
        URL: "delete.json",
        METHOD: "GET"
    }
};

API.READ.URL

function insertPersons(persons) {
    const tBody = document.querySelector("#list tbody");
    tBody.innerHTML = getPersonsHtml(persons);
}

function getPersonsHtml(persons) {
    return persons.map(getPersonHtml).join("");
}

function getPersonHtml(person) {
    return `<tr>
    <td>${person.firstName}</td>
    <td>${person.lastName}</td>
    <td>
        <a href= ${person.github}>here</a>
    </td>
        <td>
            <a href="${API.DELETE.URL}?id=${person.id}">&#10006;</a>
        </td>
 </tr>`;
}

function clearInputFields() {
    document.querySelectorAll("input").forEach(input => {
        input.value = "";
    });
}


let allPersons = [];

fetch("team.json")
    .then(res => res.json())
    .then((data) => {
        allPersons = data;
        insertPersons(data);
    });

function searchPersons(text) {
    text = text.toLowerCase();
    console.log(text);
    return allPersons.filter(person => {
        return person.firstName.toLowerCase().indexOf(text) > -1 ||
            person.lastName.toLowerCase().indexOf(text) > -1;
    });
}
 
function saveMember() {
    const firstName = document.querySelector("input[name=firstName]").value;
    const lastName = document.querySelector("input[name=lastName]").value;
    const gitHub = document.querySelector("input[name=gitHub]").value;
    const person = {
        firstName, 
        lastName, 
        gitHub: gitHub

    };
    console.info('saving...', person, JSON.stringify(person));

    fetch(API.CREATE.URL, {
    method:  API.CREATE.METHOD, 
    body: API.CREATE.METHOD === "GET" ? null : JSON.stringify(person)
        })
        .then(res => res.json())
        .then(r => {
            console.warn(r);
            if (r.succes) {
                alert('saving data..., please wait until we are ready.');
                setTimeout(() => {
                    console.info('refresh list');
                    loadList();
            }, 30000);

                
            }
        
        });
}


const saveBtn = document.querySelector("#list button");
saveBtn.addEventListener("click", () => {
    saveMember();

});