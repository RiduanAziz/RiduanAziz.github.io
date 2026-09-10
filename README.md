# RiduanAziz.github.io
My Professional Portfolio RiduanAziz.github.io

# Riduan Aziz - Portfolio Website

This is a modern, responsive, static portfolio website designed for GitHub Pages. It highlights my background in Computer Science & Engineering, Data Science, AI/ML, and Software Development.

## How to Deploy on GitHub Pages

1. **Create a new repository** on GitHub named `RiduanAziz.github.io` (or a name of your choice).
2. **Upload these files** to the `main` branch of your repository:
   - `index.html`
   - `style.css`
   - `script.js`
   - `README.md`
   - *(Optional)* A formal studio headshot image to replace the placeholder icon in the hero section.
3. **Go to Settings > Pages** in your GitHub repository.
4. Under **Build and deployment**, select **Source: Deploy from a branch**.
5. Select the `main` branch and `/root` folder, then click **Save**.
6. Wait a few minutes. Your site will be published at `https://RiduanAziz.github.io/` (or the respective repository path).

## Updating the Hero Image (Headshot)
To add your professional headshot:
1. Place your image (e.g., `profile.jpg`) in the same folder.
2. In `index.html`, find the `<div class="hero-image-placeholder">` block.
3. Replace the placeholder div with: 
   `<img src="profile.jpg" alt="Riduan Aziz Headshot" style="width: 300px; height: 300px; object-fit: cover; border-radius: 12px; border: 2px solid var(--accent);">`

## Built With
* Semantic HTML5
* CSS3 (Flexbox/Grid, Variables)
* Vanilla JavaScript
* FontAwesome & Devicon Icons