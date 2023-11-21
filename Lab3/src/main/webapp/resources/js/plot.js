
// let currentRadius = 0;

const RADIUS = 140;

const canvas = document.getElementById("plot");
const ctx = canvas.getContext("2d");
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

ctx.translate(canvas.width / 2, canvas.height / 2);

drawPlot();

canvas.addEventListener("click", function (evt) {
  const rect = canvas.getBoundingClientRect();
  const userX = evt.clientX - rect.left - WIDTH / 2;
  const userY = (evt.clientY - rect.top - HEIGHT / 2) * -1;

  triggerRequest({
    x: userX,
    y: userY
  });

})

function drawPlot() {
  drawShapes();
  drawAxis();
  drawMarks();
}

function clearPlot() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawAxis() {

  // config stuff
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = "black";
  ctx.fillStyle = "black";

  // x-axis line
  ctx.beginPath();
  ctx.moveTo(-WIDTH / 2, 0);
  ctx.lineTo(WIDTH / 2 - 2, 0);
  ctx.stroke();

  // y-axis line
  ctx.beginPath();
  ctx.moveTo(0, -HEIGHT / 2 + 2);
  ctx.lineTo(0, HEIGHT / 2);
  ctx.stroke();

  // x-axis arrow
  ctx.beginPath();
  ctx.moveTo(WIDTH / 2, 0);
  ctx.lineTo(WIDTH / 2 - 12, -5);
  ctx.lineTo(WIDTH / 2 - 12, 5);
  ctx.fill();

  // y-axis arrow
  ctx.beginPath();
  ctx.moveTo(0, -HEIGHT / 2);
  ctx.lineTo(-5, -HEIGHT / 2 + 12);
  ctx.lineTo(5, -HEIGHT / 2 + 12);
  ctx.fill();

}

function drawShapes() {

  ctx.fillStyle = "#a29bfe";

  ctx.beginPath();
  ctx.arc(0, 0, RADIUS, 0, Math.PI * 2);
  ctx.fill();

  ctx.clearRect(-RADIUS, -RADIUS, RADIUS, RADIUS * 2); // чуть-чуть костыль
  ctx.clearRect(0, 0, RADIUS, RADIUS);

  // rectangle
  ctx.fillRect(0, 0, RADIUS, RADIUS / 2);

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(-RADIUS / 2, 0);
  ctx.lineTo(0, -RADIUS / 2);
  ctx.fill();

}

function drawMarks() {
  const lineLength = 4;
  const textHorizontalMargin = 20;  // for x-axis
  const textXShiftMargin = 5; // for x-axis (well... for y-axis too)
  const textVerticalMargin = 5;

  ctx.font = "15px sans-serif";

  ctx.beginPath();
  ctx.moveTo(RADIUS / 2, -lineLength);
  ctx.lineTo(RADIUS / 2, lineLength);
  ctx.fillText(
    "R/2",
    RADIUS / 2 - 2 * textXShiftMargin,
    textHorizontalMargin
  );

  ctx.moveTo(RADIUS, -lineLength);
  ctx.lineTo(RADIUS, lineLength);
  ctx.fillText(
    "R",
    RADIUS - textXShiftMargin,
    textHorizontalMargin
  );

  ctx.moveTo(-RADIUS / 2, -lineLength);
  ctx.lineTo(-RADIUS / 2, lineLength);
  ctx.fillText(
    "-R/2",
    -RADIUS / 2 - 3 * textXShiftMargin,
    textHorizontalMargin
  );

  ctx.moveTo(-RADIUS, -lineLength);
  ctx.lineTo(-RADIUS, lineLength);
  ctx.fillText(
    "-R",
    -RADIUS - 2 * textXShiftMargin,
    textHorizontalMargin
  );
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-lineLength, RADIUS / 2);
  ctx.lineTo(lineLength, RADIUS / 2);
  ctx.fillText(
    "-R/2",
    - 7 * textXShiftMargin,
    RADIUS / 2 + textVerticalMargin
  );

  ctx.moveTo(-lineLength, RADIUS);
  ctx.lineTo(lineLength, RADIUS);
  ctx.fillText(
    "-R",
    - 5 * textXShiftMargin,
    RADIUS + textVerticalMargin
  );

  ctx.moveTo(-lineLength, -RADIUS / 2);
  ctx.lineTo(lineLength, -RADIUS / 2);
  ctx.fillText(
    "R/2",
    - 6 * textXShiftMargin,
    -RADIUS / 2 + textVerticalMargin
  );

  ctx.moveTo(-lineLength, -RADIUS);
  ctx.lineTo(lineLength, -RADIUS);
  ctx.fillText(
    "R",
    - 4 * textXShiftMargin,
    -RADIUS + textVerticalMargin
  );
  ctx.stroke();
}

function drawPoint(point) {
  ctx.beginPath();
  if (point.hit) {
    ctx.fillStyle = "green";
  } else {
    ctx.fillStyle = "red";
  }
  ctx.arc(point.x, point.y * -1, 4, 0, Math.PI * 2);
  ctx.fill();
}