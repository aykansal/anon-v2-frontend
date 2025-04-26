import { useState } from 'react'

function App() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div 
        className="p-8 rounded-lg border border-green-800/30 bg-black/50 backdrop-blur-sm transform transition-all duration-300 hover:border-green-600/50"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h1 className="text-4xl font-light text-green-500 mb-2">
          Vibe Coding on AO
        </h1>
        <h2 className="text-lg text-green-400/80">
          {isHovered ? "Ready to create?" : "Waiting for you..."}
        </h2>
      </div>
      </div>
  )
}

export default App