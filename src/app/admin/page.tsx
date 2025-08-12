"use client"

import { useState, useEffect } from "react"

// Force this page to be client-side only
export const dynamic = 'force-dynamic'
import { useSession, signIn, signOut } from "next-auth/react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AddUserForm } from "@/components/admin/add-user-form"
import { 
  Users, 
  Download, 
  UserPlus, 
  Shield, 
  LogOut,
  Calendar,
  Mail,
  FileText,
  Trash2,
  RefreshCw
} from "lucide-react"

interface RSVPData {
  id: string
  attending: boolean
  guestCount: number
  dietaryRestrictions: string | null
  specialRequests: string | null
  createdAt: string
  user: {
    id: string
    name: string | null
    email: string
  }
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const [rsvpData, setRsvpData] = useState<RSVPData[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddUser, setShowAddUser] = useState(false)
  const [stats, setStats] = useState({
    totalRSVPs: 0,
    attending: 0,
    notAttending: 0,
    totalGuests: 0
  })

  useEffect(() => {
    if (session) {
      fetchRSVPData()
    }
  }, [session]) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchRSVPData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/rsvps')
      if (response.ok) {
        const data = await response.json()
        setRsvpData(data.rsvps || [])
        calculateStats(data.rsvps || [])
      }
    } catch (error) {
      console.error('Error fetching RSVP data:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (data: RSVPData[]) => {
    const attending = data.filter(rsvp => rsvp.attending).length
    const totalGuests = data.reduce((sum, rsvp) => sum + (rsvp.attending ? rsvp.guestCount : 0), 0)
    
    setStats({
      totalRSVPs: data.length,
      attending,
      notAttending: data.length - attending,
      totalGuests
    })
  }

  const downloadRSVPList = () => {
    const csvContent = [
      ['Name', 'Email', 'Attending', 'Guests', 'Dietary Restrictions', 'Special Requests', 'Date Submitted'].join(','),
      ...rsvpData.map(rsvp => [
        `"${rsvp.user.name || ''}"`,
        `"${rsvp.user.email}"`,
        rsvp.attending ? 'Yes' : 'No',
        rsvp.guestCount.toString(),
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

  const deleteRSVP = async (id: string) => {
    if (confirm('Are you sure you want to delete this RSVP?')) {
      try {
        const response = await fetch(`/api/admin/rsvps/${id}`, {
          method: 'DELETE'
        })
        if (response.ok) {
          fetchRSVPData()
        }
      } catch (error) {
        console.error('Error deleting RSVP:', error)
      }
    }
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
                <FileText className="w-8 h-8 text-blue-200" />
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
                <Calendar className="w-8 h-8 text-red-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Total Guests</p>
                  <p className="text-3xl font-bold">{stats.totalGuests}</p>
                </div>
                <UserPlus className="w-8 h-8 text-purple-200" />
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
                  onClick={downloadRSVPList}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                >
                  <Download className="w-4 h-4" />
                  Download RSVP List (CSV)
                </Button>
                <Button 
                  onClick={() => setShowAddUser(true)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  <UserPlus className="w-4 h-4" />
                  Add Guest Manually
                </Button>
                <Button 
                  onClick={fetchRSVPData}
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
                RSVP Responses ({rsvpData.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
                  <p>Loading RSVP data...</p>
                </div>
              ) : rsvpData.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No RSVPs yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {rsvpData.map((rsvp, index) => (
                    <motion.div
                      key={rsvp.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">{rsvp.user.name || 'No name provided'}</h3>
                            <Badge variant={rsvp.attending ? "default" : "secondary"}>
                              {rsvp.attending ? "Attending" : "Not Attending"}
                            </Badge>
                            {rsvp.attending && (
                              <Badge variant="outline">
                                {rsvp.guestCount} guest{rsvp.guestCount !== 1 ? 's' : ''}
                              </Badge>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              {rsvp.user.email}
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {new Date(rsvp.createdAt).toLocaleDateString()}
                            </div>
                          </div>

                          {rsvp.dietaryRestrictions && (
                            <div className="mt-2">
                              <p className="text-sm"><strong>Dietary:</strong> {rsvp.dietaryRestrictions}</p>
                            </div>
                          )}

                          {rsvp.specialRequests && (
                            <div className="mt-2">
                              <p className="text-sm"><strong>Special Requests:</strong> {rsvp.specialRequests}</p>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteRSVP(rsvp.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Add User Modal */}
        <AnimatePresence>
          {showAddUser && (
            <AddUserForm
              onUserAdded={() => {
                fetchRSVPData()
                setShowAddUser(false)
              }}
              onClose={() => setShowAddUser(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}