// cumфортного использования!

let x, y, r

const url = "./server.php?"

document.getElementById("checkButton").onclick = function (e) {
    if (validateX() && validateY() && validateR()) {

        sendRequest(x, y, r)
    }
}

function validateX() {
    xInput = document.getElementById("xInput").value.replace(",", ".").trim()
    if (parseFloat(xInput) != xInput) {
        raiseNotification("'X' не число")
        return false
    }
    if (xInput < -3 || xInput > 5) {
        raiseNotification("'X' не входит в ОДЗ")
        return false
    }
    x = parseFloat(xInput)
    return true
}

function validateY() {
    yRadio = document.getElementsByName("yInput")
    for (let yr of yRadio) {
        if (yr.checked) {
            y = parseFloat(yr.value)
            return true
        }
    }
    raiseNotification("Вы не выбрали 'Y'")
    return false
}

function validateR() {
    rChecks = document.getElementsByName("rInput")
    let rs = []
    for (let rc of rChecks) {
        if (rc.checked) {
            rs.push(rc.value)
        }
    }
    if (rs.length == 0) {
        raiseNotification("Вы не выбрали R")
        return false
    }
    r = parseFloat(rs[Math.floor(Math.random() * rs.length)])
    return true
}

function raiseNotification(message) {
    alert(message)
}

function hideOutputTable() {
    document.getElementById("outputTable").style.display = "none";
}


function sendRequest(x, y, r) {
    const req = new XMLHttpRequest();
    const urlParams = new URLSearchParams({ "x": x, "y": y, "r": r });
    req.open("GET", url + urlParams.toString(), true);
    req.onreadystatechange = () => {
        if (req.status === 200) {
            const response = req.responseText;
            document.getElementById("outputContainer").innerHTML = response;
        }

    };
    req.setRequestHeader("Access-Control-Allow-Origin", "*")
    req.send();
}