import Factory from '@/components/factory';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(to right, #3b82f6 1px, transparent 1px),
            linear-gradient(to bottom, #3b82f6 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="relative z-10 h-full flex flex-col mt-16">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            Intelligent Manufacturing Floor
          </h2>
          <p className="text-sm text-gray-400">
            Real-time Factory Monitoring System
          </p>
        </div>

        <div className="flex-1 perspective-1000">
          <div className="h-full transform-style-3d rotate-x-15">
            <div className="relative h-full rounded-lg border-2 border-blue-500/30 bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm p-8 shadow-2xl">
              
              <div className="relative z-10 h-[calc(100vh-100px)]">
                 <Factory />
              </div>

              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                <line
                  x1="33%"
                  y1="50%"
                  x2="67%"
                  y2="50%"
                  stroke="#3b82f6"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="10"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </line>
                <line
                  x1="50%"
                  y1="33%"
                  x2="50%"
                  y2="67%"
                  stroke="#3b82f6"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="10"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </line>
              </svg>
            </div>
          </div>
        </div>

        {/* <div className="mt-6 flex justify-between items-center bg-slate-800/50 rounded-lg p-4 border border-blue-500/20">
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">6 Active Zones</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <span className="text-sm text-gray-300">Real-time Sync</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
              <span className="text-sm text-gray-300">Cloud Connected</span>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div> */}
      </div>
    </div>
  );
}
