# Animal Sounds Setup Guide

## Quick Setup Instructions

### Option 1: Download from Freesound.org (Recommended)

1. Visit [Freesound.org](https://freesound.org)
2. Search for each animal sound (e.g., "dog bark", "cat meow")
3. Filter by:
   - License: Creative Commons 0 (CC0) - Public Domain
   - Duration: 0-2 seconds
   - Format: MP3 or WAV

### Required Animal Sounds

Download and save these to `public/sounds/`:

| Animal | Filename | Search Term | Example URL |
|--------|----------|-------------|-------------|
| Dog | `dog.mp3` | "dog bark short" | https://freesound.org/s/362196/ |
| Cat | `cat.mp3` | "cat meow" | https://freesound.org/s/414209/ |
| Mouse | `mouse.mp3` | "mouse squeak" | https://freesound.org/s/188450/ |
| Rabbit | `rabbit.mp3` | "rabbit sound" | https://freesound.org/s/415209/ |
| Fox | `fox.mp3` | "fox sound" | https://freesound.org/s/331912/ |
| Bear | `bear.mp3` | "bear growl short" | https://freesound.org/s/388111/ |
| Panda | `panda.mp3` | "panda sound" | Use bear sound as fallback |
| Koala | `koala.mp3` | "koala sound" | https://freesound.org/s/512823/ |
| Tiger | `tiger.mp3` | "tiger roar short" | https://freesound.org/s/398031/ |
| Lion | `lion.mp3` | "lion roar short" | https://freesound.org/s/262310/ |

### Option 2: Use Kenney.nl Asset Pack

1. Visit [Kenney.nl](https://kenney.nl/assets/animal-pack-redux)
2. Download the "Animal Pack Redux" (free)
3. Extract and copy relevant sounds to `public/sounds/`
4. Rename files to match the required filenames above

### Option 3: Quick PowerShell Download Script

Run this in PowerShell from the project root:

```powershell
# Create sounds directory if it doesn't exist
New-Item -ItemType Directory -Force -Path "public/sounds"

# Download sample sounds (these are CC0 licensed)
$sounds = @{
    "dog.mp3" = "https://freesound.org/data/previews/362/362196_5121236-lq.mp3"
    "cat.mp3" = "https://freesound.org/data/previews/414/414209_7670939-lq.mp3"
    "mouse.mp3" = "https://freesound.org/data/previews/188/188450_1648170-lq.mp3"
}

foreach ($sound in $sounds.GetEnumerator()) {
    $output = "public/sounds/$($sound.Key)"
    Write-Host "Downloading $($sound.Key)..."
    Invoke-WebRequest -Uri $sound.Value -OutFile $output
}

Write-Host "Done! Downloaded sounds to public/sounds/"
```

### After Downloading

1. Verify files are in `public/sounds/`
2. Restart the dev server: `npm run dev`
3. Test the game - sounds should play when navigating numbers

## License Information

All sounds should be:
- **CC0 (Public Domain)** or **CC-BY** licensed
- Short duration (0.5-2 seconds)
- Clear and child-friendly
- Appropriate volume (not too loud)

## Troubleshooting

- **Sounds not playing?** Check browser console for errors
- **File not found?** Ensure files are in `public/sounds/` (not `src/sounds/`)
- **Wrong format?** Convert to MP3 using online tools like CloudConvert
