import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"

// Admin emails - you can add more admin emails here
const ADMIN_EMAILS = [
  "admin@example.com", // Replace with your actual admin email
  "owner@example.com"  // Add more admin emails as needed
]

async function isAdmin(email: string | null | undefined) {
  if (!email) return false
  return ADMIN_EMAILS.includes(email)
}

export async function GET() {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email || !await isAdmin(session.user.email)) {
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

    return NextResponse.json({ rsvps })
  } catch (error) {
    console.error("Error fetching RSVPs:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email || !await isAdmin(session.user.email)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { name, email, attending, guests, dietaryRestrictions, specialRequests } = body

    // Create or update user
    const user = await prisma.user.upsert({
      where: { email },
      update: { name },
      create: { name, email },
    })

    // Create or update RSVP
    const rsvp = await prisma.rsvp.upsert({
      where: { userId: user.id },
      update: {
        attending: attending === "true",
        guestCount: parseInt(guests) || 1,
        dietaryRestrictions: dietaryRestrictions || "",
        specialRequests: specialRequests || "",
      },
      create: {
        userId: user.id,
        attending: attending === "true",
        guestCount: parseInt(guests) || 1,
        dietaryRestrictions: dietaryRestrictions || "",
        specialRequests: specialRequests || "",
      },
      include: {
        user: true
      }
    })

    return NextResponse.json({ rsvp })
  } catch (error) {
    console.error("Error creating RSVP:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}