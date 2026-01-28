# 📚 HnilaBazar Documentation Index

Quick reference to all documentation files.

## 📖 Main Documentation

### [README.md](README.md)

**Main project documentation**

- Project overview
- Tech stack
- Quick start guide
- API documentation
- Available scripts
- Deployment guide

### [SETUP_GUIDE.md](SETUP_GUIDE.md)

**Complete setup instructions**

- Prerequisites
- Step-by-step installation
- MongoDB setup
- Firebase configuration
- Troubleshooting
- Deployment checklist

### [FEATURES.md](FEATURES.md)

**Feature documentation**

- Flash Sales
- Customer Insights
- Live Chat
- Product Comparison
- Reviews & Ratings
- Wishlist
- Multi-language support

## 🗂️ Project Structure

```
HnilaBazar/
├── README.md              # Main documentation
├── SETUP_GUIDE.md         # Setup instructions
├── FEATURES.md            # Feature documentation
├── DOCUMENTATION_INDEX.md # This file
│
├── Client/                # React frontend
│   ├── README.md         # Client-specific docs
│   └── src/
│       └── i18n/
│           └── README.md # i18n documentation
│
└── Server/                # Node.js backend
    ├── .env.example      # Environment variables template
    ├── seed.js           # Database seeding
    ├── seedFlashSales.js # Flash sales seeding
    ├── checkFlashSales.js # Flash sales checker
    ├── testFlashSalesAPI.js # API testing
    └── makeAdmin.js      # Admin user creation
```

## 🚀 Quick Links

### Getting Started

1. Read [SETUP_GUIDE.md](SETUP_GUIDE.md) for installation
2. Read [README.md](README.md) for project overview
3. Read [FEATURES.md](FEATURES.md) for feature details

### For Developers

- **API Docs**: See [README.md](README.md#api-documentation)
- **Tech Stack**: See [README.md](README.md#tech-stack)
- **Database Models**: See [README.md](README.md#database-models)

### For Users

- **Features**: See [FEATURES.md](FEATURES.md)
- **How to Use**: See feature-specific sections in FEATURES.md

### For Admins

- **Admin Features**: See [README.md](README.md#admin-features)
- **Customer Insights**: See [FEATURES.md](FEATURES.md#customer-insights)
- **Flash Sales**: See [FEATURES.md](FEATURES.md#flash-sales)

## 🛠️ Utility Scripts

### Server Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server
npm run seed       # Seed database
npm run seed:flash # Add flash sales
npm run check:flash # Check flash sales status
npm run test:flash # Test flash sales API
```

### Client Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## 📝 Documentation Standards

### File Naming

- Use UPPERCASE for main docs (README.md, SETUP_GUIDE.md)
- Use descriptive names
- Use .md extension for markdown

### Content Structure

- Start with title and brief description
- Use clear headings and subheadings
- Include code examples where relevant
- Add troubleshooting sections
- Keep it concise and scannable

### Markdown Style

- Use emojis for visual appeal
- Use code blocks for commands
- Use tables for structured data
- Use lists for steps
- Use links for cross-references

## 🔄 Keeping Docs Updated

When adding new features:

1. Update [FEATURES.md](FEATURES.md) with feature details
2. Update [README.md](README.md) if it affects setup/API
3. Update [SETUP_GUIDE.md](SETUP_GUIDE.md) if setup changes
4. Update this index if adding new doc files

## 📞 Need Help?

- Check relevant documentation file
- Review troubleshooting sections
- Check code comments
- Search project issues
- Ask in project discussions

---

**Last Updated**: January 2026
