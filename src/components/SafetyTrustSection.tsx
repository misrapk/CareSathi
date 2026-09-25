import React from 'react';
import { ShieldCheck, KeyRound, Clock, HeartHandshake, PhoneCall, CheckCircle2, UserCheck, Stethoscope } from 'lucide-react';

export const SafetyTrustSection: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-10">
      
      {/* Hero statement */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 text-teal-900 rounded-full text-xs font-semibold mb-3 border border-teal-200">
          <ShieldCheck className="w-4 h-4 text-teal-700" />
          TRUST & SAFETY PROTOCOL
        </div>
        <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight sm:text-4xl">
          Empathetic Bedside Care With Ola/Uber Style Safety Handshakes
        </h2>
        <p className="text-stone-600 mt-3 text-base leading-relaxed">
          In Indian hospitals, patient care often demands 24/7 bedside presence. When relatives have office emergencies or must travel, CareSathi provides instant, verified hourly attendants you can trust completely.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center shrink-0">
            <KeyRound className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-base text-stone-900">
              The 4-Digit Bedside OTP Handshake
            </h3>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed">
              Just like Ola/Uber cab rides, duty time never starts until the CareSathi physically arrives at the patient's room and enters the 4-digit OTP provided only on the family's screen.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-teal-800 font-semibold mt-2.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Guarantees physical presence before hourly billing begins
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-base text-stone-900">
              100% Aadhaar & Police Background Checked
            </h3>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed">
              Every attendant undergoes digital biometric KYC, permanent address verification, and local police verification before being allowed into hospital wards.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-800 font-semibold mt-2.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Digital Hospital Entry Pass issued with verified badge
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-base text-stone-900">
              Transparent Hourly Billing (₹100 – ₹200/hr)
            </h3>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed">
              Traditional ward boy or ayah agencies force families into 15-day or 30-day contracts with steep broker commissions. With CareSathi, pay only for the exact hours your loved one needs support.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-amber-800 font-semibold mt-2.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Pay via UPI or Cash directly after shift conclusion
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-800 flex items-center justify-center shrink-0">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-base text-stone-900">
              Hospital Nursing Station Coordination
            </h3>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed">
              CareSathis are non-clinical companions. They report directly to the on-duty hospital nurse sister, ensuring emergency buzzers are pressed immediately if IV lines finish, oxygen drops, or discomfort arises.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-indigo-800 font-semibold mt-2.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              24/7 dedicated hospital emergency helpdesk
            </div>
          </div>
        </div>

      </div>

      {/* Comparison table */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
        <div className="p-5 bg-stone-900 text-white flex items-center justify-between">
          <span className="font-bold text-sm tracking-wide">
            CareSathi vs Traditional Hospital Ayah / Ward Boy Agencies
          </span>
          <span className="text-xs text-stone-400">Indian Hospital Context</span>
        </div>

        <div className="divide-y divide-stone-100 text-xs text-stone-700">
          <div className="grid grid-cols-3 p-4 font-semibold text-stone-900 bg-stone-50">
            <span>Feature</span>
            <span>CareSathi Platform</span>
            <span>Traditional Local Agents</span>
          </div>

          <div className="grid grid-cols-3 p-4 items-center">
            <span className="font-medium text-stone-900">Booking Model</span>
            <span className="text-emerald-700 font-bold">Instant On-Demand Hourly (2 to 12 hrs)</span>
            <span className="text-stone-500">Lock-in monthly contract required</span>
          </div>

          <div className="grid grid-cols-3 p-4 items-center">
            <span className="font-medium text-stone-900">Security & Arrival</span>
            <span className="text-emerald-700 font-bold">4-Digit Bedside OTP verification</span>
            <span className="text-stone-500">Unverified strangers sent without notice</span>
          </div>

          <div className="grid grid-cols-3 p-4 items-center">
            <span className="font-medium text-stone-900">Pricing Transparency</span>
            <span className="text-emerald-700 font-bold">Fixed ₹120 - ₹180/hr, zero commission</span>
            <span className="text-stone-500">Heavy commissions, cash advance demands</span>
          </div>

          <div className="grid grid-cols-3 p-4 items-center">
            <span className="font-medium text-stone-900">Real-Time Activity Log</span>
            <span className="text-emerald-700 font-bold">Live mobile updates (feeding, water, nurse alerts)</span>
            <span className="text-stone-500">No updates unless you visit hospital</span>
          </div>
        </div>
      </div>

    </div>
  );
};
