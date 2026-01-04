# Tailwind Color Configuration

## Color Choices

- **Primary:** `amber` — Warm gold for key actions, accents, and highlights
- **Secondary:** `yellow` — Bright highlights and celebrations
- **Neutral:** `neutral` — Backgrounds, text, borders

## Usage Examples

### Primary (Amber)

```html
<!-- Primary button -->
<button class="bg-amber-500 hover:bg-amber-400 text-neutral-950">
  Action
</button>

<!-- Primary accent -->
<span class="text-amber-500">Highlighted text</span>

<!-- Active state -->
<div class="bg-amber-500/10 text-amber-500">Active item</div>

<!-- Glow effect -->
<button class="shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30">
  Voice Capture
</button>
```

### Secondary (Yellow)

```html
<!-- Celebration badge -->
<span class="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300">
  Win!
</span>

<!-- Highlight -->
<div class="border-yellow-400">Important item</div>
```

### Neutral

```html
<!-- Background (OLED black) -->
<div class="bg-neutral-950">Dark background</div>

<!-- Card -->
<div class="bg-neutral-900 border border-neutral-800">Card content</div>

<!-- Text hierarchy -->
<h1 class="text-neutral-100">Heading</h1>
<p class="text-neutral-400">Body text</p>
<span class="text-neutral-500">Muted text</span>

<!-- Borders -->
<div class="border-neutral-800">Subtle border</div>
```

## Color Palette Reference

| Color | Light | Default | Dark |
|-------|-------|---------|------|
| amber-400 | Hover | - | - |
| amber-500 | - | Primary | - |
| amber-600 | - | - | Pressed |
| yellow-400 | - | Secondary | - |
| neutral-100 | - | Headings | - |
| neutral-400 | - | Body text | - |
| neutral-500 | - | Muted | - |
| neutral-800 | - | Borders | - |
| neutral-900 | - | Cards | - |
| neutral-950 | - | Background | - |
