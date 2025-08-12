"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { CheckCircle, AlertCircle } from "lucide-react"

const foodSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  itemName: z.string().min(2, "Item name required"),
  quantity: z.string().min(1, "Quantity required"),
  containsAllergens: z.string().optional(),
  notes: z.string().optional(),
})

type FoodFormData = z.infer<typeof foodSchema>

export function FoodSignupForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [submitting, setSubmitting] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FoodFormData>({
    resolver: zodResolver(foodSchema),
    defaultValues: {
      quantity: "",
    }
  })

  const onSubmit = async (data: FoodFormData) => {
    setSubmitting(true)
    setStatus("idle")
    try {
      const res = await fetch("/api/food-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      if (res.ok) {
        setStatus("success")
        reset()
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="food" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Snack & Food Signup
          </h2>
          <p className="text-gray-600">
            Let us know what delicious construction fuel you can bring!
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input
                {...register("name")}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Your name"
              />
              {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                {...register("email")}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="you@email.com"
              />
              {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
            </div>
          </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Item You Will Bring *</label>
              <input
                {...register("itemName")}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Cupcakes, Fruit Tray, Juice Boxes..."
              />
              {errors.itemName && <p className="text-sm text-red-600 mt-1">{errors.itemName.message}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity / Size *</label>
                <input
                  {...register("quantity")}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="24 mini cupcakes / 2L juice"
                />
                {errors.quantity && <p className="text-sm text-red-600 mt-1">{errors.quantity.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Allergens (if any)</label>
                <input
                  {...register("containsAllergens")}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="nuts, dairy, gluten..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                rows={3}
                {...register("notes")}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Preparation details or storage instructions"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-yellow-500 text-gray-900 font-bold py-3 px-4 rounded-md hover:bg-yellow-600 transition-colors disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Food Signup"}
            </button>

            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-green-600"
              >
                <CheckCircle className="w-5 h-5" />
                <span>Thank you! Your contribution is recorded.</span>
              </motion.div>
            )}
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-600"
              >
                <AlertCircle className="w-5 h-5" />
                <span>Something went wrong. Please try again.</span>
              </motion.div>
            )}
        </motion.form>
      </div>
    </section>
  )
}
