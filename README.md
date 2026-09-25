# CareSathi (केयर साथी) 🏥🤝
### On-Demand Hospital Bedside Patient Attendant & Companion Platform

[![Vercel Ready](https://img.shields.io/badge/Vercel-Deploy%20Ready-black?style=flat&logo=vercel)](https://vercel.com/)
[![React 19](https://img.shields.io/badge/React-19.0-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0+-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)

---

## 📌 Problem & Vision

In Indian hospitals, admitted patients often require non-stop bedside assistance—for feeding, hydration, washroom mobility, and coordination with nurses. However, working family members often cannot be physically present 24/7 due to urgent office commitments, travel, or childcare.

**CareSathi** solves this with an **Ola/Uber style on-demand model**:
* Families raise an hourly bedside assistance request from their phone.
* Nearest verified CareSathi attendant accepts the request and proceeds to the hospital room.
* A **4-digit Bedside Start OTP** handshake ensures duty time only begins when the attendant physically stands beside the patient's bed.
* Shift billing is hourly (**₹100 – ₹180/hr**), avoiding expensive long-term agency lock-ins or broker commissions.

---

## ✨ Key Features

### 1. 🔐 Protected Auth Gating & Zero-Cost Local Database
* **Guest Mode**: Unauthenticated visitors can view the modern landing page, feature highlights, and hospital safety protocols.
* **Smart Auth Gate**: Access to "Book for Patient" and "Attendant Mode" is protected by an interactive authentication system.
* **Local Database**: Persistent client-side session management (`localStorage`) with support for new registrations, phone/SMS verification, and instant 1-tap demo testing profiles (**Vikram Verma** for family, **Rameshwar Yadav** for attendants).

### 2. 🌙 Scheduled Night Vigil (*Raat Ki Chowki*)
* **12-Hour Overnight Shift (8:00 PM – 8:00 AM)**: Flat rate ₹1,800 pricing selectable directly in the booking form.
* **Mandatory 90-Minute Awake Checks**: Attendants tap verified vigilance checkpoints (IV drip status, water sips, posture repositioning, Sister vitals rounds) to reassure families throughout the night.
* **Family Status Ping**: Family members can ping the attendant's console if they wake up during the night.

### 3. 👥 Multi-Family Live Watch Link
* **Remote Family Stream**: Children living in other cities or overseas (NRI relatives) can monitor bedside care in real time.
* **Shareable Secret Link**: One-tap copyable URL (`?watch=CS-REQ-...`) and WhatsApp broadcast template.
* **Collaborative Family Roster**: Displays connected family members watching from different locations.

### 4. 🏅 Sathi Skill Badges & Specialized Matching
* **Clinical & Companion Badges**:
  * `Night Vigil Specialist`
  * `Post-Op Mobility`
  * `Dementia & Elder Companion`
  * `GDA Clinical Assistant`
  * `Hindi & Regional Fluent`
  * `IV & Vitals Vigilance`
* **Intelligent Radar Dispatch**: Prioritizes attendants holding the exact badge required for the patient's medical condition with a **100% Badge Match** badge.

### 5. 🚨 Floating SOS Emergency System
* **Instant Distress Broadcast**: Red beacon trigger in the active duty screen automatically notifies the attendant and logs a high-priority alert.
* **24/7 Hospital Directory**: Instant click-to-dial links for Ward Nursing Station, Casualty & Code Blue Desk, Duty RMO, Security, and National Ambulance (108 / 112).

### 6. 🌓 Modern & Minimal UI with Dark Theme
* Built according to clean medical design principles with stone neutrals, deep teal accents, and warm amber highlights.
* One-click dark mode toggle with system preference auto-detection.

---

## 🚀 Deploying to Vercel

CareSathi is pre-configured for seamless zero-configuration deployment to [Vercel](https://vercel.com).

### Option A: Deploy via Vercel Git Integration (Recommended)
1. Push this repository to **GitHub**, **GitLab**, or **Bitbucket**.
2. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..." → "Project"**.
3. Select this repository.
4. Vercel will automatically detect **Vite**:
   * **Framework Preset**: `Vite`
   * **Build Command**: `npm run build`
   * **Output Directory**: `dist`
5. Click **"Deploy"**. Your application will be live in seconds with global edge CDN caching and automatic SSL.

### Option B: Deploy via Vercel CLI
If you have the Vercel CLI installed:
```bash
# 1. Login to your Vercel account
npx vercel login

# 2. Deploy preview build
npx vercel

# 3. Deploy to production
npx vercel --prod
```

### Vercel Configuration File (`vercel.json`)
The included `vercel.json` ensures that Single Page Application (SPA) routes and query parameters (such as `?watch=...`) resolve correctly to `/index.html`:
```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "cleanUrls": true,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 💻 Local Development Setup

### Prerequisites
* **Node.js** (v18.0.0 or higher recommended)
* **npm** or **bun** / **yarn**

### Quick Start
```bash
# 1. Clone the repository
git clone <repository-url>
cd caresathi

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts
| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the Vite development server on port 3000 |
| `npm run build` | Compiles the TypeScript codebase and outputs production assets to `dist/` |
| `npm run lint` | Runs `tsc --noEmit` to validate all TypeScript types and exports |
| `npm run preview` | Previews the compiled production build locally |

---

## 🏗️ Architecture & Project Structure

```
├── /index.html                         # Entry HTML with meta & typography
├── /package.json                       # Dependencies & build scripts
├── /tsconfig.json                      # Strict TypeScript compiler options
├── /vite.config.ts                     # Vite + Tailwind CSS plugins
├── /vercel.json                        # Vercel deployment & SPA rewrite routing
├── /src
│   ├── main.tsx                        # Application mount point
│   ├── App.tsx                         # State orchestration & auth router
│   ├── types.ts                        # TypeScript interfaces (Caregiver, Booking, Badges, etc.)
│   ├── index.css                       # Tailwind CSS rules & font setups
│   ├── data
│   │   ├── localAuth.ts                # Client-side persistent localStorage DB
│   │   └── mockData.ts                 # Verified Indian hospitals & initial CareSathis
│   └── components
│       ├── Navbar.tsx                  # Responsive header with dark mode & auth buttons
│       ├── HomePage.tsx                # Minimal hero graphic, key features & CTA
│       ├── AuthModal.tsx               # OTP / Demo login & user registration modal
│       ├── HospitalPassModal.tsx       # Hospital entry badge generator
│       ├── DutyCompletionModal.tsx     # Transparent hourly bill receipt & rating modal
│       ├── SafetyTrustSection.tsx      # Aadhaar & police verification explanation
│       ├── FamilyWatchModal.tsx        # Multi-family live watch link console
│       ├── FamilyPortal
│       │   ├── BookingForm.tsx         # Hospital/ward selector, night vigil & skill picker
│       │   ├── MatchingRadar.tsx       # Radar search & specialist badge sorting
│       │   └── ActiveDutyView.tsx      # Real-time bedside timer, care logs & SOS trigger
│       └── CaregiverPortal
│           ├── PartnerDashboard.tsx    # Driver console, OTP verification & awake logger
│           └── RegistrationModal.tsx   # Attendant onboarding & badge declaration
```

---

## 🏥 Partner Hospitals Represented

CareSathi is designed around the workflows of premier Indian healthcare centers:
* **AIIMS New Delhi** (Ansari Nagar)
* **Max Super Speciality Hospital** (Saket & Patparganj)
* **Fortis Memorial Research Institute** (Gurugram)
* **Apollo Hospitals** (Greams Road, Chennai)
* **Lilavati Hospital & Research Centre** (Bandra West, Mumbai)
* **Manipal Hospital** (Old Airport Road, Bengaluru)
* **Sir Ganga Ram Hospital** (Rajinder Nagar, New Delhi)
* **KGMU** (Chowk, Lucknow)

---

## 📄 License
CareSathi is open-source software licensed under the [Apache-2.0 License](LICENSE).
