import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Plus, Users, Calendar, Sword, Shield, Crown, BookOpen, Settings, Play } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface Campaign {
  id: string
  title: string
  description: string
  theme: 'fantasy' | 'cyberpunk' | 'dark-fantasy'
  players: number
  maxPlayers: number
  lastPlayed: string
  status: 'active' | 'recruiting' | 'completed'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  imageUrl: string
}

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'The Dragon\'s Hoard',
    description: 'A classic fantasy adventure where brave heroes must infiltrate an ancient dragon\'s lair to recover stolen treasures and save the kingdom.',
    theme: 'fantasy',
    players: 4,
    maxPlayers: 6,
    lastPlayed: '2 days ago',
    status: 'active',
    difficulty: 'intermediate',
    imageUrl: 'https://images.unsplash.com/photo-1756565717914-2d3730b83484?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMGZhbnRhc3klMjBjaGFyYWN0ZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzA2NDQ5MTF8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: '2', 
    title: 'Neon Shadows',
    description: 'In the sprawling megacity of Neo-Tokyo 2087, corporate espionage and cyber-enhanced mercenaries clash in the digital underground.',
    theme: 'cyberpunk',
    players: 3,
    maxPlayers: 5,
    lastPlayed: '1 week ago',
    status: 'recruiting',
    difficulty: 'advanced',
    imageUrl: 'https://images.unsplash.com/photo-1613487971624-24f87ffdbfc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMGN5YmVycHVuayUyMGNoYXJhY3RlciUyMG5lb258ZW58MXx8fHwxNzcwNjQ0OTExfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: '3',
    title: 'The Cursed Crown',
    description: 'Dark magic has corrupted the royal bloodline. Navigate political intrigue and supernatural horrors in this gothic fantasy campaign.',
    theme: 'dark-fantasy',
    players: 5,
    maxPlayers: 6,
    lastPlayed: '3 days ago',
    status: 'active',
    difficulty: 'beginner',
    imageUrl: 'https://images.unsplash.com/photo-1768797646664-0c33d518facf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMGRhcmslMjBmYW50YXN5JTIwY2hhcmFjdGVyfGVufDF8fHx8MTc3MDY0NDkxMXww&ixlib=rb-4.1.0&q=80&w=1080'
  }
]

const difficultyIcons = {
  beginner: Shield,
  intermediate: Sword,
  advanced: Crown
}

export function CampaignList() {
  const [campaigns] = useState<Campaign[]>(mockCampaigns)

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Manga halftone background */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)',
            backgroundSize: '5px 5px'
          }}
        />
      </div>

      {/* Speed lines in background */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute h-[2px] bg-black"
            style={{
              width: `${150 + Math.random() * 300}px`,
              top: `${Math.random() * 100}%`,
              left: '-150px',
              transform: `rotate(${-5 + Math.random() * 10}deg)`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 py-8 relative z-10">
        {/* Header - Manga style */}
        <div className="mb-8">
          <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 
                  className="text-5xl font-black uppercase tracking-tighter mb-2"
                  style={{
                    color: 'white',
                    WebkitTextStroke: '3px black',
                    paintOrder: 'stroke fill',
                  }}
                >
                  YOUR CAMPAIGNS
                </h1>
                <p className="text-lg font-bold">Select your adventure or create a new one!</p>
              </div>
              <Button 
                className="bg-black border-4 border-black text-white font-black uppercase px-6 py-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                <Plus className="w-5 h-5 mr-2" />
                NEW CAMPAIGN
              </Button>
            </div>
          </div>
        </div>

        {/* Campaign Grid - Manga panel style */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {campaigns.map((campaign) => {
            const DifficultyIcon = difficultyIcons[campaign.difficulty]
            
            return (
              <div 
                key={campaign.id} 
                className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                {/* Campaign Image with manga effects */}
                <div className="relative border-b-4 border-black overflow-hidden bg-gray-100">
                  <div className="aspect-[4/3] relative">
                    <ImageWithFallback
                      src={campaign.imageUrl}
                      alt={campaign.title}
                      className="w-full h-full object-cover grayscale"
                    />
                    
                    {/* Manga screentone overlay */}
                    <div className="absolute inset-0 opacity-20" style={{
                      backgroundImage: 'radial-gradient(circle, black 1.5px, transparent 1.5px)',
                      backgroundSize: '8px 8px'
                    }} />

                    {/* Status badge - manga style */}
                    <div className="absolute top-3 right-3">
                      <div className={`
                        bg-${campaign.status === 'active' ? 'green' : campaign.status === 'recruiting' ? 'yellow' : 'gray'}-300 
                        border-2 border-black px-3 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                      `}>
                        <span className="font-black text-xs uppercase">{campaign.status}</span>
                      </div>
                    </div>

                    {/* Difficulty icon */}
                    <div className="absolute top-3 left-3 bg-white border-2 border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <DifficultyIcon className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title with manga font style */}
                  <h3 className="text-2xl font-black uppercase tracking-tight mb-2 border-b-4 border-black pb-2">
                    {campaign.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-4 text-sm font-bold">
                    <span className="uppercase">{campaign.difficulty}</span>
                    <span>•</span>
                    <span className="uppercase">{campaign.theme.replace('-', ' ')}</span>
                  </div>

                  <p className="text-sm leading-relaxed mb-4 font-medium line-clamp-3">
                    {campaign.description}
                  </p>

                  {/* Stats box */}
                  <div className="bg-gray-100 border-2 border-black p-3 mb-4">
                    <div className="flex justify-between items-center text-sm font-bold">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{campaign.players}/{campaign.maxPlayers} PLAYERS</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{campaign.lastPlayed.toUpperCase()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2">
                    <button className="flex-1 bg-black border-2 border-black text-white font-black uppercase py-3 px-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all">
                      <div className="flex items-center justify-center gap-2">
                        <Play className="w-4 h-4" />
                        {campaign.status === 'recruiting' ? 'JOIN' : 'CONTINUE'}
                      </div>
                    </button>
                    <button className="bg-white border-2 border-black p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all">
                      <Settings className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
          
          {/* Create New Campaign Card - manga style */}
          <div className="bg-white border-4 border-dashed border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer group">
            <div className="flex flex-col items-center justify-center p-12 h-full min-h-[400px]">
              {/* Halftone background */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'radial-gradient(circle, black 2px, transparent 2px)',
                backgroundSize: '10px 10px'
              }} />
              
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-black border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
                  <Plus className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tight mb-3">
                  START NEW
                </h3>
                <h4 className="text-4xl font-black uppercase tracking-tight mb-4">
                  ADVENTURE!
                </h4>
                <p className="font-bold text-sm">Create a custom campaign with AI</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions - Manga style */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-white border-4 border-black font-black uppercase py-4 px-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
            <div className="flex items-center justify-center gap-3">
              <BookOpen className="w-6 h-6" />
              BROWSE TEMPLATES
            </div>
          </button>
          <button className="bg-white border-4 border-black font-black uppercase py-4 px-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
            <div className="flex items-center justify-center gap-3">
              <Users className="w-6 h-6" />
              FIND PLAYERS
            </div>
          </button>
          <button className="bg-white border-4 border-black font-black uppercase py-4 px-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
            <div className="flex items-center justify-center gap-3">
              <Crown className="w-6 h-6" />
              AI GAME MASTER
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
