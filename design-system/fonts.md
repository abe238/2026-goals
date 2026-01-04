# Typography Configuration

## Google Fonts Import

Add to your HTML `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">
```

Or in CSS:

```css
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Manrope:wght@400;500;600;700&display=swap');
```

## Font Usage

### Manrope (Heading & Body)

A modern, geometric sans-serif with excellent readability. Used for all UI text.

```css
font-family: 'Manrope', sans-serif;
```

**Weights used:**
- 400 (Regular) — Body text
- 500 (Medium) — Buttons, labels
- 600 (Semibold) — Subheadings
- 700 (Bold) — Headings

### JetBrains Mono (Monospace)

A developer-friendly monospace font for code and technical content.

```css
font-family: 'JetBrains Mono', monospace;
```

**Weights used:**
- 400 (Regular) — Code blocks
- 500 (Medium) — Emphasized code

## Tailwind Configuration

If using Tailwind, add to your CSS or config:

```css
/* In your CSS file with @theme */
@theme {
  --font-sans: 'Manrope', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

Or apply directly in classes:

```html
<div class="font-[Manrope]">Manrope text</div>
<code class="font-mono">Monospace text</code>
```

## Typography Scale

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 | text-3xl | font-bold | leading-tight |
| H2 | text-2xl | font-bold | leading-tight |
| H3 | text-xl | font-semibold | leading-snug |
| H4 | text-lg | font-semibold | leading-snug |
| Body | text-base | font-normal | leading-relaxed |
| Small | text-sm | font-normal | leading-normal |
| Caption | text-xs | font-medium | leading-normal |
