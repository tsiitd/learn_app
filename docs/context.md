# Kids Learn App - Project Context

## Overview
An educational web application designed for toddlers (3-5 years old) to learn foundational concepts through interactive, game-based activities.

## Current Features

### Number Line Game
- **Objective**: Navigate to a target number (0-100) using keyboard/touch controls
- **Visual Design**: 10 animal-themed rows, each representing a range of 10 numbers
- **Interaction**: Arrow keys for navigation, Enter/Space to confirm answer
- **Feedback**: Text-to-Speech audio, visual animations, confetti celebration
- **Hint Mode**: Toggleable star indicator on target number

## Technology Stack
- **Framework**: Next.js 16 (React 19)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Audio**: Web Speech API (TTS), Canvas Confetti

## Design Principles (for 3-5 year olds)
1. **Large Touch Targets**: Minimum 75x75px buttons
2. **Bright Colors**: Primary colors (Red, Yellow, Blue) with high saturation
3. **Immediate Feedback**: Visual and audio response to every action
4. **Simple Navigation**: One-tap/one-key actions, no complex gestures
5. **Engaging Animations**: Bouncing, jiggling, dancing elements

## UI/UX Implementation Details

### Row Visibility & Scaling
- **Active Row**: 1.15x scale, full opacity, prominent display
- **Inactive Rows**: 0.75x scale (75% of normal size), 50% opacity
- **Container**: All 10 rows must fit on screen simultaneously
- **Constraint**: Active row enlargement must NOT exceed screen width
- **Auto-scroll**: When navigating, the active row should auto-scroll into view

### Audio Behavior
- **Number Announcement**: Speak digits first, then number name
  - Example: "seven seven - seventy seven" (not just "seventy seven")
  - Format: "[digit] [digit] - [number name]"
- **Animal Sounds**: 
  - Play on EVERY number change (even within same row)
  - Use only animals with available sound files
  - Play full duration of sound (no truncation)
  - Sounds should be short (0.5-1 second) for responsiveness
- **Language Support**: TTS must use correct language code and voice

### Number Display
- **Font Size**: 3xl (48px) for grid numbers
- **Active Number**: Additional 1.3x scale + jiggle animation
- **Language-specific Digits**: 
  - English: 0-9
  - Hindi: ०-९
  - Arabic: ٠-٩
  - French: 0-9

### Settings
- **Max Number Options**: 20, 30, 50, 100
- **Language Options**: English, Hindi, French, Arabic
- **Persistence**: Settings saved in browser localStorage
- **Dynamic Rows**: Only show rows needed for max number (e.g., 3 rows for max=30)

## Project Structure
```
src/
  app/
    page.tsx              # Landing page with game selection
    math/number-line/
      page.tsx            # Number Line game page
  components/
    ui/                   # Reusable UI components (Button, Card)
    game/                 # Game-specific components
      NumberLineGame.tsx  # Main game logic
      AnimalRow.tsx       # Individual row with 10 numbers
      BottomNumberLine.tsx # Horizontal number scale
  lib/
    constants.ts          # Game configuration (animals, colors)
    utils.ts              # Utility functions
```

## Future Roadmap
- [ ] Additional games (Addition, Subtraction, Logic Maze)
- [ ] User authentication (Google OAuth)
- [ ] Progress tracking and analytics
- [ ] Parent dashboard
- [ ] Multi-language support
- [ ] Configurable difficulty settings
- [ ] Sound effects library

## Development
- **Dev Server**: `npm run dev` (http://localhost:3000)
- **Build**: `npm run build`
- **Lint**: `npm run lint`

## Assets
- **Animals**: Currently emoji-based (🐶🐱🐭🐰🦊🐻🐼🐨🐯🦁)
- **Animal Sounds**: 
  - Source: Open-source libraries (Freesound.org, Kenney.nl)
  - Format: MP3 or WAV, short duration (0.5-1s)
  - Only use animals with available sound files
  - Fallback: Use subset of animals if sounds unavailable
- **Future**: Replace emojis with illustrated animal images

## Known Issues & Fixes
1. **Auto-scroll**: Bottom number line scrolls, but row container needs auto-scroll to active row
2. **Row Overflow**: Active row (1.15x) can exceed screen width - needs max-width constraint
3. **Row Sizing**: Inactive rows should be 75% (not 85%) for better differentiation
4. **Sound Timing**: Animal sounds must play on every number change, not just row change
5. **Number Speech**: Must announce digits before number name (e.g., "seven seven - seventy seven")

## Notes
- Designed for modularity to easily add new games
- Built with future public launch in mind (authentication, analytics)
- Optimized for both desktop (keyboard) and touch devices
