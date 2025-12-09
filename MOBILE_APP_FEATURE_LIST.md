# 📱 RIDE JOBURG MOBILE APP - COMPLETE FEATURE LIST
## Final Beta Stage - December 2025

---

## OVERVIEW

The Ride Joburg Mobile App is a React Native application (iOS & Android) that provides athletes with a comprehensive race-day and year-round experience. Built with Expo and TypeScript, the app integrates directly with the Faces Group backend and real-time timing systems.

| Metric | Value |
|--------|-------|
| **Platform** | React Native + Expo |
| **Language** | TypeScript |
| **State Management** | Redux |
| **Total Screens** | 18 Dashboard + 4 Auth |
| **Services** | 7 Core Services |
| **API Integration** | 28+ Backend Endpoints |
| **Status** | Final Beta Testing |

---

## 🔐 AUTHENTICATION FEATURES

### Sign In / Sign Up Flow
- ✅ **ID Number / Passport Authentication** - Salesforce lookup
- ✅ **Password-based Login** - Secure bcrypt hashing
- ✅ **Password Set for New Users** - First-time setup
- ✅ **Forgot Password** - 6-digit email code (15-minute expiry)
- ✅ **Registration** - New user creation with Salesforce sync
- ✅ **Session Persistence** - AsyncStorage token management

### Screens:
- `LoginScreen.tsx`
- `RegisterScreen.tsx`
- `WelcomeScreen.tsx`
- Auth flow screens (3 total)

---

## 📊 DASHBOARD FEATURES

### 1. Dashboard Home (`DashboardHomeScreen.tsx`)
- ✅ **Welcome Banner** with user name
- ✅ **Quick Stats** (participations, best time, total km)
- ✅ **2025 Entry Status** button with modal
- ✅ **Upcoming Event** card with countdown
- ✅ **Quick Links** to all features
- ✅ **Recent Activity** summary

### 2. Profile Management (`ProfileScreen.tsx`)
- ✅ **View Profile** - Full user information display
- ✅ **Edit Mode** - All fields editable (name, email, phone, etc.)
- ✅ **Save/Cancel** - Sync to Salesforce via API
- ✅ **Data Priority** - Shows monolith data if user edited, else Salesforce
- ✅ **Profile Photo** placeholder
- ✅ **GPS Tracking Button** - Navigate to live tracking

### 3. My Results (`MyResultsScreen.tsx`)
- ✅ **Historical Results** - All past Ride Joburg events
- ✅ **Finish Time** display (HH:MM:SS format)
- ✅ **Position** - Overall, gender, category
- ✅ **Event Details** - Distance, date, location
- ✅ **Filtering** by year/distance
- ✅ **Empty State** for new participants

### 4. My Events (`MyEventsScreen.tsx`)
- ✅ **Registered Events** - Upcoming participations
- ✅ **Past Events** - Historical entries
- ✅ **Event Cards** with key details
- ✅ **Entry Status** (registered, completed, cancelled)
- ✅ **Quick Navigation** to event details

### 5. Entry Status (`ParticipationScreen.tsx`)
- ✅ **2025 Entry Details**
- ✅ **Race Number** display
- ✅ **Batch Assignment** (Batch A, B, C, etc.)
- ✅ **Start Time** with formatted display
- ✅ **Distance** confirmation
- ✅ **Category** (age group)

---

## 📍 LIVE TRACKING FEATURES

### 6. GPS Live Tracking (`LiveTrackingScreen.tsx`)

This is the **flagship feature** for spectators to follow riders in real-time.

#### Core Features:
- ✅ **GPS Location Sharing** - Toggle on/off
- ✅ **Battery-Optimized Tracking** - Adaptive intervals
- ✅ **Real-time Upload** - Location sent to backend every 60s
- ✅ **Spectator Web Viewer Link** - Share with friends/family
- ✅ **Service Status Indicators** (GPS, Audio, Notifications, Screen)

#### iOS-Specific Features (99% Reliability):
- ✅ **Silent Audio Keepalive** - Prevents iOS from suspending app
- ✅ **Screen Awake Mode** - Nuclear option for guaranteed tracking
- ✅ **Periodic Notifications** - 15-minute reminders
- ✅ **Auto-Resume Logic** - Recovers from interruptions

#### Technical Specs:
| Parameter | Value |
|-----------|-------|
| **Default Interval** | 60 seconds |
| **Distance Filter** | 75 meters minimum movement |
| **Battery Drain (4 hours)** | 30-35% |
| **iOS Reliability** | 99% with nuclear mode |
| **Accuracy** | 12-25 meters typical |

#### Adaptive Battery Tiers:
| Battery Level | Interval | Accuracy |
|---------------|----------|----------|
| > 50% | 60 seconds | Balanced |
| 30-50% | 90 seconds | Low |
| 15-30% | 2 minutes | Low |

#### Backend Integration:
```typescript
POST /api/v1/tracking/update
{
  "bib_number": "A123",
  "latitude": -26.2041,
  "longitude": 28.0473,
  "altitude": 1753.5,
  "speed": 8.33,      // m/s
  "heading": 180.0,
  "timestamp": 1705824000000
}
```

---

## 🏆 LEADERBOARDS & RESULTS

### 7. Hall of Fame (`HallOfFameScreen.tsx`)
- ✅ **All-Time Leaderboard** - Most Ride Joburg finishes
- ✅ **Participant Count** per athlete
- ✅ **Event History** list
- ✅ **Badge Levels** (Bronze, Silver, Gold, Platinum)
- ✅ **Ranking Position**

### 8. Historic Results (`HistoricResultsScreen.tsx`)
- ✅ **Browse All Results** - Any year, any distance
- ✅ **Event Selector** dropdown
- ✅ **Distance Filter** (94km, 50km, etc.)
- ✅ **Search by Name** within results
- ✅ **Paginated Results** (performance optimized)
- ✅ **Position Columns** (overall, gender, category)

### 9. Live Standings (`LiveStandingsScreen.tsx`)
- ✅ **Real-Time Race Data** - During event day
- ✅ **Timing Mat Passings** (5K, 10K, 15K, etc.)
- ✅ **Current Leaders** - Top men/women
- ✅ **Auto-Refresh** every 30-60 seconds
- ✅ **UltimateLive Integration**

### 10. Leaderboard (`LeaderboardScreen.tsx`)
- ✅ **Category Leaders** - Top 5 per category
- ✅ **Category Selector** - Browse by age group
- ✅ **Live Positions** during race
- ✅ **Split Times** at timing mats

### 11. Pursuit Index (`PursuitIndexScreen.tsx`)
- ✅ **Performance Ranking** - Pursuit Index score
- ✅ **All-Time Ranking** across all events
- ✅ **Best Time** display
- ✅ **Discipline Filter** (Road Cycling)
- ✅ **Entry Status** indicator for 2025

---

## 🔍 SEARCH & DISCOVERY

### 12. Riders Search (`RidersScreen.tsx`)
- ✅ **Search by Name** - Case-insensitive
- ✅ **Filter by Batch** - Batch A, B, C, etc.
- ✅ **Filter by Category** - Age groups
- ✅ **Filter by Gender** - Men/Women
- ✅ **Combined Filters** - Category + Name, Batch + Name

#### Search Scopes:
- `name` - Search by name only
- `batch_and_name` - Batch + name combination
- `gender_and_name` - Gender + name combination
- `category_and_name` - Category + name combination

### 13. Who's Riding (`WhosRidingScreen.tsx`)
- ✅ **Entry Lookup** - Check if someone is registered
- ✅ **Batch Information** - Start group assignment
- ✅ **Distance Confirmation**
- ✅ **Profile Preview**

---

## 📅 EVENTS & CALENDAR

### 14. Events Calendar (`EventsCalendarScreen.tsx`)
- ✅ **Upcoming Events** - Ride Joburg series
- ✅ **Event Cards** with key information
- ✅ **Date Display** - Formatted dates
- ✅ **Location** - Venue information
- ✅ **Distance Options** available
- ✅ **Registration Status**

---

## ℹ️ INFORMATION & SUPPORT

### 15. About Screen (`AboutScreen.tsx`)
- ✅ **App Information** - Version, credits
- ✅ **Event History** - About Ride Joburg
- ✅ **Terms & Conditions**
- ✅ **Privacy Policy**
- ✅ **App Version**

### 16. Contact Screen (`ContactScreen.tsx`)
- ✅ **Contact Form** - Name, email, message
- ✅ **Email Submission** - Sends to support team
- ✅ **Phone Number** - Direct contact
- ✅ **Validation** - Required field checking
- ✅ **Success Confirmation**

---

## ⚙️ ACCOUNT MANAGEMENT

### 17. Account Home (`AccountHomeScreen.tsx`)
- ✅ **Account Overview**
- ✅ **Settings Navigation**
- ✅ **Logout Button**

### 18. Account Settings (`AccountScreen.tsx`)
- ✅ **Notification Preferences**
- ✅ **Privacy Settings**
- ✅ **Account Actions**

---

## 🔧 CORE SERVICES

### 1. Location Tracking Service (`locationTracking.ts`)
```typescript
class LocationTrackingService {
  // 60-second GPS intervals
  // Adaptive battery management
  // Offline queue with retry
  // Status reporting
}
```

### 2. Audio Keepalive Service (`audioKeepAlive.ts`)
```typescript
// Silent audio loop for iOS background
// Keeps app alive in "Audio" mode
// Same trick as Strava, MapMyRun
```

### 3. Screen Keepalive Service (`screenKeepAlive.ts`)
```typescript
// Prevents screen auto-lock
// "Nuclear mode" for 99% reliability
// Brightness reduction to 20%
```

### 4. Notification Keepalive Service (`notificationKeepAlive.ts`)
```typescript
// Silent notifications every 15 minutes
// Prevents iOS suspension
// Shows "Still Tracking" status
```

### 5. API Service (`api.ts`)
```typescript
// Axios-based HTTP client
// Base URL configuration
// Auth token handling
// Error handling
```

---

## 📊 BACKEND API ENDPOINTS USED

### Authentication
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/auth/salesforce-lookup` | POST | Check user in Salesforce |
| `/api/v1/auth/password-signin` | POST | Login with password |
| `/api/v1/auth/register-with-password` | POST | Create new account |
| `/api/v1/auth/forgot-password` | POST | Send reset code |
| `/api/v1/auth/verify-reset-code` | POST | Verify 6-digit code |
| `/api/v1/auth/reset-password` | POST | Set new password |

### Profile
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/customer/profile` | GET | Full profile with participations |
| `/api/v1/customer/profile/basic` | GET | Basic profile info |
| `/api/v1/customer/profile` | PUT | Update profile |

### Tracking
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/tracking/update` | POST | Send GPS location |
| `/api/v1/tracking/all_active_riders` | GET | Get all GPS markers |

### Results & Leaderboards
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/events/hall-of-fame` | GET | All-time leaderboard |
| `/api/v1/historic-results` | GET | Race results by event |
| `/rj-live-2025/live_data` | GET | Real-time race standings |
| `/rj-live-2025/categories` | GET | Race categories |
| `/rj-live-2025/category_leaders` | GET | Category top 5 |

### Riders
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/riders/search` | GET | Search participants |
| `/api/v1/riders/batches` | GET | Available batches |
| `/api/v1/riders/categories` | GET | Age categories |
| `/api/v1/riders/genders` | GET | Gender breakdown |

---

## 🎨 UI/UX FEATURES

### Design System
- ✅ **Ride Joburg Branding** - Yellow/Black theme
- ✅ **Consistent Typography** - Inter font family
- ✅ **Icon Library** - Lucide React Native
- ✅ **Responsive Layouts** - Adapts to screen size
- ✅ **Loading States** - Skeleton screens
- ✅ **Error States** - User-friendly messages
- ✅ **Empty States** - Helpful prompts

### Navigation
- ✅ **Drawer Navigation** - Side menu
- ✅ **Tab Navigation** - Bottom tabs
- ✅ **Stack Navigation** - Screen flow
- ✅ **Deep Linking** - URL handling

---

## 📱 DEPLOYMENT STATUS

| Platform | Status | Next Step |
|----------|--------|-----------|
| **iOS (Expo Go)** | ✅ Testing | App Store submission |
| **Android (Expo Go)** | ✅ Testing | Play Store submission |
| **Web Preview** | ✅ Available | Reference only |

### Build Commands
```bash
# Development
cd /Users/jpvanzyl/Workspaces/Faces/RJHB-mobile-app
npm start

# iOS Build
eas build --platform ios

# Android Build
eas build --platform android
```

---

## 🔮 FUTURE FEATURES (Roadmap)

### Phase 2:
- [ ] **Offline Mode** - Cache data for race day
- [ ] **Push Notifications** - Event reminders
- [ ] **Photo Gallery** - Race photos by bib
- [ ] **Social Sharing** - Share results
- [ ] **Training Log** - Activity tracking

### Phase 3:
- [ ] **Face Recognition** - Auto photo tagging
- [ ] **Split Predictions** - Estimated finish time
- [ ] **Route Navigation** - Turn-by-turn
- [ ] **Heart Rate Integration** - Health kit sync

---

*IP Ownership: Faces Group*  
*Last Updated: December 2025*

