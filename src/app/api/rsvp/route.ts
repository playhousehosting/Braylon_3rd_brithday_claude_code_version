import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// Simple in-memory rate limiting
const rateLimit = new Map<string, { count: number; resetTime: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 10

  const record = rateLimit.get(ip)
  
  if (!record || now > record.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + windowMs })
    return false
  }
  
  if (record.count >= maxRequests) {
    return true
  }
  
  record.count++
  return false
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      )
    }

    const body = await request.json()
    
    // Basic validation
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      )
    }

    const { name, email, attending, guestCount, dietaryRestrictions, specialRequests } = body

    // Check if user exists, create if not
    let user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          name,
          email
        }
      })
    }

    // Create or update RSVP
    const rsvp = await prisma.rsvp.upsert({
      where: { userId: user.id },
      update: {
        attending: attending === true || attending === 'true',
        guestCount: Math.max(0, Math.min(10, parseInt(guestCount?.toString() || '1'))),
        dietaryRestrictions: dietaryRestrictions || null,
        specialRequests: specialRequests || null,
      },
      create: {
        userId: user.id,
        attending: attending === true || attending === 'true',
        guestCount: Math.max(0, Math.min(10, parseInt(guestCount?.toString() || '1'))),
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
      success: true, 
      rsvp: {
        id: rsvp.id,
        name: rsvp.user.name,
        email: rsvp.user.email,
        attending: rsvp.attending,
        guestCount: rsvp.guestCount,
        dietaryRestrictions: rsvp.dietaryRestrictions,
        specialRequests: rsvp.specialRequests,
        createdAt: rsvp.createdAt.toISOString()
      }
    })
  } catch (error) {
    console.error("RSVP error:", error)
    return NextResponse.json(
      { error: "Failed to process RSVP" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Fetch all RSVPs from database
    const rsvps = await prisma.rsvp.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Transform data for response
    const transformedRsvps = rsvps.map((rsvp: typeof rsvps[0]) => ({
      id: rsvp.id,
      name: rsvp.user.name,
      email: rsvp.user.email,
      attending: rsvp.attending,
      guestCount: rsvp.guestCount,
      dietaryRestrictions: rsvp.dietaryRestrictions,
      specialRequests: rsvp.specialRequests,
      createdAt: rsvp.createdAt.toISOString()
    }))

    return NextResponse.json({ rsvps: transformedRsvps })
  } catch (error) {
    console.error("Get RSVPs error:", error)
    return NextResponse.json(
      { error: "Failed to fetch RSVPs" },
      { status: 500 }
    )
  }
}
