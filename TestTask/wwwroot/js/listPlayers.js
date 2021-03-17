function listPlayers(player) {

    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", player.id);

    const name = document.createElement("td");
    name.append(player.name);
    tr.append(name);

    const surName = document.createElement("td");
    surName.append(player.secondName);
    tr.append(surName);

    const gender = document.createElement("td");
    gender.append(player.gender);
    tr.append(gender);

    const birthday = document.createElement("td");
    birthday.append(player.birthday);
    tr.append(birthday);

    const title = document.createElement("td");
    title.append(player.title);
    tr.append(title);

    const country = document.createElement("td");
    country.append(player.country);
    tr.append(country);

    const button = document.createElement("button");
    button.setAttribute("id", player.id);
    button.setAttribute("onclick", "func(this);");
    button.setAttribute("style", "padding:6px;background:greenyellow;");
    button.append("Изменить");
    tr.append(button);

    

    return tr;

}
async function func(obj) {
    GetPlayer(obj.id);
    const input = document.getElementById("input");
    input.setAttribute("value",obj.id);
}
async function GetPlayers() {
    const response = await fetch("api/Fut/players/all", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    // если запрос прошел нормально
    if (response.ok === true) {
        // получаем данные

        const players = await response.json();

        let rows = document.querySelector("#players");
        
        players.forEach(player => {
            rows.append(listPlayers(player));
        });
    }
}


GetPlayers();