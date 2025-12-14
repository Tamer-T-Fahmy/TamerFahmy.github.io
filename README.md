# Tamer Fahmy - Personal Homepage

A modern, responsive personal webpage showcasing professional experience, AI transformation initiatives, academic publications, and community involvement.

## 🌐 Live Site

Once deployed: **https://tamer-t-fahmy.github.io/tamer-fahmy-homepage/**

## 📁 Project Structure

```
tamer-fahmy-homepage/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript for interactivity
├── images/
│   └── profile.jpg     # Profile photo
└── README.md           # This file
```

## 🚀 Deploying to GitHub Pages

### Step 1: Add Your Profile Photo

Before deploying, save your profile photo to the images folder:

```bash
# Make sure the images folder exists
mkdir -p images

# Copy your profile photo (rename it to profile.jpg)
cp "/path/to/your/Image 21-09-2022 at 14.16.jpeg" images/profile.jpg
```

### Step 2: Initialize Git Repository

```bash
cd /Users/tamfahmy/Desktop/tamer-fahmy-homepage

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Personal homepage"
```

### Step 3: Push to GitHub

```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/Tamer-T-Fahmy/tamer-fahmy-homepage.git

# Push to main branch
git branch -M main
git push -u origin main
```

### Step 4: Enable GitHub Pages

1. Go to https://github.com/Tamer-T-Fahmy/tamer-fahmy-homepage
2. Click **Settings** (gear icon)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select **Deploy from a branch**
5. Under **Branch**, select **main** and **/ (root)**
6. Click **Save**
7. Wait 1-2 minutes for deployment
8. Your site will be live at: `https://tamer-t-fahmy.github.io/tamer-fahmy-homepage/`

## ✨ Features

- **Modern Dark Theme** - Professional dark design with blue-teal gradient accents
- **Fully Responsive** - Optimized for desktop, tablet, and mobile
- **Smooth Animations** - Scroll-triggered fade-in effects and hover interactions
- **Mobile Navigation** - Hamburger menu for mobile devices

## 📑 Sections

1. **Hero** - Introduction with profile photo and CTA
2. **About** - Professional summary and core skills
3. **AI Transformation** - Focus areas in AI/ML implementation
4. **Publications** - Academic research work
5. **Education** - MBA and B.E. credentials
6. **Certifications** - Professional certifications
7. **Volunteering** - Mentorship activities
8. **Contact** - LinkedIn, Email, and Location

## 🔧 Customization

### Update Profile Photo
Replace `images/profile.jpg` with your desired image.

### Update Content
Edit `index.html` to modify text, links, or add new sections.

### Modify Styling
Edit `styles.css` to change colors, fonts, or layouts. Key CSS variables are at the top:

```css
:root {
    --primary-color: #0668E1;
    --accent-color: #00D4AA;
    --dark-bg: #0a0a0a;
    /* ... */
}
```

## 📝 License

Personal use only. © 2024 Tamer Fahmy. All rights reserved.
