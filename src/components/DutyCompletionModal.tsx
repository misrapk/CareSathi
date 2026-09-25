import React, { useState } from 'react';
import { PatientBookingRequest } from '../types';
import { CheckCircle2, Star, IndianRupee, QrCode, ShieldCheck, Download, Heart } from 'lucide-react';

interface DutyCompletionModalProps {
  request: PatientBookingRequest;
  onFinishAndReset: (rating: number, review: string, paymentMethod: 'upi' | 'cash') => void;
  onClose: () => void;
}

export const DutyCompletionModal: React.FC<DutyCompletionModalProps> = ({
  request,
  onFinishAndReset,
  onClose
}) => {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('Rameshwar was very gentle and attentive. Kept my father hydrated and alerted the nurse on time.');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cash'>('upi');
  const [paymentDone, setPaymentDone] = useState(false);

  const caregiver = request.matchedCaregiver;
  const elapsedMinutes = request.dutyStartedAt 
    ? Math.max(1, Math.round((Date.now() - request.dutyStartedAt) / 60000))
    : request.requestedHours * 60;
  
  // Calculate bill (minimum 1 hour, proportional or booked hours)
  const billedHours = Math.max(1, request.requestedHours);
  const totalAmount = billedHours * request.hourlyRate;

  const handleComplete = () => {
    onFinishAndReset(rating, review, paymentMethod);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200">
        
        {/* Top Header */}
        <div className="bg-stone-900 text-white p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2 border border-emerald-500/30">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold tracking-tight">Bedside Duty Concluded</h3>
          <p className="text-xs text-stone-400 mt-0.5">
            Shift successfully completed for {request.patientName} at {request.hospitalName}
          </p>
        </div>

        {/* Receipt & Breakdown */}
        <div className="p-6 space-y-5">
          
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2 text-xs">
            <div className="flex justify-between items-center text-stone-600">
              <span>Attendant Name:</span>
              <span className="font-bold text-stone-900">{caregiver?.name} ({caregiver?.badgeId})</span>
            </div>
            <div className="flex justify-between items-center text-stone-600">
              <span>Ward / Bed:</span>
              <span className="font-semibold text-stone-800">{request.wardRoomBed}</span>
            </div>
            <div className="flex justify-between items-center text-stone-600">
              <span>Shift Duration:</span>
              <span className="font-mono font-semibold text-stone-900 tabular-nums">
                {billedHours} Hours (@ ₹{request.hourlyRate}/hr)
              </span>
            </div>
            <div className="flex justify-between items-center text-stone-600">
              <span>Hospital Attendant Verification:</span>
              <span className="text-emerald-700 font-semibold">Free (Included)</span>
            </div>
            <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline">
              <span className="text-sm font-bold text-stone-900">Total Payable Amount:</span>
              <span className="text-2xl font-black text-stone-900 tabular-nums">₹{totalAmount}</span>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-xs font-semibold text-stone-800 mb-2">
              Select Payment Method to Pay Attendant:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-teal-700 bg-teal-50 ring-1 ring-teal-700'
                    : 'border-stone-200 bg-stone-50'
                }`}
              >
                <div className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                  <QrCode className="w-4 h-4 text-teal-800" />
                  <span>Instant UPI QR</span>
                </div>
                <span className="text-[11px] text-stone-500 block mt-0.5">GPay / PhonePe / Paytm</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cash')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  paymentMethod === 'cash'
                    ? 'border-teal-700 bg-teal-50 ring-1 ring-teal-700'
                    : 'border-stone-200 bg-stone-50'
                }`}
              >
                <div className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                  <IndianRupee className="w-4 h-4 text-teal-800" />
                  <span>Cash in Hand</span>
                </div>
                <span className="text-[11px] text-stone-500 block mt-0.5">Hand directly to Sathi</span>
              </button>
            </div>
          </div>

          {/* Rating Caregiver */}
          <div>
            <label className="block text-xs font-semibold text-stone-800 mb-1">
              Rate your CareSathi Attendant:
            </label>
            <div className="flex items-center gap-2 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 text-amber-400 hover:scale-110 transition-transform"
                >
                  <Star className={`w-6 h-6 ${star <= rating ? 'fill-amber-400' : 'text-stone-300'}`} />
                </button>
              ))}
              <span className="text-xs font-bold text-stone-700 ml-1">
                {rating === 5 ? 'Excellent Care & Vigil' : `${rating} Stars`}
              </span>
            </div>

            <textarea
              rows={2}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Leave a short note for the attendant..."
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
            />
          </div>

          {/* Submit Actions */}
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={handleComplete}
              className="w-full py-3 bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm Payment & Settle Duty (₹{totalAmount})</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
