// cumфортного использования!

let x, y, r
let svg = document.getElementById("svgPlot")
let pt = svg.createSVGPoint()


window.onload = function () {
    clearPoints();
    drawPoint();
    hideModal();
}

document.getElementById("checkButton").onclick = function () {
    if (validateX() && validateY() && validateR()) {
        sendRequest(x, y, r)
    }
}

document.getElementById("modalButton").onclick = hideModal

svg.onclick = function (event) {
    pt.x = event.clientX;
    pt.y = event.clientY;

    let cursorpt = pt.matrixTransform(svg.getScreenCTM().inverse());

    let [xt, yt] = translateCoords(cursorpt.x, cursorpt.y)
    if (!validateR()) return
    
    [x, y] = normalizeCoords(xt, yt, r)
    sendRequest(x, y, r)

}

