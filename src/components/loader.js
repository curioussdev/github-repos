import styled from 'styled-components';

export function Spinner(){
    return(
        <main></main>
    )
}

let spinnerSize = 192;
let spinnerSpeed = 10;
let spinnerColor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  spinnerColor = color(33, 150, 243);
}

function draw() {
  background(255);
  
  let step = frameCount % (spinnerSpeed * 7.25);
  let angle = map(step, 0, spinnerSpeed * 7.25, 0, TWO_PI);
  
  push();
  translate(width / 2, height / 2);
  rotate(angle);
  noFill();
  stroke(spinnerColor);
  strokeWeight(spinnerSize / 10);
  strokeCap(SQUARE);
  arc(0, 0, spinnerSize - (spinnerSize / 20), spinnerSize - (spinnerSize / 20), 0, PI + HALF_PI, OPEN);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

const loader = styled.main`
html, body {
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
    padding: 0;
  }
  
  canvas {
    display: block;
  }
`;