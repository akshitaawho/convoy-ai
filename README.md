# Convoy

> Travel together.

Convoy is a smart route planning and convoy management application built with **Next.js**, **TypeScript**, **React Leaflet**, and **OpenStreetMap** services. The goal is to help users create efficient routes, manage multiple stops, and eventually generate intelligent convoy routes based on user preferences and nearby points of interest.

---

## Features Implemented

### Interactive Map
- OpenStreetMap integration using React Leaflet
- Click anywhere on the map to add stops
- Dynamic map centering and zooming
- Marker popups displaying stop information

### Search & Location Services
- Location search using Nominatim
- Autocomplete search suggestions
- Reverse geocoding for converting coordinates into place names
- Selecting a suggestion automatically adds it as a route stop

### Route Planning
- Multi-stop route creation
- Route generation using routing APIs
- Route visualization on the map
- Route statistics:
  - Distance
  - Estimated travel time
  - Number of stops
  - Route status

### Route Management
- Add stops through:
  - Map clicks
  - Search suggestions
- Undo last stop
- Clear route
- Route summary dashboard

### Responsive UI
- Mobile-friendly layout
- Modern card-based interface
- Clean route summary section
- Styled search experience

---

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- React Leaflet

### Mapping & Geolocation
- OpenStreetMap
- Nominatim Geocoding API
- OpenRouteService / Routing APIs

---

## Project Structure

```bash
frontend/
│
├── app/
│   ├── api/
│   │   ├── route/
│   │   ├── reverse-geocode/
│   │   └── suggestions/
│   │
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── src/
│   ├── components/
│   │   ├── Map.tsx
│   │   ├── MapWrapper.tsx
│   │   ├── SearchBar.tsx
│   │   ├── RouteInfo.tsx
│   │   └── ControlButtons.tsx
│   │
│   └── types.ts
│
└── package.json
```

---

## Current Workflow

1. Search for a location
2. Select a suggestion or click directly on the map
3. Add multiple route stops
4. Generate a route
5. View:
   - Route path
   - Distance
   - Duration
   - Stops
6. Modify route using:
   - Undo Last Stop
   - Clear Route

---

## Upcoming Features

### Location-Aware Search
- Detect user location on app launch
- Rank search results based on proximity
- Improve local search relevance

### Smart Convoy Generation
Instead of manually adding every stop, users will be able to:

- Select start location
- Select destination
- Choose preferences

Example:

```text
☑ Petrol Pumps
☑ Food Stops
☑ Rest Areas
☑ Scenic Route
☑ Fastest Route
☑ Avoid Tolls
```

Convoy will automatically generate optimized routes based on those preferences.

---

### Nearby POI Discovery

Automatic identification of:

- Fuel stations
- Restaurants
- Hotels
- Rest stops
- Emergency facilities

along or near the generated route.

---

### Convoy Intelligence Layer

Planned intelligent route optimization using:

- User preferences
- Nearby amenities
- Route constraints
- Multi-stop optimization

---

### Real-Time Navigation

Future roadmap:

- Turn-by-turn navigation
- Route instructions
- Dynamic route updates
- Enhanced navigation experience

---

## Future Vision

Convoy aims to become more than a route planner.

The long-term goal is to build a system that can:

- Understand travel preferences
- Automatically design efficient convoy routes
- Recommend meaningful stops
- Optimize journeys for groups traveling together

---

## Status

🚧 Actively Under Development

Current focus:
- User location awareness
- Search ranking improvements
- Preference-based convoy generation

---

## Author

**Akshitaa Sahoo**
