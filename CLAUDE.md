# Guitar Practice Website - Claude Instructions

## Project Overview

This is a guitar practice tracking website built with vanilla HTML, CSS, and JavaScript. It provides interactive tools for various guitar practice exercises and maintains session progress.

## Architecture

### Tech Stack
- **Frontend**: Vanilla HTML/CSS/JavaScript (no build process)
- **Storage**: localStorage for persistence
- **Deployment**: GitHub Pages ready
- **Styling**: CSS custom properties with light/dark theme support

### File Structure
```
/
├── index.html          # Main HTML with all page sections
├── style.css           # Complete styling with theme support
├── script.js           # All JavaScript functionality
├── package.json        # NPM scripts for deployment
├── README.md           # User documentation
└── CLAUDE.md          # This file
```

## Key Features

### 1. Practice Session Tracker
- Interactive checklist with 7 practice areas
- Visual progress bar that updates in real-time
- localStorage persistence for session state
- "Uncheck All" reset functionality

### 2. Interactive Fretboard
- Visual guitar fretboard (12 frets, 6 strings)
- Proper string labeling (EADGBe from bottom to top)
- Random note position generator with animated dot
- Fret numbers positioned between fret lines
- Responsive scrolling on mobile

### 3. Random Generators
- **Arpeggios**: Chord type + root + position
- **7th Inversions**: Chord type + root
- **Tanpura**: Key + scale/mode (including pentatonics)
- **Solo**: Various progressions (ii-V-I, blues, etc.)
- **Jazz Standards**: Song + key from curated list

### 4. Theme System
- Light/dark mode toggle with OS preference detection
- CSS custom properties for consistent theming
- localStorage persistence for manual theme choice
- Automatic OS theme change detection

## Code Organization

### CSS Variables (style.css)
```css
:root {
    --primary: #6B46C1;      /* Purple for headers/active states */
    --accent: #FF6B6B;       /* Coral for buttons */
    --background: #FAFAF9;   /* Off-white background */
    --text: #2D3748;         /* Charcoal text */
    --success: #4ECDC4;      /* Mint for completed items */
    --card-bg: white;        /* Card backgrounds */
    /* ... */
}
```

### JavaScript Classes (script.js)
- `GuitarPracticeApp`: Main application class
- Key methods:
  - `setupTheme()`: Theme toggle functionality
  - `setupNavigation()`: SPA routing
  - `setupPracticeChecklist()`: Progress tracking
  - `createFretboardDiagram()`: Fretboard rendering
  - `generate*()` methods: Random content generators

## Development Notes

### Fretboard Implementation
- Strings are positioned with 25px spacing
- Frets use 45px spacing for realistic proportions
- Note dots positioned between fret lines (not on them)
- String width: 540px (connects to 12th fret exactly)
- Fret height: 125px (spans all strings cleanly)

### Theme Toggle Logic
- Always sets `data-theme` attribute on load
- Detects OS preference via `prefers-color-scheme`
- Manual override saves to localStorage
- Icons: 🌙 (light mode) ↔ ☀️ (dark mode)

### Random Generators
All use `randomChoice()` helper method for array selection:
```javascript
randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}
```

## Testing Commands

Since this is a static site with no build process:
- **Local development**: Open `index.html` in browser
- **Deploy**: `npm run deploy` (pushes to GitHub Pages)

## Responsive Design

### Breakpoints
- **Desktop**: 800px max-width container
- **Tablet**: `@media (max-width: 768px)`
- **Mobile**: `@media (max-width: 480px)`

### Mobile Adaptations
- Navigation tabs scroll horizontally
- Header stacks vertically (title above theme toggle)
- Buttons become full-width
- Fretboard scrolls horizontally if needed
- Touch-friendly 48px minimum button heights

## Accessibility Features

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- High contrast ratios in both themes
- Touch-friendly sizing (48px+ buttons)

## Future Enhancement Ideas

- Practice timers and session analytics
- Custom exercise lists and preferences
- Audio integration (metronome, backing tracks)
- Progress tracking over time
- Additional scales and chord types
- Chord diagram generator

## Common Maintenance Tasks

### Adding New Scales/Modes
Edit the `modes` array in `generateTanpura()`:
```javascript
const modes = ['Major', 'Dorian', /* ... */, 'New Mode'];
```

### Adding New Jazz Standards
Edit the `standards` array in `generateStandard()`:
```javascript
const standards = ['Autumn Leaves', /* ... */, 'New Song'];
```

### Theme Color Updates
Modify CSS custom properties in `:root` and `[data-theme="dark"]` selectors.

### Mobile Responsive Adjustments
Update the media query sections at the bottom of `style.css`.