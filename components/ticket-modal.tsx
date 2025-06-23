"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ShoppingCart } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface TicketModalProps {
  isOpen: boolean
  onClose: () => void
  ticketType: string
}

const TicketModal = ({ isOpen, onClose, ticketType }: TicketModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    quantity: "1",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle ticket purchase
    alert(
      `Thank you, ${formData.name}! Your ${formData.quantity} ${ticketType} ticket(s) request has been received. We'll contact you at ${formData.email} with payment details.`,
    )
    setFormData({ name: "", email: "", quantity: "1" })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent text-center">
            Complete Your Ticket Purchase
          </DialogTitle>
        </DialogHeader>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="space-y-6 mt-6"
        >
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-gray-300">
              Your Name
            </Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 bg-gray-800 border-gray-600 text-white focus:border-cyan-500"
              required
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-medium text-gray-300">
              Your Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 bg-gray-800 border-gray-600 text-white focus:border-cyan-500"
              required
            />
          </div>

          <div>
            <Label htmlFor="ticketType" className="text-sm font-medium text-gray-300">
              Ticket Type
            </Label>
            <Input
              id="ticketType"
              value={ticketType}
              readOnly
              className="mt-1 bg-gray-700 border-gray-600 text-cyan-400 font-bold text-center"
            />
          </div>

          <div>
            <Label htmlFor="quantity" className="text-sm font-medium text-gray-300">
              Quantity
            </Label>
            <Select value={formData.quantity} onValueChange={(value) => setFormData({ ...formData, quantity: value })}>
              <SelectTrigger className="mt-1 bg-gray-800 border-gray-600 text-white focus:border-cyan-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                {[1, 2, 3, 4, 5].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold py-3 rounded-full"
          >
            <ShoppingCart className="mr-2" size={18} />
            Purchase Now
          </Button>
        </motion.form>
      </DialogContent>
    </Dialog>
  )
}

export default TicketModal
