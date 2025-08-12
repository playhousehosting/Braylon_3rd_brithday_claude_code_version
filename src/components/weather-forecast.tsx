"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  Wind, 
  Thermometer,
  Droplets,
  MapPin,
  Calendar
} from "lucide-react"

interface WeatherDay {
  date: string
  day: string
  high: number
  low: number
  condition: string
  icon: typeof Sun
  humidity: number
  windSpeed: number
  precipitation: number
  description: string
}

// Mock weather data for the party week (October 4th, 2025)
const weatherData: WeatherDay[] = [
  {
    date: "Oct 1",
    day: "Wednesday", 
    high: 72,
    low: 58,
    condition: "Partly Cloudy",
    icon: Cloud,
    humidity: 65,
    windSpeed: 8,
    precipitation: 10,
    description: "Perfect for outdoor setup!"
  },
  {
    date: "Oct 2", 
    day: "Thursday",
    high: 75,
    low: 62,
    condition: "Sunny",
    icon: Sun,
    humidity: 55,
    windSpeed: 6,
    precipitation: 0,
    description: "Beautiful day ahead"
  },
  {
    date: "Oct 3",
    day: "Friday", 
    high: 78,
    low: 64,
    condition: "Sunny",
    icon: Sun,
    humidity: 50,
    windSpeed: 7,
    precipitation: 0,
    description: "Great weather continues"
  },
  {
    date: "Oct 4",
    day: "Saturday",
    high: 76,
    low: 61,
    condition: "Partly Sunny",
    icon: Cloud,
    humidity: 60,
    windSpeed: 5,
    precipitation: 5,
    description: "Perfect party weather! 🎉"
  },
  {
    date: "Oct 5",
    day: "Sunday",
    high: 73,
    low: 59,
    condition: "Mostly Sunny", 
    icon: Sun,
    humidity: 58,
    windSpeed: 9,
    precipitation: 0,
    description: "Great for cleanup day"
  },
  {
    date: "Oct 6",
    day: "Monday",
    high: 70,
    low: 56,
    condition: "Partly Cloudy",
    icon: Cloud,
    humidity: 68,
    windSpeed: 12,
    precipitation: 15,
    description: "Cooler after the party"
  },
  {
    date: "Oct 7",
    day: "Tuesday",
    high: 68,
    low: 54,
    condition: "Light Rain",
    icon: CloudRain,
    humidity: 75,
    windSpeed: 10,
    precipitation: 40,
    description: "Time to head inside"
  }
]

export function WeatherForecast() {
  const [selectedDay, setSelectedDay] = useState<WeatherDay>(weatherData[3]) // Party day default
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const partyDay = weatherData[3] // October 4th

  return (
    <section className="py-20 bg-gradient-to-br from-sky-50 to-blue-100 dark:from-sky-900/20 dark:to-blue-900/20">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
            Party Week Weather
          </h2>
          <div className="flex items-center justify-center gap-2 mb-6">
            <MapPin className="w-5 h-5 text-gray-600" />
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Towanda, Kansas Forecast
            </p>
          </div>
        </motion.div>

        {/* Party Day Highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-2xl">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Calendar className="w-6 h-6" />
                <CardTitle className="text-2xl">Party Day Weather</CardTitle>
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-lg px-4 py-2">
                {partyDay.day}, {partyDay.date}
              </Badge>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex items-center justify-center gap-4 mb-6">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <partyDay.icon className="w-16 h-16" />
                </motion.div>
                <div>
                  <div className="text-5xl font-bold">{partyDay.high}°F</div>
                  <div className="text-xl opacity-90">High: {partyDay.high}° • Low: {partyDay.low}°</div>
                </div>
              </div>
              <div className="text-xl mb-4">{partyDay.condition}</div>
              <div className="text-lg font-semibold">{partyDay.description}</div>
              
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/20">
                <div className="text-center">
                  <Droplets className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-sm opacity-90">Humidity</div>
                  <div className="font-bold">{partyDay.humidity}%</div>
                </div>
                <div className="text-center">
                  <Wind className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-sm opacity-90">Wind</div>
                  <div className="font-bold">{partyDay.windSpeed} mph</div>
                </div>
                <div className="text-center">
                  <CloudRain className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-sm opacity-90">Rain</div>
                  <div className="font-bold">{partyDay.precipitation}%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 7-Day Forecast */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
            7-Day Forecast
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
            {weatherData.map((day, index) => (
              <motion.div
                key={day.date}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => setSelectedDay(day)}
              >
                <Card className={`cursor-pointer transition-all duration-300 hover:shadow-xl ${
                  day.date === "Oct 4" 
                    ? 'ring-4 ring-yellow-400 bg-gradient-to-b from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20' 
                    : 'bg-white dark:bg-gray-800'
                } ${selectedDay.date === day.date ? 'ring-2 ring-blue-400' : ''}`}>
                  <CardContent className="p-4 text-center">
                    <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      {day.day}
                    </div>
                    <div className="text-lg font-bold mb-3">{day.date}</div>
                    
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="mb-3"
                    >
                      <day.icon className="w-8 h-8 mx-auto text-blue-500" />
                    </motion.div>
                    
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      {day.condition}
                    </div>
                    
                    <div className="space-y-1">
                      <div className="text-lg font-bold text-gray-800 dark:text-gray-200">
                        {day.high}°
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {day.low}°
                      </div>
                    </div>
                    
                    {day.date === "Oct 4" && (
                      <Badge variant="secondary" className="mt-2 bg-yellow-500 text-white text-xs">
                        🎉 Party Day!
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Selected Day Details */}
        <motion.div
          key={selectedDay.date}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-12"
        >
          <Card className="max-w-4xl mx-auto bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl flex items-center justify-center gap-3">
                <selectedDay.icon className="w-8 h-8 text-blue-500" />
                {selectedDay.day}, {selectedDay.date} Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="space-y-2">
                  <Thermometer className="w-8 h-8 mx-auto text-red-500" />
                  <div className="text-sm text-gray-600 dark:text-gray-400">Temperature</div>
                  <div className="font-bold text-lg">{selectedDay.high}° / {selectedDay.low}°</div>
                </div>
                <div className="space-y-2">
                  <Droplets className="w-8 h-8 mx-auto text-blue-500" />
                  <div className="text-sm text-gray-600 dark:text-gray-400">Humidity</div>
                  <div className="font-bold text-lg">{selectedDay.humidity}%</div>
                </div>
                <div className="space-y-2">
                  <Wind className="w-8 h-8 mx-auto text-gray-500" />
                  <div className="text-sm text-gray-600 dark:text-gray-400">Wind Speed</div>
                  <div className="font-bold text-lg">{selectedDay.windSpeed} mph</div>
                </div>
                <div className="space-y-2">
                  <CloudRain className="w-8 h-8 mx-auto text-indigo-500" />
                  <div className="text-sm text-gray-600 dark:text-gray-400">Precipitation</div>
                  <div className="font-bold text-lg">{selectedDay.precipitation}%</div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  <strong>{selectedDay.condition}</strong> - {selectedDay.description}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-green-100 dark:bg-green-900/20 rounded-lg p-6 max-w-2xl mx-auto">
            <div className="text-green-800 dark:text-green-200">
              <div className="text-xl font-bold mb-2">🌤️ Party Weather Update</div>
              <p className="text-lg">
                Perfect outdoor weather expected for Braylon&apos;s party! 
                Comfortable temperatures and low chance of rain. 
                Don&apos;t forget sunscreen! ☀️
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}