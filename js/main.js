import * as THREE from "three";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 1.8, 8.5);

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
    3.6,
    3.6,
    0.2,
    128
);

const material = new THREE.MeshPhongMaterial({

    color:0x6ab7ff,

    transparent: true,

    opacity: 0.15,

    shininess: 100

});

const planet = new THREE.Mesh(
    geometry,
    material
);

// 원판 위치
planet.position.y = 0.45;

scene.add(planet);

// 원판 테두리 글로우
const ringGeometry = new THREE.TorusGeometry(
    3.62,   // 원판보다 아주 약간 크게
    0.025,  // 링 두께
    16,
    128
);

const ringMaterial = new THREE.MeshBasicMaterial({
    color: 0x4ea1ff,
    transparent: true,
    opacity: 0.9
});

const ring = new THREE.Mesh(
    ringGeometry,
    ringMaterial
);

ring.rotation.x = Math.PI / 2;
ring.position.y = planet.position.y + 0.11;

scene.add(ring);

// 중심 원
const centerGeometry = new THREE.CircleGeometry(
    0.55,
    64
);

const centerMaterial = new THREE.MeshBasicMaterial({

    color:0x4ea1ff,

    transparent:true,

    opacity:.28

});

const center = new THREE.Mesh(
    centerGeometry,
    centerMaterial
);

center.rotation.x = -Math.PI/2;

center.position.y = planet.position.y + 0.11;

scene.add(center);

// 동심원
for(let i=1;i<=3;i++){

    const geo = new THREE.TorusGeometry(
        0.8 + i*0.45,
        0.01,
        8,
        128
    );

    const mat = new THREE.MeshBasicMaterial({

        color:0x3b8fff,

        transparent:true,

        opacity:.25

    });

    const mesh = new THREE.Mesh(
        geo,
        mat
    );

    mesh.rotation.x = Math.PI/2;

    mesh.position.y = planet.position.y + 0.111;

    scene.add(mesh);

}

// ==========================
// 구역 경계선
// ==========================

const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x5faeff,
    transparent: true,
    opacity: 0.28
});

function createLine(x1, z1, x2, z2){

    const points = [
        new THREE.Vector3(x1, planet.position.y + 0.105, z1),
        new THREE.Vector3(x2, planet.position.y + 0.105, z2)
    ];

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const line = new THREE.Line(geometry, lineMaterial);

    scene.add(line);

}

// 세로선
createLine(0, -3, 0, 3);


// 가로선
createLine(-3, 0, 3, 0);


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
