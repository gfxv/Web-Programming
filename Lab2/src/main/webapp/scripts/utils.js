function raiseNotification(message) {
    alert(message)
}

function translateCoords(x, y) {
    let newX = x - 150
    let newY = Math.abs(y - 300) - 150
    return [newX, newY]
}

function detranslateCoords(x, y) {
    let oldX = 150 + x
    let oldY;
    y > 0 ? oldY = 150 - y : oldY = 150 + Math.abs(y)

    return [oldX, oldY]
}

function normalizeCoords(x, y, r) {
    return [(x * r / 120).toFixed(2), (y * r / 120).toFixed(2)]
}

function denormalizeCoords(x, y, r) {
    return [parseFloat((x * 120 / r).toFixed(2)),parseFloat((y * 120 / r).toFixed(2))]
}

function getPointCoords() {
    // АЫАЫАААЫ КОСТЫЛЬ ЫЫААЫАААЫ
    const trs = document.getElementsByTagName("tr")
    console.log("trs", trs)
    const lastTR = trs[trs.length - 1]
    console.log("last", lastTR)
    let coords = []
    lastTR.childNodes.forEach(data => {
        if (data.innerText !== undefined && coords.length !== 3) {
            coords.push(parseFloat(data.innerText))
        }
    })

    return {
        x: coords[0],
        y: coords[1],
        r: coords[2]
    }

}

function drawPoint() {
    const pointCoords = getPointCoords()
    if (isNaN(pointCoords.x) || isNaN(pointCoords.y) || isNaN(pointCoords.r)) {
        clearPoints()
        return;
    }
    const point = document.getElementById("point")

    console.log("getPointsCoords()", pointCoords.x, pointCoords.y, pointCoords.r)

    let [dx, dy] = denormalizeCoords(pointCoords.x, pointCoords.y, pointCoords.r)
    console.log("Denormalized", dx, dy)
    console.log("D-Types", typeof dx, typeof dy)
    let [x, y] = detranslateCoords(dx, dy)

    console.log("Final", x, y)
    console.log("F-Types", typeof dx, typeof dy)

    point.style.display = "block"
    point.style.position = "absolute"
    point.style.left = `${x}px`;
    point.style.top = `${y}px`;

}

function clearPoints() {
    document.getElementById("point").style.display = "none"
}

function sendRequest(x, y, r) {
    const req = new XMLHttpRequest();
    const params = {"x": Math.round(parseFloat(x)), "y": parseFloat(y), "r": r}
    const body = new URLSearchParams(params);
    req.open("POST", "controller", true);
    req.onreadystatechange = () => {
        if (req.status === 200) {
            location.reload();
        } else {
            console.log(req.status, "AHTUNG AHTUNG")
        }

    };
    req.setRequestHeader("Access-Control-Allow-Origin", "*")
    req.send(body);
}