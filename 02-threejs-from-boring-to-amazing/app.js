import * as THREE from 'three';

const canvas = document.querySelector('.canvas-container > canvas');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

/**
 * Render inside the canvas element
 */
const renderer = new THREE.WebGLRenderer({
  canvas,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Add cube
const initialCubeSize = {
  width: 2,
  height: 0.1,
  depth: 1,
};

let currentCubeSize = { ...initialCubeSize };

const geometry = new THREE.BoxGeometry(
  initialCubeSize.width,
  initialCubeSize.height,
  initialCubeSize.depth
);
const edges = new THREE.EdgesGeometry(geometry);
const cube = new THREE.LineSegments(
  edges,
  new THREE.LineBasicMaterial({ color: 0xffffff })
);
cube.rotation.x = 0.5;
cube.rotation.y = 0.5;

function updateCubeSize(w, h, d) {
  cube.scale.set(
    w / initialCubeSize.width,
    h / initialCubeSize.height,
    d / initialCubeSize.depth
  );
}

scene.add(cube);

camera.position.z = 5;

function rerenderScene() {
  requestAnimationFrame(rerenderScene);

  updateCubeSize(
    currentCubeSize.width,
    currentCubeSize.height,
    currentCubeSize.depth
  );

  renderer.render(scene, camera);
}

document.addEventListener('DOMContentLoaded', () => {
  updatePlatformSizeText();

  const widthIncrement = document.getElementById('wInc');
  const widthDecrement = document.getElementById('wDec');

  const depthIncrement = document.getElementById('dInc');
  const depthDecrement = document.getElementById('dDec');

  widthIncrement.addEventListener('click', () => {
    currentCubeSize.width += 1;
    updatePlatformSizeText();
  });
  widthDecrement.addEventListener('click', () => {
    currentCubeSize.width -= 1;
    updatePlatformSizeText();
  });

  depthIncrement.addEventListener('click', () => {
    currentCubeSize.depth += 1;
    updatePlatformSizeText();
  });

  depthDecrement.addEventListener('click', () => {
    currentCubeSize.depth -= 1;
    updatePlatformSizeText();
  });
});

function updatePlatformSizeText() {
  const el = document.querySelector('.platform-size > span');
  el.textContent = `${currentCubeSize.width} x ${currentCubeSize.depth}`;
}

rerenderScene();
