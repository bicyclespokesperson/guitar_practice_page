# Guitar Practice Website Design

## Navigation Structure

### Primary Navigation (Top Bar)

1. **Practice** (main page with session tracker)
2. **Fretboard Notes**
3. **Arpeggios**
4. **7th Inversions**
5. **Tanpura**
6. **Solo**
7. **Jazz Standards**
8. **Transcription**

## Page Specifications

### 1. Practice Page (Main)

**Session Checklist:**

- [ ] Fretboard notes
- [ ] Arpeggios
- [ ] 7th chord inversions
- [ ] Tanpura practice
- [ ] Solo over changes
- [ ] Jazz standard
- [ ] Transcription

**Uncheck All** button to reset session

### 2. Fretboard Notes

- Interactive fretboard diagram
- Displays one random note position (red dot)
- **New Note** button

### 3. Arpeggios

- **Generate Random** button
- Displays:
  - Chord type (maj7, m7, dom7, m7b5, dim7)
  - Root note (C through B)
  - Position (6th string root, 5th string root, 4th string root)

### 4. 7th Inversions

- **Generate Random** button
- Displays:
  - Chord type (maj7, m7, dom7, m7b5, dim7)
  - Root note (C through B)

### 5. Tanpura

- **Generate Random** button
- Displays:
  - Key (C through B)
  - Scale/Mode (Major, Dorian, Mixolydian, Minor, etc.)

### 6. Solo

- **Generate Random** button
- Displays a progression as text, e.g.:
  - "ii-V-I in Bb"
  - "Blues in F"
  - "Rhythm changes in C"

### 7. Jazz Standards

- **Generate Random** button
- Displays:
  - Song title (from list: Autumn Leaves, All The Things You Are, Blue Bossa, Summertime, Fly Me To The Moon)
  - Key

### 8. Transcription

- Simple reminder text: "Work on current transcription"
- No functionality needed

## Technical Implementation

### Tech Stack

- **Frontend:** Vanilla HTML/CSS/JavaScript (no build step required)
- **Deployment:** GitHub Pages (static site, single repository)
- **Storage:** localStorage for checkbox persistence
- **Structure:** Single `index.html` with JavaScript-based routing
- **No backend required** - all logic runs client-side

### Visual Design

#### Color Scheme

- **Primary:** Deep purple (#6B46C1) for headers and active tabs
- **Accent:** Bright coral (#FF6B6B) for buttons and interactive elements
- **Background:** Off-white (#FAFAF9) to reduce eye strain
- **Text:** Charcoal (#2D3748) for excellent readability
- **Success:** Mint green (#4ECDC4) for checked items
- **Subtle gradients** on buttons and cards for depth

#### Typography

- **Headers:** Bold sans-serif (Inter or system font)
- **Body:** Clean, readable sans-serif
- **Display text:** Large sizes for generated results (24-32px)

#### Layout & Components

- **Navigation:** Horizontal tab bar that becomes scrollable on mobile
- **Cards:** Soft shadows and rounded corners for content areas
- **Buttons:** Large touch targets (min 48px height) with hover/active states
- **Animations:** Subtle transitions (150-200ms) for all interactions
- **Random results:** Display in a prominent card with fade-in animation

#### Responsive Design

- **Desktop:** Centered 800px max-width container, spacious padding
- **Tablet:** Full width with 24px margins
- **Phone:**
  - Full width with 16px margins
  - Tabs scroll horizontally with active tab auto-centered
  - Buttons stack vertically
  - Font sizes scale appropriately
  - Fretboard diagram scrolls horizontally if needed

### Modern UI Patterns

- **Micro-interactions:** Button press animations, checkbox satisfying check animation
- **Loading states:** Skeleton screens (even though it's instant)
- **Empty states:** Friendly messages before generating random items
- **Progress indication:** Visual progress bar based on checkboxes
- **Dark mode:** CSS custom properties for easy theme switching (future feature)

### GitHub Pages Deployment

```
/guitar-practice
  ├── index.html
  ├── style.css
  ├── script.js
  ├── package.json (for npm scripts only)
  └── README.md
```

- Deploy from main branch root
- Custom domain optional (CNAME file)
- No build process - push and deploy instantly
- **npm script for deployment:** `"deploy": "git push origin main"`
- Or use **deploy.sh** script for one-command deployment:
  ```bash
  #!/usr/bin/env bash
  git add .
  git commit -m "Update practice site"
  git push origin main
  ```

## Development Priority

1. **Phase 1:**
   - Core functionality with polished UI
   - Dark mode toggle (CSS custom properties, localStorage preference)
   - All random generators working
   - Mobile-responsive design
2. **Future:** Practice statistics, custom exercise lists, practice timers
