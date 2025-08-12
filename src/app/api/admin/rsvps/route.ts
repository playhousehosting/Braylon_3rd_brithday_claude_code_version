import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
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

    const rsvps = await prisma.rsvp.findMany({
      include: {
        user: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Format the data for the frontend
    const formattedRsvps = rsvps.map((rsvp) => ({
      id: rsvp.id,
      name: rsvp.user.name || 'No name',
      email: rsvp.user.email,
      attending: rsvp.attending,
      guestCount: rsvp.guestCount,
      dietaryRestrictions: rsvp.dietaryRestrictions,
      specialRequests: rsvp.specialRequests,
      createdAt: rsvp.createdAt.toISOString()
    }))

    return NextResponse.json({ rsvps: formattedRsvps })
  } catch (error) {
    console.error("Error fetching RSVPs:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}