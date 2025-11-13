# 🛠️ Development Guide

## 🚀 Quick Start

### **Frontend Only (Recommended)**
```bash
cd frontend
npm install --force
npm start
# Access: http://localhost:3000
# Uses dummy data - no backend required
```

### **Full Stack (Complete Features)**
```bash
# 1. Database Setup
mysql -u root -p
CREATE DATABASE menu_tree_db;

# 2. Backend (Terminal 1)
cd backend
npm install
npm run seed
npm run start:dev

# 3. Frontend (Terminal 2)
cd frontend
npm install
npm start
```

## 🔧 Development Commands

### **Frontend**
```bash
cd frontend
npm start          # Development server
npm run build      # Production build
npm test           # Run tests
npm run lint       # ESLint check
```

### **Backend**
```bash
cd backend
npm run start:dev  # Development with hot reload
npm run build      # Production build
npm run test       # Unit tests
npm run seed       # Load sample data
```

## 🐳 Docker Development

```bash
# Development mode (hot reload)
docker-compose -f docker-compose.dev.yml up

# Production mode
docker-compose up
```

## 📁 Key Files

### **Frontend Structure**
```
frontend/src/
├── components/
│   ├── MenuTreeApp.tsx    # Main app component
│   ├── MenuTree.tsx       # Tree view with drag & drop
│   ├── MenuForm.tsx       # Create/edit modal
│   └── MenuDetail.tsx     # Detail panel
├── hooks/
│   └── useMenus.ts        # React Query hooks
├── services/
│   └── api.ts             # API client
└── types/
    └── menu.ts            # TypeScript interfaces
```

### **Backend Structure**
```
backend/src/
├── menu/
│   ├── entities/menu.entity.ts    # Database entity
│   ├── dto/                       # Data transfer objects
│   ├── menu.controller.ts         # REST endpoints
│   ├── menu.service.ts            # Business logic
│   └── menu.module.ts             # NestJS module
└── database/
    └── database.module.ts         # Database config
```

## 🎯 Key Features Implementation

### **Drag & Drop**
- Location: `frontend/src/components/MenuTree.tsx`
- Uses native HTML5 drag & drop API
- Visual feedback with opacity and border changes
- Grip handle shows on hover

### **Responsive Design**
- Tailwind CSS breakpoints: `sm:`, `lg:`
- Flexible sidebar: `w-32 sm:w-36 lg:w-40`
- Responsive content: `w-72 sm:w-80 lg:w-96`

### **API Integration**
- React Query for data fetching
- Axios for HTTP requests
- Fallback to dummy data if backend unavailable

## 🔍 Debugging

### **Frontend Issues**
```bash
# Clear cache
rm -rf node_modules/.cache
rm .eslintcache

# Reinstall dependencies
npm install --force
```

### **Backend Issues**
```bash
# Check database connection
npm run seed

# View API documentation
# http://localhost:3001/api/docs
```

## 🧪 Testing

### **Frontend Tests**
```bash
cd frontend
npm test                    # Run all tests
npm test -- --coverage     # With coverage
npm test -- --watch        # Watch mode
```

### **Backend Tests**
```bash
cd backend
npm run test               # Unit tests
npm run test:e2e          # End-to-end tests
npm run test:cov          # With coverage
```

## 📝 Environment Variables

### **Frontend (.env)**
```bash
REACT_APP_API_URL=http://localhost:3001/api
CHOKIDAR_USEPOLLING=true
```

### **Backend (.env)**
```bash
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=menu_tree_db
BACKEND_PORT=3001
```

## 🚀 Deployment

### **Frontend Build**
```bash
cd frontend
npm run build
# Serve the build/ folder
```

### **Backend Build**
```bash
cd backend
npm run build
npm run start:prod
```

### **Docker Production**
```bash
docker-compose up -d
```

---

## 🎯 Development Tips

1. **Start with frontend only** - Uses dummy data, faster setup
2. **Use Docker for full stack** - Handles database setup automatically  
3. **Check browser console** - All drag & drop events are logged
4. **Use React DevTools** - For component state debugging
5. **API docs available** - http://localhost:3001/api/docs when backend running

**Happy coding! 🚀**
