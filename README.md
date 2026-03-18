<div align="center">
  <img src="./public/assets/icons/logo-full-brand.svg" alt="DriveIt Logo" width="200" />

  <h3>A full-stack cloud file storage app — upload, manage, and share your files from anywhere.</h3>

  <p>
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Appwrite-FD366E?style=for-the-badge&logo=appwrite&logoColor=white" alt="Appwrite" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  </p>

  <p>
    <a href="#-features">Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-environment-variables">Environment Variables</a>
  </p>
</div>

---

## 📌 Overview

**DriveIt** is a production-ready Google Drive clone built with Next.js 15 and Appwrite. It allows authenticated users to upload, organize, rename, share, and delete files across all major formats — documents, images, videos, and audio — with a clean, responsive interface and real-time UI updates.

---

## ✨ Features

- 📁 **Multi-type file uploads** — documents, images, video, and audio
- ✏️ **Rename files** — inline renaming without leaving the page
- 🔗 **File sharing** — generate shareable links for any file
- 🗑️ **Delete files** — permanently remove files with confirmation
- 🔍 **File detail view** — metadata including size, type, and upload date
- 🗂️ **Type-based categorization** — Documents, Images, Media, Others
- 📊 **Storage usage summary** — visual breakdown of storage per file type
- 🔐 **Secure authentication** — Appwrite-powered auth with isolated user storage
- 📱 **Fully responsive** — works on mobile, tablet, and desktop

---

## 🛠 Tech Stack

| Technology                                    | Purpose                                 |
| --------------------------------------------- | --------------------------------------- |
| [Next.js 15](https://nextjs.org/)             | Full-stack React framework (App Router) |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe development                   |
| [Appwrite](https://appwrite.io/)              | Auth, database, and file storage (BaaS) |
| [Tailwind CSS](https://tailwindcss.com/)      | Utility-first styling                   |
| [ShadCN UI](https://ui.shadcn.com/)           | Accessible UI components                |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- An [Appwrite](https://appwrite.io/) project set up (Cloud or self-hosted)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/next-drive-clone.git
cd next-drive-clone

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT=your_project_id
NEXT_PUBLIC_APPWRITE_DATABASE=your_database_id
NEXT_PUBLIC_APPWRITE_USERS_COLLECTION=your_users_collection_id
NEXT_PUBLIC_APPWRITE_FILES_COLLECTION=your_files_collection_id
NEXT_PUBLIC_APPWRITE_BUCKET=your_bucket_id
NEXT_APPWRITE_KEY=your_appwrite_api_key
```

> ⚠️ Never commit your `.env.local` file. Make sure it is listed in `.gitignore`.

---

## 📂 Project Structure

```
next-drive-clone/
├── app/                  # Next.js App Router pages and layouts
├── components/           # Reusable UI components
├── lib/                  # Appwrite client, server actions, utilities
├── public/               # Static assets and icons
├── types/                # Global TypeScript types
└── constants/            # App-wide constants
```

<div align="center">
  <p>Built by <a href="https://shakur.netlify.app">Shakur</a></p>
</div>
