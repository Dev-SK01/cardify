# **App Name**: Cardify
# Live URL [https://cardify-one.vercel.app]
## Core Features:

- Profile Section: Display a profile section with photo (upload or placeholder), full name, job title, and short bio/tagline.
- Contact Information: Show contact information: phone number (click-to-call), email address (mailto link), personal website or portfolio link.
- Social Media Links: List social media links (LinkedIn, GitHub, Twitter, etc.) that open in a new tab.
- QR Code Generation: Auto-generate QR code linking to the card or vCard data, updating as contact info changes.
- vCard Export: Export contact information as a .vcf file, usable on mobile and desktop.
- Social Sharing: Provide social sharing options via WhatsApp, Twitter/X, Email, and Facebook, plus copy-to-clipboard functionality.
- Theme Customization: Enable light and dark mode toggle and offer two card layout templates, with animated transitions.

## Style Guidelines:

- Primary color: A deep blue (#3F51B5) to convey professionalism and trustworthiness.
- Background color: A light gray (#F5F5F5) for the light mode and a dark gray (#333333) for the dark mode, providing a clean backdrop.
- Accent color: A vibrant orange (#FF9800) to highlight interactive elements and call-to-action buttons.
- Use clear, sans-serif fonts like 'Arial' or 'Helvetica' for readability.
- Simple, line-based icons for social media links and contact options.
- Clean, responsive layouts optimized for various screen sizes.

## Features

*   **Customizable Card Data:** Easily input and update your personal and professional information (name, job title, bio, contact details, social media links).
*   **Live Preview:** See your digital business card update in real-time as you edit the information.
*   **Multiple Layout Templates:** Choose between different card layouts (e.g., Classic, Modern) to suit your style.
*   **Theme Customization:** Switch between light and dark themes. The color scheme can be further customized via CSS variables in `src/app/globals.css`.
*   **Profile Photo Upload:** Upload your profile picture or provide a URL.
*   **QR Code Generation:** Automatically generates a QR code containing your vCard data for easy sharing and contact saving.
*   **vCard Download:** Download your contact information as a standard .vcf file.
*   **Social Sharing:** Share your card URL or vCard data via popular platforms like WhatsApp, Twitter, Email, and Facebook.
*   **Responsive Design:** Works seamlessly on desktop and mobile devices.
*   **Persistent Storage:** Your card data and app settings (theme, layout) are saved in your browser's local storage.
*   **Built with Modern Tech:** Leverages Next.js App Router, Server Components (where applicable), and TypeScript for a robust and performant experience.

## Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) (with App Router)
*   **UI Library:** [React](https://reactjs.org/)
*   **Component Library:** [ShadCN UI](https://ui.shadcn.com/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **AI (Optional/Future):** [Genkit (Firebase)](https://firebase.google.com/docs/genkit)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Fonts:** Geist Sans, Geist Mono

## Getting Started

### Prerequisites

*   Node.js (v18 or later recommended)
*   npm or yarn

### Installation & Setup

1.  **Clone the repository (or start from Firebase Studio):**
    ```bash
    git clone https://github.com/your-repo/cardify.git 
    # Or your specific repository URL
    cd cardify
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The application will be available at `http://localhost:9002` (or another port if 9002 is in use).

4.  **To run Genkit development server (if using AI features):**
    Open a new terminal and run:
    ```bash
    npm run genkit:dev
    ```

## Project Structure

*   `src/app/`: Main application pages and layouts (using Next.js App Router).
    *   `page.tsx`: The main homepage where users interact with the app.
    *   `layout.tsx`: Root layout for the application.
    *   `globals.css`: Global styles and Tailwind CSS theme customization (CSS HSL variables).
*   `src/components/`: Reusable React components.
    *   `ui/`: ShadCN UI components.
    *   `card-form.tsx`: Form for editing card details.
    *   `card-preview.tsx`: Component to display the live preview of the card.
    *   `layout-templates/`: Contains different card layout components (e.g., `template1.tsx`, `template2.tsx`).
    *   `theme-toggle.tsx`: Button to switch between light and dark themes.
    *   `layout-selector.tsx`: Radio group to select card layout.
    *   `qr-code-generator.tsx`: Generates and displays the QR code.
    *   `social-share-buttons.tsx`: Buttons for sharing the card.
*   `src/hooks/`: Custom React hooks.
    *   `use-card-data.ts`: Manages card data state, app settings, and localStorage persistence.
*   `src/lib/`: Utility functions.
    *   `utils.ts`: General utility functions (e.g., `cn` for classnames).
    *   `vcard.ts`: Functions for generating and downloading vCard files.
*   `src/ai/`: Genkit related files for AI features.
    *   `genkit.ts`: Genkit AI client initialization.
    *   `dev.ts`: Genkit development server entry point.
    *   `flows/`: Directory for Genkit flows (e.g., AI-powered content suggestions - if implemented).
*   `public/`: Static assets.
*   `package.json`: Project dependencies and scripts.
*   `next.config.ts`: Next.js configuration.
*   `tailwind.config.ts`: Tailwind CSS configuration.
*   `components.json`: ShadCN UI configuration.
*   `apphosting.yaml`: Firebase App Hosting configuration.

## Customization

### Theming

The application supports light and dark themes. Colors are defined using HSL CSS variables in `src/app/globals.css`. You can modify these variables to change the color palette:

```css
/* src/app/globals.css */
@layer base {
  :root { /* Light theme variables */
    --background: 0 0% 96.1%; /* Light Gray #F5F5F5 */
    --foreground: 0 0% 13%;   /* Darker Gray for text */
    --primary: 231 48% 48%;    /* Deep Blue #3F51B5 */
    --accent: 36 100% 50%;     /* Vibrant Orange #FF9800 */
    /* ... other variables */
  }
  .dark { /* Dark theme variables */
    --background: 0 0% 20%;   /* Dark Gray #333333 */
    --foreground: 0 0% 96.1%; /* Light Gray for text */
    /* ... other variables */
  }
}
```

### Card Layouts

New card layouts can be added by:
1.  Creating a new React component in `src/components/layout-templates/`.
2.  This component should accept a `data: CardData` prop.
3.  Update `LayoutSelector` in `src/components/layout-selector.tsx` to include an option for the new template.
4.  Update `CardPreview` in `src/components/card-preview.tsx` to render the new template based on the selected layout.


