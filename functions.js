console.log('orice test')

function writeHtml(){
    console.log("writeHtml");
    document.querySelector("#tableData tbody")
}

fetch("team.json")
.then(function (response) {
    return response.json();
}).then(function (){
    writeHtml();
});