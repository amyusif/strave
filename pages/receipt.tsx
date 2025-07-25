import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { QRCodeCanvas } from "qrcode.react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ReceiptPage = () => {
  const router = useRouter();
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const id = searchParams ? searchParams.get('id') : null;
  const [ticket, setTicket] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!id) return;
    const fetchTicket = async () => {
      const { data, error } = await supabase.from("tickets").select("*").eq("id", id).single();
      if (error) {
        setTicket(null);
      } else {
        setTicket(data);
      }
      setLoading(false);
    };
    fetchTicket();
  }, [id]);

  const downloadPDF = async () => {
    const doc = new jsPDF();
    doc.setFontSize(24);
    doc.text("Ticket Receipt", 20, 20);
    doc.setFontSize(16);
    doc.text(`Name: ${ticket.name}`, 20, 40);
    doc.text(`Email: ${ticket.email}`, 20, 50);
    doc.text(`Ticket Type: ${ticket.ticket_type}`, 20, 60);
    doc.text(`Quantity: ${ticket.quantity}`, 20, 70);
    doc.text(`Reference: ${ticket.paystack_ref}`, 20, 80);
    doc.text("Scan QR code at event entry:", 20, 100);
    if (qrRef.current) {
      const canvas = await html2canvas(qrRef.current);
      const imgData = canvas.toDataURL("image/png");
      doc.addImage(imgData, "PNG", 20, 110, 50, 50);
    }
    doc.save(`ticket-${ticket.id}.pdf`);
  };

  if (loading) return <div className="p-8 text-center">Loading your ticket receipt...</div>;
  if (!ticket) return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg mt-10 text-black text-center">
      <h1 className="text-3xl font-bold mb-4">Ticket Not Found</h1>
      <p className="mb-4">We could not find your ticket. Please check your email for your payment reference or contact support.</p>
      <button
        onClick={() => window.location.href = "/"}
        className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-full mt-4"
      >
        Go to Homepage
      </button>
    </div>
  );

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg mt-10 text-black">
      <h1 className="text-3xl font-bold mb-4 text-center">🎟️ Your Ticket Receipt</h1>
      <div className="mb-4 text-center text-lg font-semibold text-green-700">Payment Successful!</div>
      <div className="mb-4">
        <strong>Name:</strong> {ticket.name}
      </div>
      <div className="mb-4">
        <strong>Email:</strong> {ticket.email}
      </div>
      <div className="mb-4">
        <strong>Ticket Type:</strong> {ticket.ticket_type}
      </div>
      <div className="mb-4">
        <strong>Quantity:</strong> {ticket.quantity}
      </div>
      <div className="mb-4">
        <strong>Reference:</strong> {ticket.paystack_ref}
      </div>
      <div className="mb-6 text-center" ref={qrRef}>
        <QRCodeCanvas value={`TICKET:${ticket.id}`} size={128} />
        <div className="text-xs mt-2">Scan this QR code at event entry</div>
      </div>
      <button
        onClick={downloadPDF}
        className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold py-3 rounded-full mb-2"
      >
        Download PDF Ticket
      </button>
      <button
        onClick={() => window.location.href = "/"}
        className="w-full bg-gray-200 hover:bg-gray-300 text-black font-bold py-3 rounded-full mt-2"
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default ReceiptPage; 