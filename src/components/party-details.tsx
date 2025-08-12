"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  MapPin, 
  Clock, 
  Calendar, 
  Users, 
  Gift, 
  Utensils,
  Camera,
  Music,
  Gamepad2,
  PartyPopper
} from "lucide-react"

const partyDetails = [
  {
    icon: Calendar,
    title: "Date",
    description: "October 4th, 2025",
    details: "Saturday",
    color: "bg-blue-500"
  },
  {
    icon: Clock,
    title: "Time",
    description: "2:00 PM - 6:00 PM",
    details: "4 hours of fun!",
    color: "bg-green-500"
  },
  {
    icon: MapPin,
    title: "Location",
    description: "4928 SW Cliff Road",
    details: "Towanda, Kansas",
    color: "bg-red-500"
  },
  {
    icon: Users,
    title: "Guests",
    description: "Family & Friends",
    details: "All ages welcome",
    color: "bg-purple-500"
  }
]

const activities = [
  {
    icon: Gamepad2,
    title: "Construction Games",
    description: "Interactive building challenges"
  },
  {
    icon: Camera,
    title: "Photo Booth",
    description: "Construction-themed props"
  },
  {
    icon: Utensils,
    title: "Themed Food",
    description: "Construction worker favorites"
  },
  {
    icon: Music,
    title: "DJ & Dancing",
    description: "Construction hits playlist"
  },
  {
    icon: Gift,
    title: "Party Favors",
    description: "Mini tool sets for everyone"
  },
  {
    icon: PartyPopper,
    title: "Surprise Activities",
    description: "Special birthday surprises"
  }
]

export function PartyDetails() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-orange-50 dark:from-blue-900/20 dark:to-orange-900/20">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
            Party Details
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Everything you need to know about Braylon&apos;s special day
          </p>
        </motion.div>

        {/* Main Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {partyDetails.map((detail, index) => {
            const isLocation = detail.title === "Location"
            const mapUrl = isLocation 
              ? `https://www.google.com/maps/search/?api=1&query=4928+SW+Cliff+Road+Towanda+Kansas`
              : undefined
            
            const CardWrapper = isLocation ? 'a' : 'div'
            const cardProps = isLocation 
              ? { 
                  href: mapUrl, 
                  target: "_blank", 
                  rel: "noopener noreferrer",
                  className: "block"
                }
              : {}

            return (
              <motion.div
                key={detail.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <CardWrapper {...cardProps}>
                  <Card className={`h-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-2 hover:shadow-2xl transition-all duration-300 group ${isLocation ? 'cursor-pointer hover:scale-105' : ''}`}>
                    <CardHeader className="text-center pb-4">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`w-16 h-16 ${detail.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
                      >
                        <detail.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <CardTitle className="text-xl font-bold">{detail.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        {detail.description}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {detail.details}
                      </p>
                      {isLocation && (
                        <div className="mt-3">
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            📍 Click for Map
                          </Badge>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </CardWrapper>
              </motion.div>
            )
          })}
        </div>

        {/* Activities Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-200">
              Party Activities
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Exciting construction-themed fun for everyone!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-orange-900/20 border hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3">
                      <motion.div
                        whileHover={{ rotate: 15 }}
                        className="p-3 bg-orange-500 rounded-lg text-white"
                      >
                        <activity.icon className="w-6 h-6" />
                      </motion.div>
                      <CardTitle className="text-lg">{activity.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">
                      {activity.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Special Notes */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                🚧 Important Party Notes 🚧
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-lg">What to Bring:</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      Comfortable Clothes
                    </Badge>
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      Camera Ready
                    </Badge>
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      Appetite for Fun
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-lg">Party Theme:</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      Construction Zone
                    </Badge>
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      Hard Hats Welcome
                    </Badge>
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      Safety First
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}