"use client";

import { useRef, useState, useEffect } from "react";
import { useSection } from "@/shared/context/SectionContext";

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { SpinnerBadge } from "@/components/spinner-badge";

export default function LeftPanel() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { selectedSection } = useSection();
  const [loading, setLoading] = useState<Boolean>();

  useEffect(() => {
    if (!containerRef.current || !selectedSection?.insideFactory) return;

    setLoading(true);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b1220);

    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / 300,
      0.1,
      1000
    );
    camera.position.set(-8, 10, 1);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, 300);
    renderer.shadowMap.enabled = true;

    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 10, 7);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(50, 50),
      new THREE.MeshStandardMaterial({ color: 0x1e293b })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    const loader = new GLTFLoader();
    loader.load(
      selectedSection.insideFactory,

      (gltf) => {
        const model = gltf.scene;

        model.traverse((child: any) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        model.scale.set(1.5, 1.5, 1.5);
        model.position.set(0, 0, 0);

        scene.add(model);
        setLoading(false);
      },

      (err) => {
        console.log("Model load error:", err);
        setLoading(false);
      }
    );

    const animate = () => {
      requestAnimationFrame(animate);
      //scene.rotation.y += 0.002;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / 300;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, 300);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, [selectedSection]);

  const qualityData = [
    { label: "Product Quality", value: "98.5%", status: "good" },
    { label: "Equipment Efficiency", value: "94.2%", status: "good" },
    { label: "Process Compliance", value: "97.8%", status: "good" },
    { label: "Safety Score", value: "99.1%", status: "excellent" },
  ];

  const statusItems = [
    { name: "Line A", status: "active", value: 85 },
    { name: "Line B", status: "active", value: 92 },
    { name: "Line C", status: "warning", value: 68 },
    { name: "Line D", status: "active", value: 88 },
    { name: "Line E", status: "maintenance", value: 0 },
  ];

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm p-4 h-full overflow-y-auto border-r border-blue-500/20 custom-scroll">
      <div className="mb-6 mt-16">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500"></div>
          Quality Inspection and Security Information
        </h2>
      </div>

      {selectedSection?.insideFactory && (
        <div className="mb-6 mt-16">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <div className="w-1 h-6 bg-blue-500"></div>
            Factory Interior View
          </h2>

          <div
            ref={containerRef}
            className="relative w-full h-75 rounded-lg overflow-hidden border border-blue-500/20 bg-black flex items-center justify-center"
          >
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <SpinnerBadge />
              </div>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-6 ">
        <div className="bg-slate-800/50 rounded-lg p-4 mb-6 border border-blue-500/20">
          <h3 className="text-sm font-semibold text-blue-300 mb-3">
            Production Overview
          </h3>
          <div className="flex items-center justify-center h-40">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="10"
                  strokeDasharray="75 25"
                  transform="rotate(-90 50 50)"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="10"
                  strokeDasharray="75 25"
                  strokeDashoffset="-75"
                  transform="rotate(-90 50 50)"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="10"
                  strokeDasharray="75 25"
                  strokeDashoffset="-150"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
                100%
              </div>
            </div>
          </div>
          <div className="flex gap-3 text-xs mt-3">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
              <span className="text-gray-300">Active</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-amber-500 rounded-sm"></div>
              <span className="text-gray-300">Warning</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
              <span className="text-gray-300">Good</span>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-4 mb-6 border border-blue-500/20">
          <h3 className="text-sm font-semibold text-blue-300 mb-3">
            Production Overview
          </h3>
          <div className="flex items-center justify-center h-40">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="10"
                  strokeDasharray="75 25"
                  transform="rotate(-90 50 50)"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="10"
                  strokeDasharray="75 25"
                  strokeDashoffset="-75"
                  transform="rotate(-90 50 50)"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="10"
                  strokeDasharray="75 25"
                  strokeDashoffset="-150"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
                100%
              </div>
            </div>
          </div>
          <div className="flex gap-3 text-xs mt-3">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
              <span className="text-gray-300">Active</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 b g-amber-500 rounded-sm"></div>
              <span className="text-gray-300">Warning</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
              <span className="text-gray-300">Good</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 rounded-lg p-4 mb-6 border border-blue-500/20">
        <h2 className="text-2xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
          Quality Metrics
        </h2>

        <div className="space-y-3">
          {qualityData.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-xs text-gray-300">{item.label}</span>
              <span
                className={`text-sm font-bold ${
                  item.status === "excellent"
                    ? "text-green-400"
                    : "text-blue-400"
                }`}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-800/50 rounded-lg p-4 border border-blue-500/20">
        <h2 className="text-2xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
          Production Lines
        </h2>

        <div className="space-y-2">
          {statusItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 border-b border-slate-700/50 last:border-0"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    item.status === "active"
                      ? "bg-green-400 animate-pulse"
                      : item.status === "warning"
                      ? "bg-yellow-400 animate-pulse"
                      : "bg-red-400"
                  }`}
                ></div>
                <span className="text-xs text-gray-300">{item.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      item.status === "active"
                        ? "bg-green-500"
                        : item.status === "warning"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-400 w-8 text-right">
                  {item.value}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6 mt-6">
        <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30 shadow-lg">
          <h2 className="text-2xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
            Pioneer Demonstration
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-800/60 rounded-lg p-5 border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-blue-400/30">
                  <span className="text-blue-400 text-lg font-bold">ZW</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Advanced Star
                  </h3>
                  <p className="text-sm text-blue-400">name name</p>
                </div>
              </div>
              <div className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                Active
              </div>
            </div>

            <div className="bg-slate-800/60 rounded-lg p-5 border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-blue-400/30">
                  <span className="text-blue-400 text-lg font-bold">HZ</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Advanced Star
                  </h3>
                  <p className="text-sm text-blue-400">name name</p>
                </div>
              </div>
              <div className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                Active
              </div>
            </div>

            <div className="bg-slate-800/60 rounded-lg p-5 border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-blue-400/30">
                  <span className="text-blue-400 text-lg font-bold">LH</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Advanced Star
                  </h3>
                  <p className="text-sm text-blue-400">name name</p>
                </div>
              </div>
              <div className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                Active
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30 shadow-lg">
          <h2 className="text-2xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
            Work status of each group
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-800/80 border-b border-blue-500/30">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-blue-300 w-20">
                    Serial number
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-blue-300">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-blue-300">
                    Information note
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-700/50 hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3 text-sm text-slate-300">1</td>
                  <td className="px-4 py-3 text-sm font-medium text-white">
                    Electrical Group 3
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-400">
                    The production of 153 control cabinets for the Indian
                    Railways and Algerian projects was completed in November,
                    with strict quality control at every stage to ensure stable
                    quality.
                  </td>
                </tr>
                <tr className="border-b border-slate-700/50 hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3 text-sm text-slate-300">2</td>
                  <td className="px-4 py-3 text-sm font-medium text-white">
                    Guo Yingjun Assembly Team
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-400">
                    In November, a total of 7 fixed ball tables and belt roller
                    conveyors for the Qinghangdao Yushu Vacuum Project were
                    completed, with all key performance indicators meeting the
                    technical requirements.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-end gap-4 text-xs text-slate-500 border-t border-slate-800 pt-4">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              Total groups: 2
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              Completed: 2/2
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-red-900/20 border border-red-500/30 rounded-lg p-3">
        <div className="flex items-start gap-2">
          <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-white text-xs">!</span>
          </div>
          <div>
            <p className="text-xs font-semibold text-red-300">
              Maintenance Alert
            </p>
            <p className="text-xs text-red-200 mt-1">
              Line E scheduled for maintenance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
