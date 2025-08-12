import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"

// Check if email belongs to admin domain
async function isAdmin(email: string | null | undefined) {
  if (!email) return false
  return email.endsWith('@dynamicendpoints.com')
}

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email || !await isAdmin(session.user.email)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = context.params

    await prisma.rsvp.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting RSVP:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email || !await isAdmin(session.user.email)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = context.params
    const body = await request.json()
    const { name, email, attending, guests, dietaryRestrictions, specialRequests } = body

    // Update user first
    const rsvp = await prisma.rsvp.findUnique({
      where: { id },
      include: { user: true }
    })
    
    if (!rsvp) {
      return NextResponse.json({ error: "RSVP not found" }, { status: 404 })
    }

    await prisma.user.update({
      where: { id: rsvp.userId },
      data: { name, email }
    })

    const updatedRsvp = await prisma.rsvp.update({
      where: { id },
      data: {
        attending: attending === "true",
        guestCount: parseInt(guests) || 1,
        dietaryRestrictions: dietaryRestrictions || "",
        specialRequests: specialRequests || "",
      },
      include: {
        user: true
      }
    })

    return NextResponse.json({ rsvp: updatedRsvp })
  } catch (error) {
    console.error("Error updating RSVP:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}