import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

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

    // Delete RSVP from database
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

    // Find the RSVP to update
    const existingRsvp = await prisma.rsvp.findUnique({
      where: { id },
      include: { user: true }
    })

    if (!existingRsvp) {
      return NextResponse.json({ error: "RSVP not found" }, { status: 404 })
    }

    // Update user information if changed
    if (name !== existingRsvp.user.name || email !== existingRsvp.user.email) {
      await prisma.user.update({
        where: { id: existingRsvp.userId },
        data: {
          name: name || existingRsvp.user.name,
          email: email || existingRsvp.user.email
        }
      })
    }

    // Update RSVP
    const updatedRsvp = await prisma.rsvp.update({
      where: { id },
      data: {
        attending: attending === "true" || attending === true,
        guestCount: Math.max(0, Math.min(10, parseInt(guests?.toString() || '1'))),
        dietaryRestrictions: dietaryRestrictions || null,
        specialRequests: specialRequests || null,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json({ 
      rsvp: {
        id: updatedRsvp.id,
        name: updatedRsvp.user.name,
        email: updatedRsvp.user.email,
        attending: updatedRsvp.attending,
        guestCount: updatedRsvp.guestCount,
        dietaryRestrictions: updatedRsvp.dietaryRestrictions,
        specialRequests: updatedRsvp.specialRequests,
        createdAt: updatedRsvp.createdAt.toISOString()
      }
    })
  } catch (error) {
    console.error("Error updating RSVP:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}