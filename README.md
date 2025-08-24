# Accessible and Reusable Form

An **accessible and reusable Form** built with [shadcn/ui](https://ui.shadcn.com/) and Radix, featuring proper accessibility support and validation with Zod.

---

## 🚀 Tech Stack

- **Framework:** Next.js (App Router)  
- **UI Components:** shadcn/ui + Radix  
- **Styling:** Tailwind CSS  
- **Form Handling:** React Hook Form  
- **Validation:** Zod  
- **Icons / Flags:** react-flagkit  
- **Deployment:** Vercel  

---

## 🛠 Installation

1. Clone the repository:

```bash
git clone https://github.com/rafaelpascoal/nextjs-accessible-form-validation-zod.git
cd nextjs-accessible-form-validation-zod
```

2. Install dependencies:

```bash
pnpm install
# or npm install / yarn install
```

3. Add required components:

```bash
npx shadcn add form input select button
```

- Answer Yes to create a components.json file
- Choose a theme (e.g., zinc).
- Confirm creation of the components/ui folder.


4. Run the development server:

```bash
npm dev run
```
---
## ✨ Features

- ♿ Fully accessible form with keyboard navigation

- ⌨️ Handles focus, error messages and proper form validation

- 🏳 Supports country selection with flags and unified placeholder styling

- 🔄 Reusable and composable architecture with shadcn/ui

- 🧪 Validation with Zod + React Hook Form

- ⚡ Styled as a responsive card, centered on page with Tailwind CSS

- ✅ Labels added to all fields for better accessibility
---

## ♿ Accessibility Features

Proper labeling for all fields

Keyboard navigation support

Validation messages announced via screen readers

Visual focus and error indicators
---

## 📦 Usage

```typescript
'use client'

import Form from "@/components/Form"

export default function Page() {
  return <Form />
}
```
---

## 📸 Preview

🔗 Live Demo: https://nextjs-accessible-form-validation-z.vercel.app
---

## 🚀 Deployment

- Optimized for deployment on Vercel
- Connect your GitHub repository and deploy with one click
---

## 📋 Project Checklist

### Setup & Base

- ✅ Initialize Next.js project (App Router)
- ✅ Configure Git repository and GitHub remote
- ✅ Install Tailwind CSS
- ✅ Install shadcn/ui + Radix
- ✅ Install React Hook Form + Zod

### Features

- ✅ Implemented accessible form with shadcn/ui
- ✅ Added country select with flags
- ✅ Added validation with Zod (all fields)
- ✅ Added labels to all fields
- ✅ Styled form as card with shadow and Tailwind palette

### Documentation

- ✅ README updated with usage examples
- ✅ Detailed explanation of accessibility and validation

### Deployment

- ✅ Deployed to Vercel with live demo link

## 📂 Project Structure

```bash
src/
 ├─ app/                  # Next.js App Router
 │   └─ page.tsx          # Renders the form
 ├─ components/           # Reusable UI components
 │   ├─ ui/               # shadcn/ui components (input, select, button)
 │   └─ Form/             # Accessible Form component
 ├─ schemas/              # Zod validation schemas
 │   └─ formSchema.ts
 └─ utils/                # Helper functions
      └─ countries.ts     # List of countries with flags

```