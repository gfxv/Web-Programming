function validateX() {
    let xRadio = document.getElementsByName("xInput")
    for (let xr of xRadio) {
        if (xr.checked) {
            x = parseFloat(xr.value)
            return true
        }
    }
    raiseNotification("Вы не выбрали 'X'")
    return false
}

function validateY() {
    let yValue = document.getElementById("yInput").value.replace(",", ".").trim()
    if (validateTextInput(-3, 5, yValue)) {
        y = parseFloat(yValue)
        return true
    }
    return false
}

function validateR() {
    let rValue = document.getElementById("rInput").value.replace(",", ".").trim()
    if (validateTextInput(1, 4, rValue)) {
        r = parseFloat(rValue)
        return true
    }
    return false
}

function validateTextInput(leftBound, rightBound, value) {
    if (value.length == 0) {
        raiseNotification("Вы не можете оставлять поля пустыми!")
        return false
    }
    if (parseFloat(value) != value) {
        raiseNotification(`${value} не число`)
        return false
    }
    if (value < leftBound || value > rightBound) {
        raiseNotification(`${value} не входит в ОДЗ`)
        return false
    }

    return true
}