"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Calendar, Timer, Sparkles } from "lucide-react"

interface CountdownTimerProps {
  targetDate: string
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date()
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const timeUnits = [
    { label: "Days", value: timeLeft.days, icon: Calendar, color: "from-blue-500 to-purple-600" },
    { label: "Hours", value: timeLeft.hours, icon: Clock, color: "from-green-500 to-blue-600" },
    { label: "Minutes", value: timeLeft.minutes, icon: Timer, color: "from-yellow-500 to-orange-600" },
    { label: "Seconds", value: timeLeft.seconds, icon: Sparkles, color: "from-pink-500 to-red-600" },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      {/* Background Animation */}
      {mounted && (
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Party Countdown
          </h2>
          <p className="text-xl md:text-2xl text-gray-300">
            The construction adventure begins soon!
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                delay: index * 0.2,
                type: "spring",
                damping: 20,
                stiffness: 300
              }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.05 }}
            >
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300 shadow-2xl">
                <CardContent className="p-6 text-center">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-r ${unit.color} rounded-full flex items-center justify-center shadow-lg`}
                  >
                    <unit.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  
                  <motion.div
                    key={unit.value}
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.3 }}
                    className="text-4xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                  >
                    {unit.value.toString().padStart(2, "0")}
                  </motion.div>
                  
                  <div className="text-sm md:text-lg font-semibold text-gray-300 uppercase tracking-wider">
                    {unit.label}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-lg text-gray-300 mb-4">
            🚧 Get ready for the ultimate construction party! 🚧
          </p>
          <div className="flex justify-center space-x-4 text-yellow-400">
            <motion.span
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
            >
              ⚡
            </motion.span>
            <motion.span
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            >
              🎉
            </motion.span>
            <motion.span
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
            >
              🎂
            </motion.span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
