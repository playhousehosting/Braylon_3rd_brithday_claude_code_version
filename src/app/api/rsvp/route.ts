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
        attending,
        guestCount: Math.max(0, Math.min(10, guestCount || 0)), // Limit guest count
        dietaryRestrictions,
        specialRequests,
      },
      create: {
        userId: user.id,
        attending,
        guestCount: Math.max(0, Math.min(10, guestCount || 0)),
        dietaryRestrictions,
        specialRequests,
      },
    })

    return NextResponse.json({ success: true, rsvp })
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
    const rsvps = await prisma.rsvp.findMany({
      include: {
        user: {
          select: { name: true, email: true },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ rsvps })
  } catch (error) {
    console.error("Get RSVPs error:", error)
    return NextResponse.json(
      { error: "Failed to fetch RSVPs" },
      { status: 500 }
    )
  }
}
