import * as THREE from "three";

const scene = new THREE.Scene();

// ==========================
// 행성 그룹
// ==========================

const planetGroup = new THREE.Group();
scene.add(planetGroup);

// ==========================
// 카메라
// ==========================

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 1.8, 8.5);

// ==========================
// 렌더러
// ==========================

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

document
    .getElementById("scene-container")
    .appendChild(renderer.domElement);

// ==========================
// 조명
// ==========================

const ambient = new THREE.AmbientLight(0x6fa8ff, 2);
scene.add(ambient);

const light = new THREE.DirectionalLight(0x66aaff, 3);
light.position.set(5, 10, 8);
scene.add(light);

// ==========================
// 원판
// ==========================

const geometry = new THREE.CylinderGeometry(
    3.6,
    3.6,
    0.2,
    128
);

const material = new THREE.MeshPhongMaterial({
    color: 0x6ab7ff,
    transparent: true,
    opacity: 0.15,
    shininess: 100
});

const planet = new THREE.Mesh(
    geometry,
    material
);

planet.position.y = 0.45;

planetGroup.add(planet);

// ==========================
// 바깥 링
// ==========================

const ringGeometry = new THREE.TorusGeometry(
    3.62,
    0.025,
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

planetGroup.add(ring);

// ==========================
// 구역 경계선
// ==========================

const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x8ec8ff,
    transparent: true,
    opacity: 0.28
});

function createLine(x1, z1, x2, z2) {

    const points = [
        new THREE.Vector3(x1, planet.position.y + 0.112, z1),
        new THREE.Vector3(x2, planet.position.y + 0.112, z2)
    ];

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const line = new THREE.Line(
        geometry,
        lineMaterial
    );

    planetGroup.add(line);

}

function createBuilding(x, z, width, depth, height){

    const group = new THREE.Group();

    // 건물 몸체
    const body = new THREE.Mesh(

        new THREE.BoxGeometry(
            width,
            height,
            depth
        ),

        new THREE.MeshPhongMaterial({

            color:0x64d8ff,

            transparent:true,

            opacity:0.22

        })

    );

    body.position.y = height / 2;

    group.add(body);

    // 외곽선
    const edges = new THREE.LineSegments(

        new THREE.EdgesGeometry(
            body.geometry
        ),

        new THREE.LineBasicMaterial({

            color:0xa8f0ff,

            transparent:true,

            opacity:0.9

        })

    );

    edges.position.copy(body.position);

    group.add(edges);

    // 옥상 구조물
    if(height > 0.9){

        const top = new THREE.Mesh(

            new THREE.BoxGeometry(
                width * 0.45,
                height * 0.18,
                depth * 0.45
            ),

            new THREE.MeshPhongMaterial({

                color:0x84ecff,

                transparent:true,

                opacity:0.35

            })

        );

        top.position.y =
            height + height*0.09;

        group.add(top);

    }

    group.position.set(

        x,

        planet.position.y + 0.1,

        z

    );

    planetGroup.add(group);

}

// ==========================
// 애니메이션
// ==========================

function animate() {

    requestAnimationFrame(animate);

    planetGroup.rotation.y += 0.002;

    renderer.render(scene, camera);

}

animate();

// ==========================
// 화면 크기 대응
// ==========================

window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});
