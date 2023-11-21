
const HIDDEN_X = document.getElementById("hidden-form:hidden-x");
const HIDDEN_Y = document.getElementById("hidden-form:hidden-y");
const HIDDEN_R = document.getElementById("hidden-form:hidden-r");
const HIDDEN_BUTTON = document.getElementById("hidden-form:hidden-send");

let CURR_RADIUS = parseTable()[parseTable().length - 1].r || 2;

window.onload = function () {
  drawPoints();

  const inp = document.getElementById("j_idt9:y");
  inp.oninput = function () {
    inp.value = inp.value.replace(/[^0-9]/g, "");
  }

  inp.addEventListener("focusout", function () {
    const value = parseFloat(inp.value);
    if (value < -5 || value > 5) {
      inp.value = 5;
    }
  })
}

document.getElementById("j_idt9:decimal").addEventListener("focusout", function () {
  CURR_RADIUS = getRadius();
  drawPoints();
});



function triggerRequest(point) {
  const normalized = normalizeCoords(point);
  const radius = getRadius();

  if (!validateR(radius)) {
    showModal("SELECT R");
    return;
  }

  HIDDEN_X.value = normalized.x;
  HIDDEN_Y.value = normalized.y;
  HIDDEN_R.value = getRadius();

  HIDDEN_BUTTON.click();

}

function getRadius() {
  return parseFloat(document.getElementById("j_idt9:decimal").value);
}

function normalizeCoords(point) {
  const x = parseFloat((point.x * getRadius() / RADIUS).toFixed(2));
  const y = parseFloat((point.y * getRadius() / RADIUS).toFixed(2));

  return {
    x: x,
    y: y
  }
}

function denormalizeCoords(point) {
  const x = parseFloat((point.x * RADIUS / point.r).toFixed(2));
  const y = parseFloat((point.y * RADIUS / point.r).toFixed(2));

  return {
    x: x,
    y: y,
    r: point.r,
    hit: point.hit
  }
}

function showModal(message) {
  const modal = document.getElementById("modal");
  const messagePlaceholder = document.getElementById("displayMessage");
  messagePlaceholder.innerText = message;
  modal.classList.remove("hide-modal");
}

function hideModal() {
  const modal = document.getElementById("modal");
  const messagePlaceholder = document.getElementById("displayMessage");
  messagePlaceholder.innerText = "no message here...";
  modal.classList.add("hide-modal");
}

function validateR(r) {
  return r >= 2 && r <= 5;
}

function parseTable() {
  const trs = document.getElementsByClassName("output-data"); // trs = tr in plural form

  let points = [];
  for (const tr of trs) {
    const tds = tr.cells; // tds = td in plural form
    points.push({
      x: parseInt(tds[0].innerText),
      y: parseFloat(tds[1].innerText),
      r: parseFloat(tds[2].innerText),
      hit: tds[3].innerText === "Попадание"
    });
  }

  return points;
}

function drawPoints() {
  const points = parseTable();

  clearPlot();
  drawPlot();

  points.forEach(point => {
    if (point.r === CURR_RADIUS) drawPoint(denormalizeCoords(point))
  });
}

