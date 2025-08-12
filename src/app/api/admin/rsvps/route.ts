import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Session } from "next-auth"

// Check if email belongs to admin domain
function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false
  return email.endsWith('@dynamicendpoints.com')
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions) as Session | null
    
    // Check if user is admin
    if (!session?.user?.email || !isAdminEmail(session.user.email)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // TODO: Replace with real Prisma data once database is working
    // For now, return mock data to demonstrate the admin panel functionality
    const mockRsvps = [
      {
        id: "1",
        name: "John Smith",
        email: "john@example.com",
        attending: true,
        guestCount: 2,
        dietaryRestrictions: "No nuts",
        specialRequests: "High chair needed",
        createdAt: new Date().toISOString()
      },
      {
        id: "2", 
        name: "Sarah Johnson",
        email: "sarah@example.com",
        attending: true,
        guestCount: 1,
        dietaryRestrictions: null,
        specialRequests: null,
        createdAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: "3",
        name: "Mike Wilson", 
        email: "mike@example.com",
        attending: false,
        guestCount: 0,
        dietaryRestrictions: null,
        specialRequests: "Sorry, can't make it!",
        createdAt: new Date(Date.now() - 172800000).toISOString()
      }
    ]

    return NextResponse.json({ rsvps: mockRsvps })
  } catch (error) {
    console.error("Error fetching RSVPs:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}