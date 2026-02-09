import { useState } from 'react'
import { LandingPage } from './components/LandingPage'
import { CampaignList } from './components/CampaignList'

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'campaigns'>('landing')

  if (currentView === 'campaigns') {
    return <CampaignList />
  }

  return <LandingPage onLogin={() => setCurrentView('campaigns')} />
}