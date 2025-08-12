"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserPlus, X, Check, AlertCircle } from "lucide-react"

const userSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  attending: z.enum(["true", "false"]),
  guests: z.string().min(1, "Number of guests required"),
  dietaryRestrictions: z.string().optional(),
  specialRequests: z.string().optional(),
})

type UserFormData = z.infer<typeof userSchema>

interface AddUserFormProps {
  onUserAdded: () => void
  onClose: () => void
}

export function AddUserForm({ onUserAdded, onClose }: AddUserFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  const { register, handleSubmit, formState: { errors }, reset } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      attending: "true",
      guests: "1",
    }
  })

  const onSubmit = async (data: UserFormData) => {
    try {
      setStatus("submitting")
      
      const response = await fetch("/api/admin/rsvps", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setStatus("success")
        reset()
        onUserAdded()
        setTimeout(() => {
          setStatus("idle")
          onClose()
        }, 2000)
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl"
      >
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <UserPlus className="w-6 h-6 text-blue-600" />
              <CardTitle>Add New Guest</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            {status === "success" ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-8"
              >
                <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-green-700 mb-2">Guest Added Successfully!</h3>
                <p className="text-gray-600">The new guest has been added to the RSVP list.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                {/* Attending */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Will they be attending? *
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        {...register("attending")}
                        value="true"
                        className="mr-3"
                      />
                      Yes, they&apos;ll be there!
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        {...register("attending")}
                        value="false"
                        className="mr-3"
                      />
                      Sorry, they can&apos;t make it
                    </label>
                  </div>
                </div>

                {/* Number of Guests */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of guests (including themselves) *
                  </label>
                  <select
                    {...register("guests")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'person' : 'people'}
                      </option>
                    ))}
                  </select>
                  {errors.guests && (
                    <p className="mt-1 text-sm text-red-600">{errors.guests.message}</p>
                  )}
                </div>

                {/* Dietary Restrictions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dietary restrictions
                  </label>
                  <input
                    {...register("dietaryRestrictions")}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., vegetarian, gluten-free, allergies"
                  />
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special requests or messages
                  </label>
                  <textarea
                    {...register("specialRequests")}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Any special requests or birthday messages"
                  />
                </div>

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md"
                  >
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <span className="text-red-700">Failed to add guest. Please try again.</span>
                  </motion.div>
                )}

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={status === "submitting"}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    {status === "submitting" ? "Adding Guest..." : "Add Guest"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}