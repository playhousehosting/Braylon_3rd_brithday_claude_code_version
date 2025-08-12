"use client"

import { useState, useEffect, useCallback } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  Download, 
  Shield, 
  LogOut,
  Image,
  RefreshCw
} from "lucide-react"

interface RSVP {
  id: string
  name: string
  email: string
  attending: boolean
  guestCount: number
  dietaryRestrictions: string | null
  specialRequests: string | null
  createdAt: string
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const [rsvps, setRsvps] = useState<RSVP[]>([])
  const [photos, setPhotos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalRSVPs: 0,
    attending: 0,
    notAttending: 0,
    totalGuests: 0,
    photos: 0
  })

  const fetchRSVPs = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/rsvps')
      if (res.ok) {
        const data = await res.json()
        setRsvps(data.rsvps)
        calculateStats(data.rsvps)
      }
    } catch (error) {
      console.error('Error fetching RSVPs:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchPhotos = useCallback(async () => {
    // For now, we'll just set a placeholder
    setPhotos([])
    setStats(prev => ({ ...prev, photos: 0 }))
  }, [])

  useEffect(() => {
    if (session) {
      fetchRSVPs()
      fetchPhotos()
    }
  }, [session, fetchRSVPs, fetchPhotos])

  const calculateStats = (data: RSVP[]) => {
    const attending = data.filter(rsvp => rsvp.attending).length
    const totalGuests = data.reduce((sum, rsvp) => sum + (rsvp.attending ? rsvp.guestCount : 0), 0)
    
    setStats({
      totalRSVPs: data.length,
      attending,
      notAttending: data.length - attending,
      totalGuests,
      photos: photos.length
    })
  }

  const downloadRSVPs = () => {
    const csvContent = [
      ['Name', 'Email', 'Attending', 'Guest Count', 'Dietary Restrictions', 'Special Requests', 'Date'].join(','),
      ...rsvps.map(rsvp => [
        `"${rsvp.name}"`,
        `"${rsvp.email}"`,
        rsvp.attending ? 'Yes' : 'No',
        rsvp.guestCount,
        `"${rsvp.dietaryRestrictions || ''}"`,
        `"${rsvp.specialRequests || ''}"`,
        new Date(rsvp.createdAt).toLocaleDateString()
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `braylon-birthday-rsvps-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Shield className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <CardTitle className="text-2xl">Admin Access Required</CardTitle>
            <p className="text-gray-600">Please sign in to access the admin dashboard</p>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => signIn()} 
              className="w-full bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-sm">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Braylon&apos;s 3rd Birthday Party Management</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Signed in as</p>
                <p className="font-semibold">{session.user?.email}</p>
              </div>
              <Button 
                onClick={() => signOut()} 
                variant="outline"
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total RSVPs</p>
                  <p className="text-3xl font-bold">{stats.totalRSVPs}</p>
                </div>
                <Users className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Attending</p>
                  <p className="text-3xl font-bold">{stats.attending}</p>
                </div>
                <Users className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100">Not Attending</p>
                  <p className="text-3xl font-bold">{stats.notAttending}</p>
                </div>
                <Users className="w-8 h-8 text-red-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Photos</p>
                  <p className="text-3xl font-bold">{stats.photos}</p>
                </div>
                <Image className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={downloadRSVPs}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                >
                  <Download className="w-4 h-4" />
                  Download RSVP List (CSV)
                </Button>
                <Button 
                  onClick={fetchRSVPs}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* RSVP List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                RSVP Responses ({rsvps.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
                  <p>Loading RSVP data...</p>
                </div>
              ) : rsvps.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No RSVPs yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3">Name</th>
                        <th className="text-left py-3">Email</th>
                        <th className="text-left py-3">Attending</th>
                        <th className="text-left py-3">Guests</th>
                        <th className="text-left py-3">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rsvps.map((rsvp) => (
                        <tr key={rsvp.id} className="border-b hover:bg-gray-50">
                          <td className="py-3">{rsvp.name}</td>
                          <td className="py-3">{rsvp.email}</td>
                          <td className="py-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              rsvp.attending 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {rsvp.attending ? 'Yes' : 'No'}
                            </span>
                          </td>
                          <td className="py-3">{rsvp.guestCount}</td>
                          <td className="py-3">
                            {new Date(rsvp.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}