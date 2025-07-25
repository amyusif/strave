"use client";

import React, { useState, useEffect } from "react";

import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import TicketReceiptModal from "./ticket-receipt-modal";
import { supabase } from "@/lib/supabase";

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketType: string;
}

// Paystack public key
const PAYSTACK_PUBLIC_KEY = "pk_test_11bf9e6adfb3029be6792c5af6918cb85b42dbb4";

// Type declaration for PaystackPop
declare global {
  interface Window {
    PaystackPop?: any;
  }
}

const TicketModal = ({ isOpen, onClose, ticketType }: TicketModalProps) => {
  const ticketTypes = ["Early Bird", "General Admission", "VIP Experience"];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    ticketType: ticketType || ticketTypes[0],
    quantity: "1",
  });
  const [loading, setLoading] = useState(false);
  const [paystackReady, setPaystackReady] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptTicket, setReceiptTicket] = useState<any>(null);

  // Update ticketType in formData if prop changes (for modal re-open)
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      ticketType: ticketType || ticketTypes[0],
    }));
  }, [ticketType]);

  // Dynamically load Paystack script if not present
  useEffect(() => {
    if (!window.PaystackPop) {
      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js";
      script.async = true;
      script.onload = () => setPaystackReady(true);
      document.body.appendChild(script);
    } else {
      setPaystackReady(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Thank you, ${formData.name}! Your ${formData.quantity} ${formData.ticketType} ticket(s) request has been received. We'll contact you at ${formData.email} with payment details.`
    );
    setFormData({
      name: "",
      email: "",
      ticketType: ticketType || ticketTypes[0],
      quantity: "1",
    });
    onClose();
  };

  // Paystack payment handler
  const handlePaystack = async () => {
    setLoading(true);
    try {
      // Validate required fields
      if (
        !formData.name ||
        !formData.email ||
        !formData.ticketType ||
        !formData.quantity
      ) {
        alert("Please fill in all required fields before paying.");
        setLoading(false);
        return;
      }
      if (!paystackReady) {
        alert(
          "Paystack script is still loading. Please wait a moment and try again."
        );
        setLoading(false);
        return;
      }
      const amountMap: { [key: string]: number } = {
        "Early Bird": 25,
        "General Admission": 40,
        "VIP Experience": 75,
      };
      const amount =
        amountMap[formData.ticketType] * parseInt(formData.quantity, 10) * 100; // in kobo/pesewas
      if (!amount || isNaN(amount) || amount <= 0) {
        alert("Invalid ticket amount. Please check your selection.");
        setLoading(false);
        return;
      }
      if (!window.PaystackPop) {
        alert(
          "Paystack script not loaded. Please wait a moment and try again."
        );
        setLoading(false);
        return;
      }
      const handler = window.PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: formData.email,
        amount,
        currency: "GHS",
        firstname: formData.name,
        label: formData.ticketType,
        callback: function (response: any) {
          (async () => {
            setLoading(true);
            // Store ticket in Supabase
            try {
              const { data, error } = await supabase
                .from("tickets")
                .insert([
                  {
                    name: formData.name,
                    email: formData.email,
                    ticket_type: formData.ticketType,
                    quantity: formData.quantity,
                    paystack_ref: response.reference,
                  },
                ])
                .select();
              if (error) {
                setLoading(false);
                alert(
                  "Payment succeeded but failed to save ticket. Please contact support."
                );
                return;
              }
              // Debug log
              const ticket = data && data[0];
              console.log("Ticket insert data:", data, "Ticket:", ticket);
              if (ticket && ticket.id) {
                setReceiptTicket(ticket);
                setShowReceipt(true);
              } else {
                setLoading(false);
                alert(
                  "Payment succeeded but ticket not found. Please contact support.\nIf you see a ticket in your email, you can view it at /receipt?id=YOUR_TICKET_ID"
                );
                console.error("Ticket insert returned no ID:", data);
              }
              setFormData({
                name: "",
                email: "",
                ticketType: ticketType || ticketTypes[0],
                quantity: "1",
              });
              onClose();
            } catch (err) {
              setLoading(false);
              console.error("Supabase error after payment:", err);
              alert(
                "Payment succeeded but an error occurred saving your ticket. Please contact support."
              );
            }
          })();
        },
        onClose: function () {
          setLoading(false);
          alert("Payment window closed.");
        },
      });
      if (handler) handler.openIframe();
      else {
        setLoading(false);
        alert("Paystack handler could not be created. Please try again.");
      }
    } catch (err) {
      setLoading(false);
      console.error("Paystack integration error:", err);
      if (err instanceof Error) {
        alert(`An error occurred with Paystack: ${err.message}`);
      } else {
        alert(
          "An unknown error occurred with Paystack. Please try again or contact support."
        );
      }
    }
  };

  return (
    <>
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
            {/* ...existing code for form fields... */}
            <div>
              <Label
                htmlFor="name"
                className="text-sm font-medium text-gray-300"
              >
                Your Name
              </Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="mt-1 bg-gray-800 border-gray-600 text-white focus:border-cyan-500"
                required
              />
            </div>

            <div>
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-300"
              >
                Your Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="mt-1 bg-gray-800 border-gray-600 text-white focus:border-cyan-500"
                required
              />
            </div>

            <div>
              <Label
                htmlFor="ticketType"
                className="text-sm font-medium text-gray-300"
              >
                Ticket Type
              </Label>
              <Select
                value={formData.ticketType}
                onValueChange={(value) =>
                  setFormData({ ...formData, ticketType: value })
                }
              >
                <SelectTrigger className="mt-1 bg-gray-800 border-gray-600 text-cyan-400 font-bold text-center">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {ticketTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label
                htmlFor="quantity"
                className="text-sm font-medium text-gray-300"
              >
                Quantity
              </Label>
              <Select
                value={formData.quantity}
                onValueChange={(value) =>
                  setFormData({ ...formData, quantity: value })
                }
              >
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
          </motion.form>
          {/* Only show Pay with Paystack button */}
          <Button
            type="button"
            className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold py-3 rounded-full"
            onClick={handlePaystack}
            disabled={
              loading ||
              !formData.name ||
              !formData.email ||
              !formData.ticketType ||
              !formData.quantity ||
              !paystackReady
            }
          >
            {loading ? "Processing..." : "Purchase"}
          </Button>
        </DialogContent>
      </Dialog>
      {/* Show ticket receipt modal after payment */}
      <TicketReceiptModal
        open={showReceipt}
        onClose={() => setShowReceipt(false)}
        ticket={receiptTicket}
      />
    </>
  );
};

export default TicketModal;
