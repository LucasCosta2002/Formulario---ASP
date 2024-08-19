function saveCookie(name, value, days) {
    let expires = "";

    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function checkVisit() {
    let visited = getCookie("visited");

    if (visited === "") {
        alert("Esta es la primera vez que se carga la pagina");
        saveCookie("visited", "true", 365);
    } else {
        document.getElementById("message").innerText = "Esta página ya fue visitada";
    }

    let nombre = getCookie("Nombre");  
    let apellido = getCookie("Apellido"); 

    if (nombre && apellido) {
        document.getElementById("nombre").value = nombre;
        document.getElementById("apellido").value = apellido;
    }
}

function getCookie(nombre) {
    let nombreEQ = nombre + "=";

    let ca = document.cookie.split(';');

    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nombreEQ) === 0) return c.substring(nombreEQ.length, c.length);
    }
    return "";
}

function saveData() {
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;

    saveCookie("Nombre", nombre, 2);
    saveCookie("Apellido", apellido, 2);

    alert("Los datos fueron registrados en coockies")

    setTimeout(() => {
        nombre.value = "";
        apellido.value = "";
        reloadPage()
    }, 2000);
}

function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function clearCookies() {
    deleteCookie("visited");
    deleteCookie("Nombre");
    deleteCookie("Apellido");

    reloadPage();
}


function reloadPage() {
    window.location.reload();
}

window.onload = checkVisit;
