import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Section } from "@/shared/types";

interface UseThreeSceneProps {
    containerRef: React.RefObject<HTMLDivElement | null>;
    sections: Section[];
    onSectionSelect: (section: Section | null) => void;
    onSectionHover: (sectionName: string | null) => void;
}

export function useThreeScene({
    containerRef,
    sections,
    onSectionSelect,
    onSectionHover,
}: UseThreeSceneProps) {
    const [loading, setLoading] = useState(true);

    const primaryBlue = "#3b82f6";
    const ENTRY_LIFT = 6;
    const WORLD_LIFT_Y = 5;
    const HOVER_SCALE = 1.08;
    const HOVER_SCALE_Y = 1.12;
    const CAMERA_Y = 25;
    const offsetX = 5;

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0b1220);
        scene.fog = new THREE.Fog(0x0b1220, 40, 100);

        const camera = new THREE.PerspectiveCamera(
            80,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        camera.position.set(0, CAMERA_Y, 20);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.maxPolarAngle = Math.PI / 2.2;
        controls.minPolarAngle = Math.PI / 6;
        controls.maxDistance = 32;

        const ambientLight = new THREE.AmbientLight(0xffffff, 6.0);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
        directionalLight.position.set(20, 50, 20);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.left = -50;
        directionalLight.shadow.camera.right = 50;
        directionalLight.shadow.camera.top = 50;
        directionalLight.shadow.camera.bottom = -50;
        scene.add(directionalLight);

        const worldGroup = new THREE.Group();
        worldGroup.position.y = -ENTRY_LIFT;
        scene.add(worldGroup);

        const floor = new THREE.Mesh(
            new THREE.PlaneGeometry(200, 200),
            new THREE.MeshStandardMaterial({
                color: 0x0a1628,
                roughness: 0.75,
                metalness: 0.15,
            })
        );
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        worldGroup.add(floor);

        const gridHelper = new THREE.GridHelper(200, 80, 0x1e40af, 0x0b254a);
        (gridHelper.material as THREE.Material).opacity = 0.15;
        (gridHelper.material as THREE.Material).transparent = true;
        gridHelper.position.y = 0.01;
        worldGroup.add(gridHelper);

        const ROAD_LENGTH = 48;

        function createSideLine(zOffset: number) {
            const mat = new THREE.LineBasicMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0.35,
            });

            const pts = [
                new THREE.Vector3(-ROAD_LENGTH / 2, 0.081, zOffset),
                new THREE.Vector3(ROAD_LENGTH / 2, 0.081, zOffset),
            ];

            const geo = new THREE.BufferGeometry().setFromPoints(pts);
            const line = new THREE.Line(geo, mat);
            worldGroup.add(line);
        }

        createSideLine(2.6);
        createSideLine(-2.6);

        const roadH = new THREE.Mesh(
            new THREE.PlaneGeometry(ROAD_LENGTH, 6),
            new THREE.MeshStandardMaterial({
                color: 0x082144,
                roughness: 0.95,
                metalness: 0.02,
            })
        );
        const dashMaterial = new THREE.LineDashedMaterial({
            color: 0xffffff,
            dashSize: 1.6,
            gapSize: 1.2,
            transparent: true,
            opacity: 0.8,
        });

        const dashPoints = [];
        const half = ROAD_LENGTH / 2;

        for (let i = -half; i <= half; i += 2.8) {
            dashPoints.push(new THREE.Vector3(i, 0.08, 0));
        }

        const dashGeometry = new THREE.BufferGeometry().setFromPoints(dashPoints);
        const dashedLine = new THREE.Line(dashGeometry, dashMaterial);
        dashedLine.computeLineDistances();

        worldGroup.add(dashedLine);

        roadH.rotation.x = -Math.PI / 2;
        roadH.position.set(0, 0.05, 0);
        roadH.receiveShadow = true;
        worldGroup.add(roadH);

        const allBuildingMeshes: THREE.Mesh[] = [];
        const buildingRecords: {
            model: THREE.Object3D;
            meshes: THREE.Mesh[];
            targetScale: THREE.Vector3;
            section: Section;
            ring?: THREE.Mesh;
        }[] = [];

        const loader = new GLTFLoader();

        function createRoundedRoad(
            width: number,
            height: number,
            radius: number,
            x: number,
            z: number,
            colorHex = 0x082144
        ) {
            const shape = new THREE.Shape();
            const w = width / 2;
            const h = height / 2;

            shape.moveTo(-w + radius, -h);
            shape.lineTo(w - radius, -h);
            shape.quadraticCurveTo(w, -h, w, -h + radius);
            shape.lineTo(w, h - radius);
            shape.quadraticCurveTo(w, h, w - radius, h);
            shape.lineTo(-w + radius, h);
            shape.quadraticCurveTo(-w, h, -w, h - radius);
            shape.lineTo(-w, -h + radius);
            shape.quadraticCurveTo(-w, -h, -w + radius, -h);

            const geo = new THREE.ExtrudeGeometry(shape, {
                depth: 0.2,
                bevelEnabled: false,
            });

            const mat = new THREE.MeshStandardMaterial({
                color: colorHex,
                roughness: 0.95,
                metalness: 0.02,
            });

            const mesh = new THREE.Mesh(geo, mat);
            mesh.rotation.x = -Math.PI / 2;
            mesh.position.set(x, 0.06, z);
            mesh.receiveShadow = true;
            worldGroup.add(mesh);

            const dashY = 0.06 + 0.2 + 0.01;
            const dashLength = width * 0.8;
            const dashSpacing = 1.5;
            const numDashes = Math.floor(height / dashSpacing);

            for (let i = 0; i < numDashes; i++) {
                const zPos = -h + dashSpacing / 2 + i * dashSpacing;
                const dashPoints = [
                    new THREE.Vector3(-dashLength / 2 + x, dashY, zPos + z),
                    new THREE.Vector3(dashLength / 2 + x, dashY, zPos + z),
                ];
                const dashGeo = new THREE.BufferGeometry().setFromPoints(dashPoints);
                const dashMat = new THREE.LineDashedMaterial({
                    color: 0xf7ff66,
                    dashSize: 0.5,
                    gapSize: 0.5,
                    transparent: true,
                    opacity: 0.55,
                });
                const dashLine = new THREE.Line(dashGeo, dashMat);
                dashLine.computeLineDistances();
                worldGroup.add(dashLine);
            }

            return mesh;
        }

        const asphaltBlocks: THREE.Mesh[] = [];
        sections.forEach((s) => {
            const mx = s.position.x + offsetX;
            const mz = s.position.z;
            asphaltBlocks.push(createRoundedRoad(16, 16, 2.5, mx, mz));
        });

        function createBuilding(section: Section) {
            const buildingGroup = new THREE.Group();
            loader.load(section.model || "", (gltf) => {
                const model = gltf.scene;
                const meshes: THREE.Mesh[] = [];
                model.traverse((child) => {
                    if ((child as THREE.Mesh).isMesh) {
                        const mesh = child as THREE.Mesh;
                        mesh.castShadow = true;
                        mesh.userData.section = section;
                        meshes.push(mesh);
                        allBuildingMeshes.push(mesh);
                    }
                });

                model.scale.set(1, 1, 1);
                model.position.set(
                    section.position.x + offsetX,
                    0,
                    section.position.z
                );

                const panel = new THREE.Mesh(
                    new THREE.PlaneGeometry(9, 9),
                    new THREE.MeshStandardMaterial({
                        color: primaryBlue,
                        transparent: true,
                        opacity: 0.18,
                    })
                );
                panel.position.set(
                    section.position.x + offsetX,
                    0.1,
                    section.position.z
                );
                panel.rotation.x = -Math.PI / 2;
                buildingGroup.add(panel);

                const cornerLight = new THREE.PointLight(primaryBlue, 1, 15);
                cornerLight.position.set(
                    section.position.x + offsetX,
                    5,
                    section.position.z
                );
                buildingGroup.add(cornerLight);

                const ring = new THREE.Mesh(
                    new THREE.RingGeometry(4.5, 5.5, 64),
                    new THREE.MeshBasicMaterial({
                        color: primaryBlue,
                        transparent: true,
                        opacity: 0.55,
                        side: THREE.DoubleSide,
                        depthWrite: false,
                        depthTest: true,
                    })
                );
                ring.rotation.x = -Math.PI / 2;
                
                ring.position.set(
                    section.position.x + offsetX,
                    0.3,
                    section.position.z
                );
                ring.visible = false;
                buildingGroup.add(ring);

                buildingGroup.add(model);
                worldGroup.add(buildingGroup);

                buildingRecords.push({
                    model,
                    meshes,
                    targetScale: new THREE.Vector3(1, 1, 1),
                    section,
                    ring,
                });
                setLoading(false);
                
            });
        }

        sections.forEach(createBuilding);

        const raycaster = new THREE.Raycaster();
        const pointer = new THREE.Vector2();

        function getPointerFromEvent(e: MouseEvent | PointerEvent) {
            if (!container) return null;
            const rect = container.getBoundingClientRect();
            return new THREE.Vector2(
                ((e.clientX - rect.left) / rect.width) * 2 - 1,
                -((e.clientY - rect.top) / rect.height) * 2 + 1
            );
        }

        const onPointerMove = (event: PointerEvent) => {
            const p = getPointerFromEvent(event);
            if (!p) return;
            pointer.copy(p);
            raycaster.setFromCamera(pointer, camera);

            buildingRecords.forEach((rec) => {
                rec.targetScale.set(1, 1, 1);
                if (rec.ring) rec.ring.visible = false;
            });

            const intersects = raycaster.intersectObjects(allBuildingMeshes, false);
            if (intersects.length > 0) {
                const section: Section | undefined =
                    intersects[0].object.userData.section;
                if (section) {
                    const rec = buildingRecords.find(
                        (r) => r.section.name === section.name
                    );
                    if (rec) {
                        rec.targetScale.set(HOVER_SCALE, HOVER_SCALE_Y, HOVER_SCALE);
                        if (rec.ring) rec.ring.visible = true;
                        onSectionHover(section.name);
                        document.body.style.cursor = "pointer";
                        return;
                    }
                }
            }

            onSectionHover(null);
            document.body.style.cursor = "default";
        };

        const onClick = (event: MouseEvent) => {
            const p = getPointerFromEvent(event);
            if (!p) return;
            pointer.copy(p);
            raycaster.setFromCamera(pointer, camera);
            const intersects = raycaster.intersectObjects(allBuildingMeshes, false);
            if (intersects.length > 0) {
                const section: Section | undefined =
                    intersects[0].object.userData.section;
                if (section) onSectionSelect(section);
            }
        };

        renderer.domElement.addEventListener("pointermove", onPointerMove);
        renderer.domElement.addEventListener("click", onClick);

        let rafId = 0;
        const clock = new THREE.Clock();

        function animate() {
            rafId = requestAnimationFrame(animate);
            const dt = Math.min(clock.getDelta(), 0.05);

            worldGroup.position.y +=
                (WORLD_LIFT_Y - worldGroup.position.y) * Math.min(8 * dt, 1);
            buildingRecords.forEach((rec) =>
                rec.model.scale.lerp(rec.targetScale, Math.min(10 * dt, 1))
            );

            controls.update();
            renderer.render(scene, camera);
        }
        animate();

        const ro = new ResizeObserver(() => {
            if (!container) return;
            const w = container.clientWidth;
            const h = container.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        });
        ro.observe(container);

        const disposeMesh = (m: THREE.Mesh) => {
            if (m.geometry) m.geometry.dispose();
            const mat = m.material as THREE.Material | THREE.Material[] | undefined;
            if (!mat) return;
            if (Array.isArray(mat)) mat.forEach((mm) => mm.dispose && mm.dispose());
            else if (mat.dispose) mat.dispose();
        };

        return () => {
            ro.disconnect();
            cancelAnimationFrame(rafId);
            renderer.domElement.removeEventListener("pointermove", onPointerMove);
            renderer.domElement.removeEventListener("click", onClick);
            allBuildingMeshes.forEach(disposeMesh);
            asphaltBlocks.forEach(disposeMesh);
            worldGroup.traverse((obj) => {
                if ((obj as THREE.Mesh).isMesh) disposeMesh(obj as THREE.Mesh);
            });
            if (container?.contains(renderer.domElement))
                container.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, [containerRef, sections, onSectionSelect, onSectionHover]);

    return { loading };
}