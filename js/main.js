import * as THREE from "three";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 2.5, 10);

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

document
    .getElementById("scene-container")
    .appendChild(renderer.domElement);

// 조명
const ambient = new THREE.AmbientLight(0x6fa8ff, 2);
scene.add(ambient);

const light = new THREE.DirectionalLight(0x66aaff, 3);
light.position.set(5, 10, 8);
scene.add(light);

// 임시 행성
const geometry = new THREE.CylinderGeometry(
    3,
    3,
    0.8,
    128
);

const material = new THREE.MeshPhongMaterial({

    color: 0x1d63ff,

    transparent: true,

    opacity: 0.35,

    shininess: 100

});

const planet = new THREE.Mesh(
    geometry,
    material
);

scene.add(planet);

// 애니메이션
function animate(){

    requestAnimationFrame(animate);

    planet.rotation.y += 0.002;

    renderer.render(scene, camera);

}

animate();

// 화면 크기 대응
window.addEventListener("resize", ()=>{

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});
