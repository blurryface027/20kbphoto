# 20KB Photo

> Free online photo and signature resizing, compression, cropping, DPI adjustment and format conversion tools for government exams, recruitment forms and online applications.

**Live Website:** https://20kbphoto.in

---

## 🚀 About

**20KB Photo** is a browser-based image processing platform built to help users prepare photos and signatures according to the specific requirements of government exams, recruitment applications and online forms.

The platform provides tools for:

- Image resizing
- Image compression
- Exact file-size control
- Photo cropping
- Signature resizing
- Photo & signature resizing
- DPI adjustment
- Rotate and flip
- JPG conversion
- Exam-specific presets
- Dimension-specific resizing

The goal is to make preparing application images simple without requiring desktop image-editing software.

---

## ✨ Features

### 🖼️ Image Tools

- Resize images to specific dimensions
- Compress images to a target file size
- Resize and compress simultaneously
- Crop images
- Rotate images
- Flip images horizontally/vertically
- Change image DPI
- Convert images to JPG
- Preview original and processed images
- Display image dimensions, file size and format
- Validate output against selected requirements

### ✍️ Signature Tools

- Signature resizing
- Signature compression
- Fixed signature dimensions
- Target file-size controls
- JPG conversion
- Signature preview and validation

### 🎯 Exam-Specific Tools

The platform provides dedicated presets for different examinations and application requirements.

Each exam page can provide:

- Required photo dimensions
- Required signature dimensions
- File-size limits
- Supported format
- Photo resizer
- Signature resizer
- Photo & signature resizer
- Exam-specific information
- Application guidance

---

## 🔧 Image Processing

Image processing is designed to happen primarily in the browser.

This provides several benefits:

- 🔒 Better privacy
- ⚡ Faster processing
- 💰 Lower server workload
- 📦 No need to upload images to a backend for processing
- 🛡️ User images can remain on the user's device

The application processes the selected image locally and generates the final output directly in the browser.

---

## 🛠️ Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Image Processing

- Browser-based image processing
- Canvas-based transformations
- JPEG compression
- Image resizing
- Cropping
- DPI metadata handling
- Rotation and flipping

### Deployment

- GitHub
- GitHub Actions
- Self-hosted GitHub Actions Runner
- Oracle Cloud
- Nginx


---

## 📁 Project Structure

```text
20kbphoto/
│
├── src/
│   ├── app/
│   │   ├── exams/
│   │   ├── tools/
│   │   ├── about/
│   │   ├── contact/
│   │   ├── privacy-policy/
│   │   ├── terms-of-service/
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── exams/
│   │   ├── tools/
│   │   └── layout/
│   │
│   └── lib/
│       ├── imageProcessor.ts
│       └── seoUtils.ts
│
├── public/
│
├── scratch/
│
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
