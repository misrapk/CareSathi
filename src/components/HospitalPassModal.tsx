import React from 'react';
import { PatientBookingRequest } from '../types';
import { X, ShieldCheck, QrCode, Building2, Bed, User, Clock, Printer } from 'lucide-react';

interface HospitalPassModalProps {
  request: PatientBookingRequest;
  onClose: () => void;
}

export const HospitalPassModal: React.FC<HospitalPassModalProps> = ({ request, onClose }) => {
  const caregiver = request.matchedCaregiver;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-stone-200">
        
        {/* Pass Top Banner */}
        <div className="bg-teal-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-800 flex items-center justify-center text-teal-200">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] tracking-widest uppercase font-bold text-teal-300 block">
                OFFICIAL DIGITAL PASS
              </span>
              <h4 className="font-bold text-sm tracking-tight text-white">
                Hospital Attendant Entry Badge
              </h4>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-teal-800/80 hover:bg-teal-800 text-stone-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Badge Card Body */}
        <div className="p-6 space-y-4">
          
          <div className="text-center border-b border-stone-200 pb-4">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
              Authorized Attendant For
            </span>
            <div className="text-xl font-bold text-stone-900 mt-0.5">
              {request.patientName}
            </div>
            <div className="text-xs font-semibold text-teal-800 mt-0.5">
              {request.hospitalName} · {request.wardRoomBed}
            </div>
          </div>

          {/* Caregiver Portrait & Badge */}
          {caregiver && (
            <div className="flex items-center gap-4 bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
              <div className={`w-14 h-14 rounded-2xl ${caregiver.avatarColor} text-white text-2xl font-bold flex items-center justify-center shadow shrink-0`}>
                {caregiver.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-stone-900 text-sm truncate">
                    {caregiver.name}
                  </span>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                </div>
                <div className="text-xs text-stone-500 font-mono">
                  Badge: <span className="font-bold text-stone-800">{caregiver.badgeId}</span>
                </div>
                <div className="text-[11px] text-emerald-700 font-medium">
                  Aadhaar Verified · Police Cleared
                </div>
              </div>
            </div>
          )}

          {/* QR Code & OTP Handshake Info */}
          <div className="flex items-center justify-between p-4 bg-stone-100/70 rounded-2xl border border-stone-200">
            <div className="space-y-1">
              <span className="text-[10px] text-stone-500 uppercase tracking-widest font-bold block">
                GATE VERIFICATION
              </span>
              <span className="text-xs font-mono font-bold text-stone-800 block">
                PASS: CS-{request.id.slice(-6).toUpperCase()}
              </span>
              <span className="text-[11px] text-stone-600 block">
                Duty Start OTP: <strong className="font-mono text-stone-900">{request.startOtp}</strong>
              </span>
            </div>

            {/* Simulated QR Code */}
            <div className="w-16 h-16 bg-white p-1.5 rounded-xl border border-stone-300 flex items-center justify-center shadow-inner">
              <QrCode className="w-full h-full text-stone-900" />
            </div>
          </div>

          <div className="text-[11px] text-stone-500 text-center leading-relaxed">
            Permitted for 24/7 bedside assistance and patient escort under Hospital Nursing Sister in-charge oversight.
          </div>

          <div className="pt-2 flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="flex-1 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Hospital Pass</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl transition-colors"
            >
              Close
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
