# 🏢 Filip Bonat WebApp

> Professional web application for Filip Bonat's business services - Clean repository with secure deployment

## 🚀 Overview

This is a full-stack web application built with React + TypeScript frontend and Node.js + Express backend, designed for Filip Bonat's professional services including insurance, credit applications, and damage reporting.

## ✨ Features

### 🎯 Core Functionality
- **Multi-page Application**: Home, Private Services, Business Services, Privacy Policy
- **Dynamic Forms**: Credit applications, damage reporting, general inquiries
- **File Upload System**: Secure file handling with Cloudinary integration
- **Email Integration**: Automated email notifications via SendGrid
- **Responsive Design**: Mobile-first approach with SCSS styling

### 🔧 Technical Features
- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js + Express + Prisma ORM
- **Database**: PostgreSQL with Prisma
- **File Storage**: Cloudinary for images and documents
- **Email Service**: SendGrid for transactional emails
- **Deployment**: Vercel with serverless functions
- **Styling**: SCSS with modular component architecture

### 🛡️ Security Features
- **No Exposed Credentials**: Clean repository without sensitive data
- **Environment Variables**: Secure configuration management
- **Input Validation**: Comprehensive form and file validation
- **File Size Limits**: Configurable upload restrictions
- **CORS Protection**: Secure API endpoints

## 📁 Project Structure

```
filip-bonat-webapp/
├── 📦 Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── pages/              # Page components
│   │   ├── hooks/              # Custom React hooks
│   │   ├── utils/              # Utility functions
│   │   ├── assets/             # Static assets and SCSS
│   │   └── types/              # TypeScript definitions
│   ├── public/                 # Public assets
│   └── package.json
│
├── 🖥️ Backend (Node.js + Express)
│   ├── server/
│   │   ├── api/                # API endpoints
│   │   ├── services/           # Business logic
│   │   ├── utils/              # Server utilities
│   │   ├── prisma/             # Database schema
│   │   └── package.json
│   └── api/                    # Vercel serverless functions
│
├── 📚 Documentation
│   ├── MIGRATION-TO-NEW-REPO-GUIDE.md
│   ├── VERCEL-DEPLOYMENT-GUIDE.md
│   ├── audit-report.md
│   └── README-SETUP.md
│
└── 🔧 Configuration
    ├── .env.example            # Environment template
    ├── .gitignore             # Git ignore rules
    ├── vercel.json            # Vercel configuration
    └── migration scripts      # Repository migration tools
```

## 🛠️ Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- PostgreSQL database
- SendGrid account
- Cloudinary account

### 1. Clone and Install
```bash
git clone https://github.com/your-username/filip-bonat-webapp-v2.git
cd filip-bonat-webapp-v2
npm install
cd server && npm install
```

### 2. Environment Setup
```bash
# Copy environment templates
cp .env.example .env
cp server/.env.example server/.env

# Configure your environment variables
# See README-SETUP.md for detailed instructions
```

### 3. Database Setup
```bash
cd server
npx prisma generate
npx prisma db push
```

### 4. Development
```bash
# Start frontend (port 5173)
npm run dev

# Start backend (port 3001)
cd server && npm run dev
```

## 🚀 Deployment

### Vercel Deployment
1. Connect repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

See `VERCEL-DEPLOYMENT-GUIDE.md` for detailed deployment instructions.

## 🔐 Environment Variables

### Frontend (.env)
```bash
VITE_API_URL=http://localhost:3001
```

### Backend (server/.env)
```bash
DATABASE_URL="postgresql://username:password@localhost:5432/database"
SENDGRID_API_KEY=your_sendgrid_api_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 📋 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend
- `npm run dev` - Start development server
- `npm run build` - Build TypeScript
- `npm run start` - Start production server
- `npm run prisma:generate` - Generate Prisma client

## 🧪 Key Components

### Frontend Components
- **AnfrageModal**: General inquiry form
- **SchadenMeldungModal**: Damage reporting form
- **KreditAnfrageModal**: Credit application form
- **FileUploadItem**: File upload with validation
- **SuccessModal**: Success confirmation

### Backend Services
- **EmailService**: SendGrid integration
- **FileUtils**: Cloudinary file handling
- **Validation**: Input validation utilities
- **UserDeduplication**: Prevent duplicate submissions

## 🔍 Security Audit

This repository has undergone a comprehensive security audit:
- ✅ No exposed credentials in code or history
- ✅ Secure environment variable management
- ✅ Input validation and sanitization
- ✅ File upload security measures
- ✅ CORS and API security

See `audit-report.md` for detailed security analysis.

## 📖 Documentation

- **Setup Guide**: `README-SETUP.md`
- **Deployment Guide**: `VERCEL-DEPLOYMENT-GUIDE.md`
- **Migration Guide**: `MIGRATION-TO-NEW-REPO-GUIDE.md`
- **Security Audit**: `audit-report.md`
- **API Documentation**: `server/docs/`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is proprietary software for Filip Bonat's business operations.

## 📞 Support

For technical support or questions:
- Check the documentation in `/docs`
- Review the setup guide: `README-SETUP.md`
- Consult the deployment guide: `VERCEL-DEPLOYMENT-GUIDE.md`

---

**🔒 Security Note**: This repository maintains a clean history without exposed credentials. All sensitive configuration is managed through environment variables.

**🚀 Status**: Production-ready with comprehensive testing and security measures.
