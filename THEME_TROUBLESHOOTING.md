# Theme System Troubleshooting Guide

## 🔧 Current Status

The dynamic theme system has been implemented with the following components:

### ✅ Implemented Components:
1. **ThemeProvider** (`components/theme-provider.tsx`) - Global theme state management
2. **ThemeSelector** (`components/theme-selector.tsx`) - UI component for theme selection
3. **Theme Integration** - Added to main layout via providers
4. **CSS Custom Properties** - Dynamic theme variables
5. **17 Theme Presets** - All themes from Default to Cyberpunk

### 🧪 Debug Pages Created:
- `/debug-theme` - Comprehensive theme debugging interface
- `/test-theme` - Simple theme switching test
- `/theme-demo` - Full theme showcase

## 🚨 Potential Issues & Solutions

### Issue 1: Theme Provider Not Working
**Symptoms:** "useTheme must be used within a ThemeProvider" error

**Solution:** Check that ThemeProvider is properly wrapped in `app/providers.tsx`:
```tsx
<ThemeProvider defaultTheme="default">
  {children}
</ThemeProvider>
```

### Issue 2: CSS Variables Not Applying
**Symptoms:** Styles not changing when theme is switched

**Possible Causes:**
1. **Server-Side Rendering Issues** - CSS variables set on client only
2. **Hydration Mismatch** - Client/server theme mismatch
3. **CSS Specificity** - Tailwind classes overriding custom properties

**Solutions:**
1. Added `isClient` flag to prevent SSR issues
2. Added error handling for localStorage access
3. Added fallback values in CSS custom properties

### Issue 3: Theme Not Persisting
**Symptoms:** Theme resets on page reload

**Solution:** Check localStorage functionality:
```javascript
// Should save theme
localStorage.setItem('sitecraft-theme', themeName)

// Should load theme on mount
const savedTheme = localStorage.getItem('sitecraft-theme')
```

### Issue 4: Compilation Errors
**Symptoms:** Build fails or components don't render

**Common Causes:**
1. Missing dependencies (react-colorful was removed)
2. Import errors
3. TypeScript type issues

**Current Status:** ✅ All compilation errors resolved

## 🔍 How to Debug

### Step 1: Visit Debug Page
Go to `http://localhost:3001/debug-theme`

**What to Check:**
- Does the page load without errors?
- Are theme buttons visible?
- Does clicking themes change the display?
- Are CSS variables showing values?

### Step 2: Check Browser Console
Open browser developer tools and look for:
- JavaScript errors
- Failed network requests
- Theme-related warnings

### Step 3: Inspect CSS Variables
In browser dev tools, check `document.documentElement` styles:
```css
:root {
  --theme-primary: #3b82f6;
  --theme-background: #ffffff;
  --theme-text: #1e293b;
  /* ... other variables */
}
```

### Step 4: Test Simple Theme Switch
Visit `http://localhost:3001/test-theme` for basic functionality test

## 🛠️ Manual Testing Steps

### Test 1: Basic Theme Switching
1. Go to homepage (`http://localhost:3001`)
2. Click theme selector in header (Palette icon)
3. Select different themes
4. Verify page colors change

### Test 2: Theme Persistence
1. Select a theme (e.g., "Neon")
2. Refresh the page
3. Verify theme is still applied

### Test 3: Multiple Pages
1. Set theme on homepage
2. Navigate to `/theme-demo`
3. Verify theme is consistent across pages

## 🔧 Quick Fixes

### Fix 1: Reset Theme System
If themes aren't working, try:
1. Clear localStorage: `localStorage.removeItem('sitecraft-theme')`
2. Refresh page
3. Select theme again

### Fix 2: Force Theme Application
Add this to browser console:
```javascript
// Force apply default theme
document.documentElement.style.setProperty('--theme-primary', '#3b82f6')
document.documentElement.style.setProperty('--theme-background', '#ffffff')
document.documentElement.style.setProperty('--theme-text', '#1e293b')
```

### Fix 3: Check Provider Wrapping
Ensure the component tree looks like:
```
RootLayout
  └── Providers
      └── NextThemeProvider
          └── ThemeProvider (our custom one)
              └── App content
```

## 📊 Expected Behavior

### When Theme is Changed:
1. **Immediate Visual Update** - Colors change within 500ms
2. **CSS Variables Updated** - All `--theme-*` variables get new values
3. **Body Class Added** - `theme-{themeName}` class added to body
4. **localStorage Updated** - Theme preference saved
5. **Smooth Transitions** - All elements transition smoothly

### Supported Themes:
- **Basic:** Default, Dark, Minimal, Vibrant, Elegant, Modern, Warm
- **Colorful:** Neon, Ocean, Forest, Sunset, Royal
- **Special:** Cosmic, Retro, Arctic, Pastel, Cyberpunk

## 🚀 Server Status

Current server: `http://localhost:3001`

### Available Debug URLs:
- `/debug-theme` - Full debugging interface
- `/test-theme` - Simple theme test
- `/theme-demo` - Theme showcase
- Homepage with theme selector in header

## 📝 Next Steps

If theme system is still not working:

1. **Check Debug Page** - Visit `/debug-theme` first
2. **Review Console** - Look for JavaScript errors
3. **Test Simple Case** - Try `/test-theme` page
4. **Verify Provider** - Ensure ThemeProvider is wrapping correctly
5. **Check CSS** - Verify custom properties are being set

The theme system should now be fully functional with comprehensive debugging tools available!