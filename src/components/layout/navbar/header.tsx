import Image from "next/image";

export function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 w-full z-100">
      <div className="relative w-full h-24">
        
        <svg 
          className="absolute inset-0 w-full h-full" 
          viewBox="0 0 1200 96" 
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="headerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
              <stop offset="50%" stopColor="rgba(139, 92, 246, 0.15)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.1)" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <path
            d="M 0,0 L 0,60 L 350,60 L 420,96 L 780,96 L 850,60 L 1200,60 L 1200,0 Z"
            fill="url(#headerGradient)"
            stroke="rgba(139, 92, 246, 0.4)"
            strokeWidth="2"
            filter="url(#glow)"
          />
          
          <path
            d="M 0,0 L 0,58 L 350,58 L 421,94 L 779,94 L 850,58 L 1200,58 L 1200,0"
            fill="none"
            stroke="rgba(139, 92, 246, 0.6)"
            strokeWidth="1"
          />
        </svg>

        <div 
          className="absolute inset-0"
          style={{
            clipPath: 'polygon(0 0, 0 62.5%, 29.17% 62.5%, 35% 100%, 65% 100%, 70.83% 62.5%, 100% 62.5%, 100% 0)',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}
        >
          <div className="absolute inset-0 opacity-50">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
          </div>
        </div>

        <div className="absolute top-0 left-1/4 w-48 h-48 bg-blue-500/20 blur-3xl rounded-full opacity-40 pointer-events-none animate-pulse" />
        <div className="absolute top-0 right-1/4 w-48 h-48 bg-purple-500/20 blur-3xl rounded-full opacity-40 pointer-events-none animate-pulse" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-cyan-400/10 blur-2xl rounded-full opacity-60 pointer-events-none" />

        <div className="relative h-full flex items-center justify-center px-8">
          <div className="flex items-center justify-between gap-10">
            
            <div className="">
              <Image
                src={"/icons/logo.png"}
                alt=""
                width={70}
                height={50}
              />
            </div>
            
            {/* Logo 
            <div className="relative group">
              <div className="absolute inset-0 bg-linear-to-r from-cyan-500 to-blue-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-14 h-14 bg-linear-to-br from-cyan-500 via-blue-600 to-purple-600 rounded-lg flex items-center justify-center border border-cyan-400/50 shadow-lg shadow-cyan-500/50">
                <div className="w-10 h-10 border-2 border-white/80 rounded-md flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-sm" />
                </div>
              </div>
              <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-cyan-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-cyan-400" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-cyan-400" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-cyan-400" />
            </div> */}

            <div className="relative">
              <h1 className="text-2xl font-bold bg-linear-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent tracking-wider">
                Monitoring Hub
              </h1>
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-linear-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-60" />
              
              <p className="text-xs text-cyan-200/60 tracking-widest mt-1 uppercase">
                Future Technology
              </p>
            </div>

            <div className="flex gap-2">
              <div className="w-1 h-8 bg-linear-to-b from-cyan-400 to-transparent rounded-full animate-pulse" />
              <div className="w-1 h-12 bg-linear-to-b from-blue-400 to-transparent rounded-full animate-pulse delay-100" />
              <div className="w-1 h-8 bg-linear-to-b from-purple-400 to-transparent rounded-full animate-pulse delay-200" />
            </div>

          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-px">
          <div 
            className="h-full bg-linear-to-r from-transparent via-cyan-400/50 to-transparent"
            style={{
              clipPath: 'polygon(0 0, 29.17% 0, 35% 100%, 65% 100%, 70.83% 0, 100% 0, 100% 100%, 0 100%)',
            }}
          />
        </div>

        <div className="absolute top-4 left-4 flex gap-1">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-75" />
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-150" />
        </div>

        <div className="absolute top-4 right-4 flex gap-1">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-75" />
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-150" />
        </div>

      </div>

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/4 w-px h-full bg-linear-to-b from-transparent via-cyan-400 to-transparent animate-pulse" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-linear-to-b from-transparent via-purple-400 to-transparent animate-pulse delay-200" />
      </div>

    </div>
  );
}