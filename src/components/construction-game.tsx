"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Star, 
  Trophy, 
  Sparkles, 
  Heart,
  Gift,
  PartyPopper,
  Music,
  Camera,
  Palette,
  Circle
} from "lucide-react"
import confetti from "canvas-confetti"

interface GameItem {
  id: number
  emoji: string
  name: string
  color: string
  icon: typeof Star
}

const gameItems: GameItem[] = [
  { id: 1, emoji: "🎂", name: "Birthday Cake", color: "bg-pink-500", icon: PartyPopper },
  { id: 2, emoji: "🎈", name: "Balloon", color: "bg-red-500", icon: Circle },
  { id: 3, emoji: "🎁", name: "Present", color: "bg-blue-500", icon: Gift },
  { id: 4, emoji: "🎵", name: "Music", color: "bg-purple-500", icon: Music },
  { id: 5, emoji: "📷", name: "Camera", color: "bg-green-500", icon: Camera },
  { id: 6, emoji: "🎨", name: "Art", color: "bg-yellow-500", icon: Palette },
  { id: 7, emoji: "⭐", name: "Star", color: "bg-orange-500", icon: Star },
  { id: 8, emoji: "❤️", name: "Heart", color: "bg-rose-500", icon: Heart },
]

export function ConstructionGame() {
  const [score, setScore] = useState(0)
  const [currentTarget, setCurrentTarget] = useState<GameItem>(gameItems[0])
  const [gameStarted, setGameStarted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameOver, setGameOver] = useState(false)
  const [level, setLevel] = useState(1)
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      setGameOver(true)
      setGameStarted(false)
    }
  }, [timeLeft, gameStarted, gameOver])

  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
    setTimeLeft(30)
    setLevel(1)
    setStreak(0)
    setNewTarget()
  }

  const setNewTarget = () => {
    const newTarget = gameItems[Math.floor(Math.random() * gameItems.length)]
    setCurrentTarget(newTarget)
  }

  const handleItemClick = (item: GameItem) => {
    if (!gameStarted || gameOver) return

    if (item.id === currentTarget.id) {
      // Correct answer!
      const points = 10 + (streak * 2) + (level * 5)
      setScore(score + points)
      setStreak(streak + 1)
      
      // Celebrate with confetti
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 }
      })

      // Level up every 5 correct answers
      if ((score + points) % 50 === 0) {
        setLevel(level + 1)
        setTimeLeft(timeLeft + 10) // Bonus time
      }

      setNewTarget()
    } else {
      // Wrong answer
      setStreak(0)
      setTimeLeft(Math.max(0, timeLeft - 3)) // Penalty
    }
  }

  const getEncouragement = () => {
    if (score >= 100) return "🌟 Amazing! You're a learning superstar!"
    if (score >= 50) return "🎉 Fantastic! Keep going!"
    if (score >= 20) return "👏 Great job! You're doing wonderful!"
    return "🚀 You can do it! Keep trying!"
  }

  return (
    <section id="game" className="py-20 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Birthday Learning Game
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Find the birthday items and learn while having fun!
          </p>
        </motion.div>

        {!gameStarted && !gameOver && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-8"
          >
            <Card className="max-w-md mx-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">How to Play</h3>
                <div className="space-y-2 text-left">
                  <p>🎯 Find the item that matches the target</p>
                  <p>⏰ You have 30 seconds to score points</p>
                  <p>🔥 Build streaks for bonus points</p>
                  <p>🎁 Level up every 50 points</p>
                </div>
                <Button
                  onClick={startGame}
                  className="mt-6 bg-white text-purple-600 hover:bg-gray-100 font-bold px-8 py-3"
                  size="lg"
                >
                  Start Learning Game! 🚀
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {gameStarted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            {/* Game Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              <Card className="text-center bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">
                <CardContent className="p-4">
                  <Trophy className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-lg font-bold">{score}</div>
                  <div className="text-xs">Score</div>
                </CardContent>
              </Card>
              <Card className="text-center bg-gradient-to-r from-red-500 to-pink-600 text-white border-0">
                <CardContent className="p-4">
                  <div className="text-2xl mb-1">⏰</div>
                  <div className="text-lg font-bold">{timeLeft}</div>
                  <div className="text-xs">Time</div>
                </CardContent>
              </Card>
              <Card className="text-center bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-0">
                <CardContent className="p-4">
                  <Star className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-lg font-bold">{level}</div>
                  <div className="text-xs">Level</div>
                </CardContent>
              </Card>
              <Card className="text-center bg-gradient-to-r from-orange-500 to-yellow-600 text-white border-0">
                <CardContent className="p-4">
                  <Sparkles className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-lg font-bold">{streak}</div>
                  <div className="text-xs">Streak</div>
                </CardContent>
              </Card>
              <Card className="text-center bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-0 md:col-span-1 col-span-2">
                <CardContent className="p-4">
                  <Heart className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-xs">Find this!</div>
                </CardContent>
              </Card>
            </div>

            {/* Target Item */}
            <motion.div
              key={currentTarget.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 15 }}
              className="text-center mb-8"
            >
              <Card className="max-w-xs mx-auto bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-2xl">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Find the:</h3>
                  <div className="text-6xl mb-4">{currentTarget.emoji}</div>
                  <Badge variant="secondary" className="bg-white/20 text-white text-lg px-4 py-2">
                    {currentTarget.name}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}

        {/* Game Items Grid */}
        <AnimatePresence>
          {gameStarted && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            >
              {gameItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card
                    className={`cursor-pointer transition-all duration-300 hover:shadow-xl ${
                      item.id === currentTarget.id ? 'ring-4 ring-yellow-400 ring-opacity-75' : ''
                    }`}
                    onClick={() => handleItemClick(item)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="text-6xl mb-4">{item.emoji}</div>
                      <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                      <item.icon className="w-6 h-6 mx-auto text-gray-500" />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Game Over Screen */}
        <AnimatePresence>
          {gameOver && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center"
            >
              <Card className="max-w-md mx-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
                <CardContent className="p-8">
                  <Trophy className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-3xl font-bold mb-4">Game Over!</h3>
                  <div className="space-y-2 mb-6">
                    <div className="text-xl">Final Score: {score}</div>
                    <div className="text-lg">Level Reached: {level}</div>
                    <div className="text-lg">Best Streak: {streak}</div>
                  </div>
                  <p className="text-lg mb-6">{getEncouragement()}</p>
                  <Button
                    onClick={startGame}
                    className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-8 py-3"
                    size="lg"
                  >
                    Play Again! 🎮
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {!gameStarted && !gameOver && (
          <div className="text-center mt-8">
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              🎈 A fun learning game perfect for birthday party guests of all ages! 🎈
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
