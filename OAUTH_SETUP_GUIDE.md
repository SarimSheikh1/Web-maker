# OAuth Setup Guide for SiteCraft

## 🚀 Quick Test (Without OAuth Setup)

The application works perfectly without OAuth credentials! You can:

1. **Visit**: `http://localhost:3001`
2. **Sign up** with email/password
3. **Get automatic demo project** created
4. **Test all features** including animations and themes

## 🔧 Google OAuth Setup (Optional)

To enable Google sign-in, follow these steps:

### 1. Create Google OAuth App

1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Create a new project or select existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set application type to "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:3001/api/auth/callback/google`
   - `http://localhost:3000/api/auth/callback/google` (backup)

### 2. Configure Environment Variables

Create `.env.local` file in the project root:

```env
NEXTAUTH_URL="http://localhost:3001"
NEXTAUTH_SECRET="your-super-secret-key-here"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 3. Restart the Application

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## 🔧 GitHub OAuth Setup (Optional)

### 1. Create GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/applications/new)
2. Fill in the application details:
   - **Application name**: SiteCraft Local
   - **Homepage URL**: `http://localhost:3001`
   - **Authorization callback URL**: `http://localhost:3001/api/auth/callback/github`

### 2. Add to Environment Variables

Add to your `.env.local` file:

```env
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"
```

## 🎯 Testing the New User Flow

### With OAuth (Google/GitHub):
1. Click "Google" or "GitHub" on sign-up page
2. Complete OAuth flow
3. Get redirected to dashboard with welcome message
4. See your auto-created demo project
5. Click "Edit Your Demo Website" to start building

### With Email/Password:
1. Fill out the sign-up form
2. Get redirected to dashboard
3. See welcome message and demo project
4. Start editing immediately

## ✨ What New Users Get Automatically

When a user signs up (via any method), they automatically receive:

### 📄 Demo Project: "My First Website"
- **Hero Section**: Welcome message with animations
- **Features Section**: Getting started guide
- **Contact Section**: Ready-to-use contact form
- **Footer**: Professional footer with links
- **Modern Theme**: Beautiful default styling

### 🎨 Full Access To:
- **18 Animation Types**: fadeUp, scaleIn, typewriter, etc.
- **12 Themes**: Default, Dark, Neon, Ocean, Forest, etc.
- **All Block Types**: Hero, Features, Testimonials, Pricing, FAQ, etc.
- **Visual Editor**: Drag & drop interface
- **Real-time Preview**: See changes instantly

## 🌐 Testing URLs

- **Homepage**: `http://localhost:3001`
- **Sign Up**: `http://localhost:3001/auth/signup`
- **Sign In**: `http://localhost:3001/auth/signin`
- **Dashboard**: `http://localhost:3001/dashboard`
- **Demo Site**: `http://localhost:3001/site/[project-slug]`

## 🎉 Ready to Test!

The enhanced SiteCraft platform now provides an amazing first-time user experience with:
- Instant demo project creation
- Beautiful welcome dashboard
- Guided onboarding
- Full feature access from day one

Try signing up with Google OAuth or email to see the magic happen! ✨