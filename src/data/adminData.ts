export const adminStats = [
  {
    title: "Total CO₂ Saved",
    value: "1,84,320",
    unit: "kg",
    change: "+14.2%",
    gradient: "from-blue-500 via-blue-600 to-cyan-600",
    icon: "leaf",
  },
  {
    title: "Total Users",
    value: "94,218",
    unit: "users",
    change: "+8.7%",
    gradient: "from-emerald-500 via-green-600 to-teal-600",
    icon: "users",
  },
  {
    title: "Total Trips",
    value: "3,47,560",
    unit: "trips",
    change: "+11.3%",
    gradient: "from-orange-400 via-orange-500 to-amber-500",
    icon: "train",
  },
  {
    title: "Rewards Redeemed",
    value: "12,840",
    unit: "redeemed",
    change: "+19.5%",
    gradient: "from-purple-500 via-purple-600 to-pink-600",
    icon: "gift",
  },
];

export const adminTrips = [
  { id: 1, user: "Arjun Sharma", avatar: "AS", date: "19 Feb 2025", from: "MG Road", to: "Indiranagar", distance: "4.2 km", co2: "0.84 kg", points: 12, status: "Approved", ticket: true },
  { id: 2, user: "Priya Nair", avatar: "PN", date: "19 Feb 2025", from: "Majestic", to: "Yeshwanthpur", distance: "6.8 km", co2: "1.36 kg", points: 18, status: "Pending", ticket: true },
  { id: 3, user: "Rahul Verma", avatar: "RV", date: "18 Feb 2025", from: "Jayanagar", to: "Whitefield", distance: "14.5 km", co2: "2.90 kg", points: 35, status: "Approved", ticket: false },
  { id: 4, user: "Sneha Reddy", avatar: "SR", date: "18 Feb 2025", from: "Banashankari", to: "Rajajinagar", distance: "9.3 km", co2: "1.86 kg", points: 22, status: "Pending", ticket: true },
  { id: 5, user: "Kiran Kumar", avatar: "KK", date: "17 Feb 2025", from: "Electronic City", to: "MG Road", distance: "18.2 km", co2: "3.64 kg", points: 48, status: "Rejected", ticket: true },
  { id: 6, user: "Divya Menon", avatar: "DM", date: "17 Feb 2025", from: "Silk Board", to: "Baiyappanahalli", distance: "11.4 km", co2: "2.28 kg", points: 29, status: "Approved", ticket: false },
  { id: 7, user: "Amit Patel", avatar: "AP", date: "16 Feb 2025", from: "KR Puram", to: "Banaswadi", distance: "5.7 km", co2: "1.14 kg", points: 15, status: "Pending", ticket: true },
];

export const adminRewards = [
  { id: 1, title: "Free Coffee", desc: "Valid at partner cafés across Bangalore", points: 20, emoji: "☕", color: "from-amber-400 to-orange-500", redeemed: 3420, active: true },
  { id: 2, title: "Shopping Voucher", desc: "₹100 off at select partner stores", points: 50, emoji: "🛍️", color: "from-purple-400 to-pink-500", redeemed: 1820, active: true },
  { id: 3, title: "Movie Ticket", desc: "One free ticket at PVR or INOX", points: 75, emoji: "🎬", color: "from-blue-400 to-indigo-600", redeemed: 940, active: true },
  { id: 4, title: "Metro Day Pass", desc: "Unlimited rides for one day", points: 100, emoji: "🚇", color: "from-green-400 to-emerald-600", redeemed: 680, active: false },
  { id: 5, title: "Plant a Tree", desc: "We plant a tree in your name", points: 150, emoji: "🌳", color: "from-teal-400 to-green-600", redeemed: 412, active: true },
  { id: 6, title: "Eco Water Bottle", desc: "Branded stainless steel bottle", points: 200, emoji: "♻️", color: "from-cyan-400 to-teal-600", redeemed: 188, active: false },
];

export const userGrowthData = [28, 35, 42, 38, 55, 68, 72, 65, 80, 88, 94, 102, 98, 112, 125, 118, 134, 142, 138, 156, 162, 170, 165, 178, 185, 192, 188, 200];
export const tripsPerDay    = [420, 580, 490, 670, 720, 810, 760, 840, 790, 920, 880, 950, 910, 1020, 980, 1050, 1010, 1100, 1080, 1150, 1120, 1200, 1180, 1240, 1210, 1280, 1260, 1320];
export const co2Trend       = [12, 18, 14, 22, 28, 32, 30, 36, 34, 42, 40, 46, 44, 52, 50, 58, 55, 62, 60, 68, 65, 72, 70, 76, 74, 80, 78, 84];
export const rewardsUsage   = [8, 12, 10, 16, 20, 24, 22, 26, 24, 30, 28, 32, 30, 36, 34, 38, 36, 40, 38, 42, 40, 44, 42, 46, 44, 48, 46, 50];

export const notifications = [
  { id: 1, type: "trip", msg: "Priya Nair submitted a new trip for verification", time: "2 min ago", read: false },
  { id: 2, type: "reward", msg: "Free Coffee reward stock running low (< 50 left)", time: "15 min ago", read: false },
  { id: 3, type: "user", msg: "New user milestone: 94,000 registered commuters!", time: "1h ago", read: false },
  { id: 4, type: "alert", msg: "Blue Line delay reported — 320 commuters affected", time: "2h ago", read: true },
  { id: 5, type: "system", msg: "Daily CO₂ report generated and ready for download", time: "3h ago", read: true },
];
