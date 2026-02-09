import { useState } from 'react'
import backgroundImage from 'figma:asset/7388009b8bbea20b44923143edf5bb1c4c93e240.png'
import { Button } from './components/ui/button'
import { Header } from './components/Header'
import { FeatureCards } from './components/FeatureCards'
import { CampaignList } from './components/CampaignList'

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'campaigns'>('landing')
  
  // Override global body background with lighter purple theme
  document.body.style.background = 'linear-gradient(135deg, rgb(147 51 234), rgb(126 34 206), rgb(79 70 229))'

  if (currentView === 'campaigns') {
    return <CampaignList />
  }

  return (
    <div className="min-h-screen">
      {/* Background Section */}
      <div className="relative min-h-screen">
        {/* Fantasy Background Image */}
        <div 
          className="absolute inset-0 bg-center bg-cover"
          style={{ 
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover'
          }}
        />
        
        {/* Light Purple Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/40 via-purple-500/35 to-indigo-600/40" />
        
        {/* Content over background */}
        <div className="relative z-10 min-h-screen flex flex-col">
          <Header />
          
          {/* Main Content - Upper portion */}
          <main className="flex-1 flex flex-col items-center justify-start px-6 pt-8 pb-12">
            <div className="text-center max-w-4xl mx-auto">
              {/* Welcome Section */}
              <div className="mb-16">
                <h1 className="text-6xl md:text-7xl text-white mb-6">
                  Welcome, Adventurer
                </h1>
                <p className="text-xl text-purple-200 mb-12 max-w-2xl mx-auto leading-relaxed">
                  Every hero's journey begins with a single step. Create your campaign and let the AI Game Master guide you through an unforgettable adventure.
                </p>
              </div>

              {/* Forge Your Legend Section */}
              <div className="mb-16">
                <h2 className="text-5xl text-white mb-8">
                  Forge Your Legend
                </h2>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-16 py-6 text-xl rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => setCurrentView('campaigns')}
                >
                  ✨ Create Your First Campaign ✨
                </Button>
              </div>
            </div>
          </main>

          {/* Bottom section for Feature Cards */}
          <div className="h-48 flex items-center justify-center px-6">
            <FeatureCards />
          </div>
        </div>
      </div>
    </div>
  )
}