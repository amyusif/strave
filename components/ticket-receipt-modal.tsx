import React, { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface TicketReceiptModalProps {
  open: boolean;
  onClose: () => void;
  ticket: any;
}

const TicketReceiptModal: React.FC<TicketReceiptModalProps> = ({
  open,
  onClose,
  ticket,
}) => {
  const ticketCardRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<HTMLDivElement>(null);

  const saveAsImage = async () => {
    if (ticket && ticketCardRef.current) {
      const canvas = await html2canvas(ticketCardRef.current);
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = `ticket-${ticket.id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!ticket) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#0a0a1a] max-w-lg p-0 rounded-xl shadow-2xl border border-[#23234d]">
        <div className="flex flex-col items-center justify-center py-8 px-6">
          {/* Ticket Card */}
          <div
            ref={ticketCardRef}
            className="w-full flex flex-row items-center justify-between bg-gradient-to-br from-[#18184a] to-[#0a0a1a] rounded-xl p-6 relative border border-[#23234d]"
            style={{ minWidth: 350 }}
          >
            <div className="flex-1">
              <div className="text-lg font-bold text-[#00eaff] tracking-widest mb-1">
                THE STUDENTS RAVE
              </div>
              <div className="text-pink-500 font-bold text-sm mb-4 tracking-widest">
                AKWAABA EDITION
              </div>
              <div className="text-2xl font-extrabold text-[#00eaff] mb-2">
                {ticket.name?.toUpperCase()}
              </div>
              <div className="flex flex-col gap-1 text-xs text-[#b0b0ff] font-mono mb-2">
                <span>TICKET ID: RAVE#{ticket.id}</span>
                <span>DATE: April 26, 2025</span>
                <span>TIME: 7:00 PM</span>
                <span>VENUE: CAMPUS FORECOURT</span>
              </div>
              <div className="flex flex-row gap-2 text-[10px] text-[#b0b0ff] mt-4">
                <span>ADMIT ONE</span>
                <span>|</span>
                <span>NON-TRANSFERABLE</span>
                <span>|</span>
                <span>SHOW ID AT GATE</span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center ml-6">
              <div ref={qrRef} className="bg-white p-2 rounded">
                <QRCodeCanvas value={`TICKET:${ticket.id}`} size={80} />
              </div>
            </div>
          </div>
          {/* End Ticket Card */}
          <button
            onClick={saveAsImage}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold py-3 rounded-full mb-2 mt-8"
          >
            Save Ticket as Image
          </button>
          <button
            onClick={onClose}
            className="w-full bg-gray-200 hover:bg-gray-300 text-black font-bold py-3 rounded-full mt-2"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TicketReceiptModal;
