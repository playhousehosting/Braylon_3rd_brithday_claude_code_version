import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    // Check if user is admin
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // In a real app, you would check if the user is an admin
    // For now, we'll allow access to any authenticated user
    const rsvps = await prisma.rSVP.findMany({
      include: {
        user: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Format the data for the frontend
    const formattedRsvps = rsvps.map(rsvp => ({
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