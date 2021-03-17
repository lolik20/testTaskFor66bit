
async function CreatePlayer(playerName, playerSurName, dd, mm, yyyy, gender, countryName, teamName) {


    const response = await fetch("api/Fut/player/add", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            Name: playerName,
            SecondName: playerSurName,
            Gender: gender,
            Birthday: dd + "." + mm + "." + yyyy,
            Country: countryName,
            TeamName: teamName

        })
    });


}
// Получение одного пользователя
async function GetAllTeams() {
    const response = await fetch("api/Fut/team/all", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    const teams = await response.json();
    //const form = document.forms["addForm"];
    teams.forEach(team => {
        // добавляем полученные элементы в таблицу
        var form = document.getElementById('teamSelect');
        const element = document.createElement('option');
        element.text = team.title;
        //element.setAttribute("class", team.id);
        form.appendChild(element);
    });
    
    console.log(teams);

}
async function showGenderSelect() {
    var e = document.getElementById("genderSelect");
    e.setAttribute("style", "display:block;")

}
async function teamSelect() {

    var e = document.getElementById("teamSelect");

    var strUser = e.options[e.selectedIndex].value;
    var input = document.getElementById("teamInput");

    input.className = e.options[e.selectedIndex].className;
    input.value = strUser;
    
}
async function genderSelect() {

    var e = document.getElementById("genderSelect");

    var strUser = e.options[e.selectedIndex].value;
    var input = document.getElementById("genderInput");

    input.className = strUser;
}

async function countrySelect() {

    var e = document.getElementById("countrySelect");
    var strUser = e.options[e.selectedIndex].value;
    var input = document.getElementById("countryInput");
    input.className = strUser;

}
document.forms["addForm"].addEventListener("submit", e => {
    e.preventDefault();
    const form = document.forms["addForm"];

    const name = form.elements["Name"].value;
    const secondName = form.elements["SecondName"].value;
    const gender = form.elements["genderInput"].className;
    const dd = form.elements["dd"].value;
    const mm = form.elements["mm"].value;
    const yyyy = form.elements["yyyy"].value;
    const countryName = form.elements["countryInput"].className;
    const teamName = form.elements["teamInput"].value;
    //const teamId;
    console.log(name, secondName, gender, dd, mm, yyyy, countryName, teamName);
    if (dd <= 0 ||dd>31|| mm <= 0||mm>12 || yyyy <= 0 || yyyy<=1930|| yyyy >=2003) {
        throw "ERROR";
    }
    CreatePlayer(name, secondName, dd, mm, yyyy, gender,countryName, teamName);

});
function GoUrl(url) {
    location.href = url;
}
GetAllTeams();