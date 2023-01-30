import './style.css'

// import three.js library
import * as THREE from 'three';

// import orbit controls to enable controlling camera perspective with the mouse
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// create a new scene to place objects in
const scene = new THREE.Scene();

// create a new perspective camera to view the scene
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// create a renderer to render the scene and attach the renderer to the canvas element in the dom
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

// adjust renderer settings and set the initial camera position
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// render the scene
renderer.render(scene, camera);

// create a new 3d object to render
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
const torus = new THREE.Mesh(geometry, material);

// add the object to the scene
scene.add(torus);

// create a light emitting from a point
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

// create a light that lights the entire scene
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// create a light helper to show where point lights are positioned in the scene
const lightHelper = new THREE.PointLightHelper(pointLight);

// create a grid helper to show a grid plane in the scene
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

// create controls for adjusting the camera perspective using the mouse
const controls = new OrbitControls(camera, renderer.domElement);

// create a new star randomly positioned within the scene
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

// add 200 stars to the scene
Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('space.png');
scene.background = spaceTexture;

// contains all the animations for the scene
function animate() {
  requestAnimationFrame(animate);

  // update the 3d object's orientation
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  // track the mouse controls to update the camera
  controls.update();

  // render the scene after updating
  renderer.render(scene, camera);
}

// render the animations
animate();
