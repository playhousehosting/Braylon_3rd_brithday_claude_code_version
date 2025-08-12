import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// Check if email belongs to admin domain
async function isAdmin(email: string | null | undefined) {
  if (!email) return false
  return email.endsWith('@dynamicendpoints.com')
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email || !await isAdmin(session.user.email)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    // TODO: Replace with real Prisma delete once database is working
    // For now, return success since we're using mock data
    console.log(`Mock delete RSVP with id: ${id}`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting RSVP:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email || !await isAdmin(session.user.email)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { name, email, attending, guests, dietaryRestrictions, specialRequests } = body

    // TODO: Replace with real Prisma update once database is working
    // For now, return mock updated data
    const mockUpdatedRsvp = {
      id,
      name,
      email,
      attending: attending === "true",
      guestCount: parseInt(guests) || 1,
      dietaryRestrictions: dietaryRestrictions || null,
      specialRequests: specialRequests || null,
      createdAt: new Date().toISOString()
    }

    console.log(`Mock update RSVP with id: ${id}`, mockUpdatedRsvp)

    return NextResponse.json({ rsvp: mockUpdatedRsvp })
  } catch (error) {
    console.error("Error updating RSVP:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}