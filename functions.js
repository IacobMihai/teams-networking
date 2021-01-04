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
        <button class="delete-member">Delete</button>
         </td>
 </tr>`;
}

function clearInputFields() {
    document.querySelectorAll("input").forEach(input => {
        input.value = "";
    });
}


let allPersons = [];

fetch("data/team.json")
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

const search = document.getElementById("search");
search.addEventListener("input", e => {
    const text = e.target.value;

    const filtrate = searchPersons(text);

    insertPersons(filtrate);
});
