
const radiusPadding = 0.9;
const canvas = document.getElementById("clock");
const ctx = canvas.getContext("2d");
const radius = canvas.height / 2 * radiusPadding;

ctx.translate(canvas.height / 2, canvas.height / 2);

drawClock();
setInterval(drawClock, 10000); // 10 seconds

function drawClock() {
  clearCanvas()
  drawBackground();
  drawTime();
}

function drawBackground() {
  // outer circle (border)
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.stroke();

  // dot in the center
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.03, 0, 2 * Math.PI);
  ctx.fillStyle = "black";
  ctx.fill();

  // styling text (numbers) on canvas
  ctx.font = radius * 0.1 + "px arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";

  const numberPadding = 0.9;

  // draw numbers for each hour
  for (let num = 1; num < 13; num++) {
    const angle = num * Math.PI / 6;
    ctx.rotate(angle);
    ctx.translate(0, -radius * numberPadding);
    ctx.rotate(-angle);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(angle);
    ctx.translate(0, radius * numberPadding);
    ctx.rotate(-angle);
  }

}

function drawTime() {
  const hourLineLength = radius * 0.5;
  const minuteLineLength = radius * 0.7;
  const secondLineLength = radius * 0.85;

  const hourLineThickness = radius * 0.03;
  const minuteLineThickness = radius * 0.02;
  const secondLineThickness = radius * 0.01;

  const date = new Date();
  let hours = date.getHours() % 12;
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  hours = (hours * Math.PI / 6) + (minutes * Math.PI / (6 * 60)) + (seconds * Math.PI / (360 * 60));
  minutes = (minutes * Math.PI / 30) + (seconds * Math.PI / (30 * 60));
  seconds = (seconds * Math.PI / 30);

  drawTimeLine(hours, hourLineLength, hourLineThickness);
  drawTimeLine(minutes, minuteLineLength, minuteLineThickness);
  drawTimeLine(seconds, secondLineLength, secondLineThickness);

}

function drawTimeLine(pos, length, thickness) {
  ctx.beginPath();
  ctx.lineWidth = thickness;
  ctx.lineCap = "round";
  ctx.moveTo(0, 0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}

function clearCanvas() {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
}