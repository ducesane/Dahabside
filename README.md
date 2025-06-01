 # ✈️ Dahabside – Flight Booking Web App

**Dahabside** is a modern web-based flight booking platform built with **React.js**. It allows users to search flights between Somali cities, view flight details, and complete bookings with a seamless payment experience.

🌐 Live Demo: [dahabside.vercel.app](https://dahabside.vercel.app)

## 🚀 Features

- 🔍 **Search Flights:** Quickly search flights by selecting departure and destination cities.
  - [Example Search Result](https://dahabside.vercel.app/searchresults?from=Mogadishu&to=Garowe)

- 📄 **Flight Information Page:** View details for a selected flight including airline, price, and availability.
  - [Example Booking Page](https://dahabside.vercel.app/booking?flight=890ac637-3692-42d7-b8b7-b0ad6ceb26c8&day=Monday&date=2025-06-01)

- 💳 **Payment and Booking Confirmation:** Securely complete the booking and see a payment summary.
  - [Example Payment Page](https://dahabside.vercel.app/payment?flight=890ac637-3692-42d7-b8b7-b0ad6ceb26c8&day=Monday&date=2025-06-01)

- 📱 **Responsive Design:** Fully mobile-friendly and optimized for all devices.
- 🧾 **Admin & Booking Management**  

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Deployment:** Vercel
- **Backend:** Supabase (for authentication & database)

## 📦 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ducesane/Dahabside.git
   cd Dahabside
2. Install dependencies:

   npm install
  # or
  yarn install
3. Start the development server
      npm run dev
    # or
    yarn dev
4. Open http://localhost:3000 to view in your browser.

Environment Variables
To connect to Supabase and any payment system, create a .env.local file and add:
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key



