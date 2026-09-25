import React, { useState } from 'react';
import { PatientBookingRequest, FamilyWatchMember } from '../types';
import { X, Users, Share2, Copy, Check, Heart, ShieldCheck, MapPin, Plus, Sparkles, MessageCircle } from 'lucide-react';

interface FamilyWatchModalProps {
  request: PatientBookingRequest;
  onClose: () => void;
  onAddMember: (member: FamilyWatchMember) => void;
}

export const FamilyWatchModal: React.FC<FamilyWatchModalProps> = ({
  request,
  onClose,
  onAddMember,
}) => {
  const [copied, setCopied] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRelation, setNewMemberRelation] = useState('Daughter');
  const [newMemberCity, setNewMemberCity] = useState('Bengaluru');

  const shareableUrl = `${typeof window !== 'undefined' ? window.location.origin : 'https://caresathi.app'}?watch=${request.id}`;

  const defaultMembers: FamilyWatchMember[] = request.familyWatchMembers && request.familyWatchMembers.length > 0 
    ? request.familyWatchMembers 
    : [
        {
          id: 'mem-1',
          name: request.requesterName,
          relation: `${request.requesterRelation} (Primary Booker)`,
          city: request.hospitalCity,
          joinedAt: 'Active now',
        },
        {
          id: 'mem-2',
          name: 'Priya Verma (Daughter)',
          relation: 'Daughter (NRI)',
          city: 'California, USA',
          joinedAt: 'Watching live',
        }
      ];

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(shareableUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `🏥 CareSathi Live Watch for ${request.patientName}\n` +
      `Hospital: ${request.hospitalName} (${request.wardRoomBed})\n` +
      `Attendant: ${request.matchedCaregiver?.name || 'Verified Sathi'}\n` +
      `Status: Bedside duty active. Track real-time water, meal & nurse logs here:\n${shareableUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleAddMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;

    const newMember: FamilyWatchMember = {
      id: `mem-${Date.now()}`,
      name: newMemberName.trim(),
      relation: newMemberRelation,
      city: newMemberCity.trim() || 'India',
      joinedAt: 'Just joined',
    };

    onAddMember(newMember);
    setNewMemberName('');
    setShowAddForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 dark:border-stone-800 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-900 to-emerald-950 text-white p-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-teal-200">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] tracking-widest uppercase font-bold text-teal-300 block">
                FAMILY WATCH GROUP
              </span>
              <h3 className="font-bold text-lg text-white">
                Live Bedside Watch for {request.patientName}
              </h3>
              <span className="text-xs text-teal-200">
                {request.hospitalName} · {request.wardRoomBed}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* Explanatory Banner */}
          <div className="p-3.5 bg-teal-50 dark:bg-teal-950/40 rounded-2xl border border-teal-200 dark:border-teal-800/60 text-xs text-teal-900 dark:text-teal-200 flex items-start gap-2.5">
            <Heart className="w-4 h-4 text-teal-700 dark:text-teal-400 shrink-0 mt-0.5" />
            <span>
              Siblings, children living outstation, or family members abroad can follow the bedside log, meal updates, and nurse calls in real time without repeatedly calling the hospital.
            </span>
          </div>

          {/* Shareable Link Box */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
              Unique Shareable Watch Link
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareableUrl}
                className="flex-1 px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs font-mono text-stone-700 dark:text-stone-300 select-all"
              />
              <button
                onClick={handleCopyLink}
                className="px-3 py-2 bg-stone-900 dark:bg-stone-800 hover:bg-stone-800 dark:hover:bg-stone-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <button
              onClick={handleShareWhatsApp}
              className="w-full mt-2 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Watch Link on WhatsApp Group</span>
            </button>
          </div>

          {/* Connected Family Members List */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                Connected Family Members ({defaultMembers.length})
              </span>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="text-xs text-teal-700 dark:text-teal-400 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Family Relative</span>
              </button>
            </div>

            <div className="space-y-2">
              {defaultMembers.map((member) => (
                <div
                  key={member.id}
                  className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200 dark:border-stone-700 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-200 font-bold flex items-center justify-center text-xs">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <span className="font-bold text-stone-900 dark:text-white block">
                        {member.name}
                      </span>
                      <span className="text-stone-500 dark:text-stone-400 text-[11px]">
                        {member.relation} · {member.city}
                      </span>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    {member.joinedAt}
                  </span>
                </div>
              ))}
            </div>

            {/* Add member form */}
            {showAddForm && (
              <form onSubmit={handleAddMemberSubmit} className="mt-3 p-3.5 bg-stone-100 dark:bg-stone-800 rounded-xl space-y-2.5">
                <span className="text-xs font-bold text-stone-800 dark:text-stone-200 block">
                  Add Family Member to Live Watch
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Relative Name"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    className="px-2.5 py-1.5 bg-white dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-lg text-xs"
                  />
                  <input
                    type="text"
                    required
                    placeholder="City / Country (e.g. Mumbai)"
                    value={newMemberCity}
                    onChange={(e) => setNewMemberCity(e.target.value)}
                    className="px-2.5 py-1.5 bg-white dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-lg text-xs"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={newMemberRelation}
                    onChange={(e) => setNewMemberRelation(e.target.value)}
                    className="px-2 py-1.5 bg-white dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-lg text-xs flex-1"
                  >
                    <option value="Son">Son</option>
                    <option value="Daughter">Daughter</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Brother / Sister">Brother / Sister</option>
                    <option value="Grandchild">Grandchild</option>
                    <option value="Close Relative">Close Relative</option>
                  </select>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-teal-800 hover:bg-teal-900 text-white rounded-lg text-xs font-semibold"
                  >
                    Connect
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="pt-2 text-center">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-xl text-xs font-semibold cursor-pointer"
            >
              Done
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
