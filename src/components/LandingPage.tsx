'use client'

import { useState } from 'react'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface LandingPageProps {
  onLogin: () => void
}

export function LandingPage({ onLogin }: LandingPageProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = () => {
    setIsLoading(true)
    setTimeout(() => {
      onLogin()
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-white">
      {/* Manga halftone pattern background */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)',
            backgroundSize: '4px 4px'
          }}
        />
      </div>

      {/* Speed lines effect - common in manga */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute h-[2px] bg-black/5"
            style={{
              width: `${200 + Math.random() * 400}px`,
              top: `${Math.random() * 100}%`,
              left: '-200px',
              transform: `rotate(${-10 + Math.random() * 20}deg)`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen">
        {/* Header with manga-style bold border */}
        <header className="border-b-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Manga-style icon */}
              <div className="w-14 h-14 bg-black border-4 border-black relative overflow-hidden">
                <div className="absolute inset-0 bg-white transform rotate-45 scale-150" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl relative z-10">🎲</span>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-black tracking-tight text-black uppercase" style={{ textShadow: '3px 3px 0px #fff, 3px 3px 0px #000' }}>
                  WorldArchitect
                </h1>
                <p className="text-sm font-bold text-gray-600 uppercase tracking-wider">AI RPG Platform</p>
              </div>
            </div>
          </div>
        </header>

        {/* Hero section with manga panel layout */}
        <main className="container mx-auto px-6 py-12">
          {/* Main hero panel - manga style */}
          <div className="mb-12">
            <div className="relative bg-white border-8 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              {/* Corner decoration - common in manga */}
              <div className="absolute top-0 right-0 w-16 h-16 border-l-8 border-b-8 border-black" />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-r-8 border-t-8 border-black" />
              
              {/* Character illustration area */}
              <div className="mb-8 relative">
                <div className="aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-200 border-4 border-black relative overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1760113671986-63ccb46ae202?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5nYSUyMGFuaW1lJTIwY2hhcmFjdGVyJTIwaWxsdXN0cmF0aW9ufGVufDF8fHx8MTc3MDY0NTI1Mnww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Manga hero"
                    className="w-full h-full object-cover grayscale"
                  />
                  {/* Screentone overlay */}
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: 'radial-gradient(circle, black 1.5px, transparent 1.5px)',
                    backgroundSize: '8px 8px'
                  }} />
                  
                  {/* Action lines */}
                  <div className="absolute inset-0">
                    {[...Array(15)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute h-[3px] bg-black/80"
                        style={{
                          width: `${100 + Math.random() * 200}px`,
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                          transform: `rotate(${Math.random() * 360}deg)`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Manga-style title with bold outline */}
              <div className="text-center mb-6">
                <h1 
                  className="text-6xl md:text-8xl font-black mb-4 uppercase tracking-tighter"
                  style={{
                    color: 'white',
                    WebkitTextStroke: '4px black',
                    paintOrder: 'stroke fill',
                    letterSpacing: '-0.05em'
                  }}
                >
                  START YOUR
                </h1>
                <h2 
                  className="text-7xl md:text-9xl font-black uppercase tracking-tighter"
                  style={{
                    color: 'white',
                    WebkitTextStroke: '5px black',
                    paintOrder: 'stroke fill',
                    letterSpacing: '-0.05em'
                  }}
                >
                  ADVENTURE!!
                </h2>
              </div>

              {/* Manga speech bubble */}
              <div className="flex justify-center mb-8">
                <div className="relative bg-white border-4 border-black px-8 py-4 max-w-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  {/* Speech bubble tail */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[24px] border-t-black" />
                  <div className="absolute -bottom-[18px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[20px] border-t-white" />
                  
                  <p className="text-lg md:text-xl font-bold text-center text-black">
                    Create epic campaigns powered by AI! Your choices shape the story in this revolutionary tabletop RPG experience!
                  </p>
                </div>
              </div>

              {/* Main CTA button - manga style */}
              <div className="flex justify-center mt-12">
                <button
                  onClick={handleSignIn}
                  disabled={isLoading}
                  className="relative group"
                >
                  <div className="bg-black border-4 border-black px-12 py-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                    <span className="text-3xl font-black text-white uppercase tracking-wider">
                      {isLoading ? 'LOADING...' : 'BEGIN NOW!'}
                    </span>
                  </div>
                  {/* Emphasis effect */}
                  {!isLoading && (
                    <>
                      <div className="absolute -top-3 -right-3 text-4xl animate-pulse">✨</div>
                      <div className="absolute -bottom-3 -left-3 text-4xl animate-pulse" style={{ animationDelay: '0.5s' }}>⚡</div>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Feature panels - manga panel grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Panel 1 */}
            <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
              <div className="border-b-4 border-black pb-3 mb-4">
                <h3 className="text-2xl font-black uppercase tracking-tight">AI Game Master</h3>
              </div>
              <div className="relative bg-gray-100 border-2 border-black p-4 mb-4 h-32">
                {/* Manga halftone */}
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)',
                  backgroundSize: '6px 6px'
                }} />
                <div className="relative z-10 flex items-center justify-center h-full">
                  <span className="text-6xl">👑</span>
                </div>
              </div>
              <p className="font-bold text-sm">Dynamic storytelling that adapts to your every choice!</p>
            </div>

            {/* Panel 2 */}
            <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
              <div className="border-b-4 border-black pb-3 mb-4">
                <h3 className="text-2xl font-black uppercase tracking-tight">Epic Stories</h3>
              </div>
              <div className="relative bg-gray-100 border-2 border-black p-4 mb-4 h-32">
                {/* Manga halftone */}
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)',
                  backgroundSize: '6px 6px'
                }} />
                <div className="relative z-10 flex items-center justify-center h-full">
                  <span className="text-6xl">📚</span>
                </div>
              </div>
              <p className="font-bold text-sm">Immersive worlds with deep lore and unforgettable characters!</p>
            </div>

            {/* Panel 3 */}
            <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
              <div className="border-b-4 border-black pb-3 mb-4">
                <h3 className="text-2xl font-black uppercase tracking-tight">Your Legend</h3>
              </div>
              <div className="relative bg-gray-100 border-2 border-black p-4 mb-4 h-32">
                {/* Manga halftone */}
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)',
                  backgroundSize: '6px 6px'
                }} />
                <div className="relative z-10 flex items-center justify-center h-full">
                  <span className="text-6xl">⚔️</span>
                </div>
              </div>
              <p className="font-bold text-sm">Create and evolve your hero through epic adventures!</p>
            </div>
          </div>

          {/* Bottom notice - manga style */}
          <div className="mt-8 text-center">
            <div className="inline-block bg-yellow-300 border-4 border-black px-6 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-black text-sm uppercase">
                ⚠️ Demo Mode - Click "Begin Now" to start ⚠️
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
