function GoUrl(url) {
    location.href = url;
}
async function genderSelect() {

    var e = document.getElementById("genderSelect");

    var strUser = e.options[e.selectedIndex].value;
    var input = document.getElementById("genderInput");

    input.className = strUser;
}
async function teamSelect() {

    var e = document.getElementById("teamSelect");

    var strUser = e.options[e.selectedIndex].value;
    var input = document.getElementById("teamInput");

    input.className = e.options[e.selectedIndex].className;
    input.value = strUser;

}

async function GetPlayer(id) {
    const response = await fetch("/api/fut/player/" + id, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const player = await response.json();
        const form = document.forms["editForm"];
        form.elements["Name"].value = player.name;
        form.elements["SecondName"].value = player.secondName;
        form.elements["genderInput"].className = player.gender;
        form.elements["dd"].value =1;
        form.elements["mm"].value =1;
        form.elements["yyyy"].value = 1970;
        form.elements["team"].value = player.teamId;
    }
}
                        
async function EditPlayer(playerId, playerName, playerSecondName, playerGender,dd,mm,yyyy,teamId) {
    const response = await fetch("api/Fut/player/edit", {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            id: playerId,
            name: playerName,
            secondName: playerSecondName,
            gender: playerGender,
            birthday: dd + "." + mm + "." + yyyy,
            teamId: teamId
        })

    });
    console.log(response);

}
document.forms["editForm"].addEventListener("submit", e => {
    e.preventDefault();
    const form = document.forms["editForm"];
    const id = form.elements["id"].value;
    const name = form.elements["Name"].value;
    const secondName = form.elements["SecondName"].value;
    const gender = form.elements["genderInput"].className;
    const dd = form.elements["dd"].value;
    const mm = form.elements["mm"].value;
    const yyyy = form.elements["yyyy"].value;
    const teamId = form.elements["team"].value;
    //const teamId;
    console.log(id, name, secondName, gender, dd, mm, yyyy);
    if (dd <= 0 || dd > 31 || mm <= 0 || mm > 12 || yyyy <= 0 || yyyy <= 1930 || yyyy >= 2003) {
        throw "ERROR";
    }
    EditPlayer(id, name, secondName, gender, dd, mm, yyyy, teamId);
});
