import { Badge } from './ui/badge'
import { Avatar, AvatarFallback } from './ui/avatar'

export function Header() {
  return (
    <header className="w-full bg-gradient-to-r from-purple-900/80 to-purple-800/80 backdrop-blur-sm border-b border-purple-700/30">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-xl">🎲</span>
          </div>
          <div>
            <h1 className="text-white text-xl">WorldArchitect.AI</h1>
            <p className="text-purple-200 text-sm">Campaign Dashboard</p>
          </div>
        </div>

        {/* Center Badge */}
        <Badge variant="outline" className="bg-purple-700/50 text-purple-100 border-purple-500/50">
          🌟 Fantasy
        </Badge>

        {/* Profile Section */}
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-white">Epic Adventurer</p>
            <p className="text-purple-200 text-sm">adventurer@worldarchitect.ai</p>
          </div>
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-purple-600 text-white">EA</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}