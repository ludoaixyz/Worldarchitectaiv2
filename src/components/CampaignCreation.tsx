'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Crown, 
  Brain, 
  Target,
  Users,
  Globe,
  Wand2,
  Shield,
  Sword,
  BookOpen,
  Dice6,
  User,
  Play
} from 'lucide-react'
import type { Campaign, Theme } from '../App'

interface CampaignCreationProps {
  onCreateCampaign: (campaign: Omit<Campaign, 'id' | 'createdAt' | 'lastPlayed' | 'storyLength'>) => void
  onBack: () => void
  theme: Theme
}

type CreationStep = 'basic' | 'personas' | 'world' | 'companions' | 'review'

const aiPersonas = [
  {
    id: 'narrative',
    name: "Narrative Master",
    description: 'Rich storytelling and dramatic moments',
    icon: BookOpen,
    features: ['Rich descriptions', 'Character development', 'Emotional storytelling']
  },
  {
    id: 'mechanical',
    name: "Tactical Commander",
    description: 'Rules accuracy and strategic gameplay',
    icon: Target,
    features: ['Rules accuracy', 'Tactical combat', 'Strategic depth']
  },
  {
    id: 'calibration',
    name: "Balance Keeper",
    description: 'Perfect challenge balance',
    icon: Brain,
    features: ['Perfect balance', 'Adaptive difficulty', 'Player-focused']
  }
]

export function CampaignCreation({ onCreateCampaign, onBack, theme }: CampaignCreationProps) {
  const [currentStep, setCurrentStep] = useState<CreationStep>('basic')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    aiPersonas: [] as string[],
    hasCompanions: false,
    useDefaultWorld: true,
    customWorldDescription: ''
  })

  const steps = [
    { id: 'basic', title: 'BASICS', icon: BookOpen },
    { id: 'personas', title: 'AI MASTER', icon: Crown },
    { id: 'world', title: 'WORLD', icon: Globe },
    { id: 'companions', title: 'PARTY', icon: Users },
    { id: 'review', title: 'START!', icon: Check }
  ]

  const updateFormData = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  const togglePersona = (personaName: string) => {
    const isSelected = formData.aiPersonas.includes(personaName)
    if (isSelected) {
      updateFormData({
        aiPersonas: formData.aiPersonas.filter(p => p !== personaName)
      })
    } else {
      updateFormData({
        aiPersonas: [...formData.aiPersonas, personaName]
      })
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 'basic':
        return formData.title.trim() && formData.description.trim()
      case 'personas':
        return formData.aiPersonas.length > 0
      case 'world':
        return formData.useDefaultWorld || formData.customWorldDescription.trim()
      case 'companions':
        return true
      case 'review':
        return true
      default:
        return false
    }
  }

  const nextStep = () => {
    const stepOrder: CreationStep[] = ['basic', 'personas', 'world', 'companions', 'review']
    const currentIndex = stepOrder.indexOf(currentStep)
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1])
    }
  }

  const prevStep = () => {
    const stepOrder: CreationStep[] = ['basic', 'personas', 'world', 'companions', 'review']
    const currentIndex = stepOrder.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1])
    }
  }

  const handleCreate = () => {
    onCreateCampaign(formData)
  }

  const renderBasicStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-block bg-black border-4 border-black p-4 mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <BookOpen className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-4xl font-black uppercase tracking-tight mb-2">Campaign Basics</h2>
        <p className="font-bold">Name your adventure!</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label className="font-black uppercase text-sm">Campaign Title</Label>
          <Input
            value={formData.title}
            onChange={(e) => updateFormData({ title: e.target.value })}
            placeholder="Enter your campaign title..."
            className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
          />
        </div>
        
        <div className="space-y-2">
          <Label className="font-black uppercase text-sm">Campaign Description</Label>
          <Textarea
            value={formData.description}
            onChange={(e) => updateFormData({ description: e.target.value })}
            placeholder="Describe your campaign..."
            className="min-h-[120px] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold resize-none"
          />
        </div>
      </div>
    </div>
  )

  const renderPersonasStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-block bg-black border-4 border-black p-4 mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <Crown className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-4xl font-black uppercase tracking-tight mb-2">Choose AI Master</h2>
        <p className="font-bold">Select your game master style!</p>
      </div>

      <div className="grid gap-4">
        {aiPersonas.map((persona) => {
          const isSelected = formData.aiPersonas.includes(persona.name)
          return (
            <div 
              key={persona.id}
              className={`cursor-pointer transition-all ${
                isSelected 
                  ? 'bg-black text-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]' 
                  : 'bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
              }`}
              onClick={() => togglePersona(persona.name)}
            >
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 border-2 ${isSelected ? 'bg-white border-white' : 'bg-black border-black'}`}>
                    <persona.icon className={`w-8 h-8 ${isSelected ? 'text-black' : 'text-white'}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-black uppercase tracking-tight">{persona.name}</h3>
                      {isSelected && <Check className="w-6 h-6" />}
                    </div>
                    
                    <p className={`mb-3 font-bold text-sm ${isSelected ? 'text-gray-200' : 'text-gray-700'}`}>
                      {persona.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {persona.features.map((feature, index) => (
                        <div key={index} className={`px-2 py-1 border-2 ${isSelected ? 'bg-white text-black border-white' : 'bg-black text-white border-black'}`}>
                          <span className="text-xs font-black uppercase">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-yellow-300 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <p className="text-sm font-black uppercase text-center">
          💡 Select multiple for combined styles! 💡
        </p>
      </div>
    </div>
  )

  const renderWorldStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-block bg-black border-4 border-black p-4 mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <Globe className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-4xl font-black uppercase tracking-tight mb-2">Choose World</h2>
        <p className="font-bold">Select your adventure setting!</p>
      </div>

      <div className="space-y-4">
        <div 
          className={`cursor-pointer transition-all ${
            formData.useDefaultWorld 
              ? 'bg-black text-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]' 
              : 'bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
          }`}
          onClick={() => updateFormData({ useDefaultWorld: true })}
        >
          <div className="p-6">
            <div className="flex items-start space-x-4">
              <div className={`p-3 border-2 ${formData.useDefaultWorld ? 'bg-white border-white' : 'bg-black border-black'}`}>
                <Wand2 className={`w-8 h-8 ${formData.useDefaultWorld ? 'text-black' : 'text-white'}`} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-xl font-black uppercase tracking-tight">World of Assiah</h3>
                  {formData.useDefaultWorld && <Check className="w-6 h-6" />}
                  <div className="px-2 py-1 bg-yellow-300 border-2 border-black text-black text-xs font-black uppercase">
                    Recommended
                  </div>
                </div>
                
                <p className={`mb-3 font-bold text-sm ${formData.useDefaultWorld ? 'text-gray-200' : 'text-gray-700'}`}>
                  A rich fantasy realm with ancient kingdoms and legendary artifacts. Perfect for classic adventures!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div 
          className={`cursor-pointer transition-all ${
            !formData.useDefaultWorld 
              ? 'bg-black text-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]' 
              : 'bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
          }`}
          onClick={() => updateFormData({ useDefaultWorld: false })}
        >
          <div className="p-6">
            <div className="flex items-start space-x-4">
              <div className={`p-3 border-2 ${!formData.useDefaultWorld ? 'bg-white border-white' : 'bg-black border-black'}`}>
                <User className={`w-8 h-8 ${!formData.useDefaultWorld ? 'text-black' : 'text-white'}`} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-xl font-black uppercase tracking-tight">Custom World</h3>
                  {!formData.useDefaultWorld && <Check className="w-6 h-6" />}
                </div>
                
                <p className={`font-bold text-sm ${!formData.useDefaultWorld ? 'text-gray-200' : 'text-gray-700'}`}>
                  Create your own unique world with custom lore and locations!
                </p>
              </div>
            </div>
          </div>
        </div>

        {!formData.useDefaultWorld && (
          <div className="space-y-2 mt-4">
            <Label className="font-black uppercase text-sm">Describe Your World</Label>
            <Textarea
              value={formData.customWorldDescription}
              onChange={(e) => updateFormData({ customWorldDescription: e.target.value })}
              placeholder="Describe your world..."
              className="min-h-[120px] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold resize-none"
            />
          </div>
        )}
      </div>
    </div>
  )

  const renderCompanionsStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-block bg-black border-4 border-black p-4 mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <Users className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-4xl font-black uppercase tracking-tight mb-2">AI Companions</h2>
        <p className="font-bold">Add party members?</p>
      </div>

      <div className="space-y-4">
        <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-xl font-black uppercase tracking-tight mb-2">Include AI Companions</h3>
              <p className="font-bold text-sm">
                AI companions will join your party as NPCs, helping in combat and roleplay!
              </p>
            </div>
            <button
              onClick={() => updateFormData({ hasCompanions: !formData.hasCompanions })}
              className={`ml-4 w-20 h-10 border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all ${
                formData.hasCompanions ? 'bg-black' : 'bg-white'
              }`}
            >
              <div className={`w-full h-full flex items-center ${formData.hasCompanions ? 'justify-end pr-1' : 'justify-start pl-1'}`}>
                <div className={`w-6 h-6 border-2 ${formData.hasCompanions ? 'bg-white border-white' : 'bg-black border-black'}`} />
              </div>
            </button>
          </div>
        </div>

        {formData.hasCompanions && (
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center space-x-3 mb-3">
                <Sword className="w-6 h-6" />
                <h4 className="font-black uppercase">Combat Support</h4>
              </div>
              <p className="text-sm font-bold">
                Companions help in tactical battles!
              </p>
            </div>

            <div className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center space-x-3 mb-3">
                <Shield className="w-6 h-6" />
                <h4 className="font-black uppercase">Story Integration</h4>
              </div>
              <p className="text-sm font-bold">
                Each has unique personality and goals!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  const renderReviewStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-block bg-black border-4 border-black p-4 mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <Check className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-4xl font-black uppercase tracking-tight mb-2">Review Campaign</h2>
        <p className="font-bold">Ready to begin?</p>
      </div>

      <div className="space-y-4">
        <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="border-b-4 border-black pb-3 mb-4">
            <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Campaign Details
            </h3>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-black uppercase text-gray-600">Title</p>
              <p className="font-bold">{formData.title}</p>
            </div>
            <div>
              <p className="text-sm font-black uppercase text-gray-600">Description</p>
              <p className="font-bold">{formData.description}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="border-b-4 border-black pb-3 mb-4">
            <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
              <Crown className="w-5 h-5" />
              AI Game Masters
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.aiPersonas.map((persona) => (
              <div key={persona} className="px-3 py-1 bg-black text-white border-2 border-black font-black uppercase text-xs">
                {persona}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="border-b-4 border-black pb-3 mb-4">
            <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
              <Globe className="w-5 h-5" />
              World
            </h3>
          </div>
          {formData.useDefaultWorld ? (
            <div className="px-3 py-1 bg-black text-white border-2 border-black font-black uppercase text-sm inline-block">
              World of Assiah
            </div>
          ) : (
            <div>
              <div className="px-3 py-1 bg-black text-white border-2 border-black font-black uppercase text-sm inline-block mb-2">
                Custom World
              </div>
              <p className="font-bold text-sm">{formData.customWorldDescription}</p>
            </div>
          )}
        </div>

        <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="border-b-4 border-black pb-3 mb-4">
            <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
              <Users className="w-5 h-5" />
              Companions
            </h3>
          </div>
          <div className={`px-3 py-1 border-2 border-black font-black uppercase text-sm inline-block ${formData.hasCompanions ? 'bg-black text-white' : 'bg-white'}`}>
            {formData.hasCompanions ? 'AI Companions Enabled' : 'Solo Adventure'}
          </div>
        </div>
      </div>
    </div>
  )

  const renderStepContent = () => {
    switch (currentStep) {
      case 'basic':
        return renderBasicStep()
      case 'personas':
        return renderPersonasStep()
      case 'world':
        return renderWorldStep()
      case 'companions':
        return renderCompanionsStep()
      case 'review':
        return renderReviewStep()
      default:
        return null
    }
  }

  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.id === currentStep)
  }

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

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b-4 border-black bg-white shadow-[0px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={onBack}
                className="border-2 border-black p-2 hover:bg-gray-100"
              >
                <ArrowLeft className="w-6 h-6" />
              </Button>
              
              <div>
                <h1 className="text-2xl font-black uppercase tracking-tight">Create Campaign</h1>
                <p className="text-sm font-bold">
                  Step {getCurrentStepIndex() + 1} / {steps.length}
                </p>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="hidden md:flex items-center space-x-2">
              {steps.map((step, index) => {
                const isActive = step.id === currentStep
                const isCompleted = getCurrentStepIndex() > index
                
                return (
                  <div key={step.id} className="flex items-center space-x-2">
                    <div className={`w-12 h-12 border-4 border-black flex items-center justify-center transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${
                      isActive ? 'bg-black text-white scale-110' :
                      isCompleted ? 'bg-white' :
                      'bg-gray-200'
                    }`}>
                      {isCompleted ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        <step.icon className="w-6 h-6" />
                      )}
                    </div>
                    
                    {index < steps.length - 1 && (
                      <div className={`w-8 h-2 ${
                        isCompleted ? 'bg-black' : 'bg-gray-300'
                      }`} />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-8 max-w-4xl">
          <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="p-8">
              {renderStepContent()}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={getCurrentStepIndex() === 0}
              className={`border-4 border-black font-black uppercase px-6 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all ${
                getCurrentStepIndex() === 0 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-white hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
              }`}
            >
              <div className="flex items-center gap-2">
                <ArrowLeft className="w-5 h-5" />
                Previous
              </div>
            </button>

            <div className="flex md:hidden items-center space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 border-2 border-black ${
                    getCurrentStepIndex() >= index ? 'bg-black' : 'bg-white'
                  }`}
                />
              ))}
            </div>

            {currentStep === 'review' ? (
              <button
                onClick={handleCreate}
                disabled={!canProceed()}
                className={`bg-black text-white border-4 border-black font-black uppercase px-8 py-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all ${
                  !canProceed() 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Start Adventure!
                </div>
              </button>
            ) : (
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className={`bg-black text-white border-4 border-black font-black uppercase px-6 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all ${
                  !canProceed() 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                }`}
              >
                <div className="flex items-center gap-2">
                  Next
                  <ArrowRight className="w-5 h-5" />
                </div>
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
