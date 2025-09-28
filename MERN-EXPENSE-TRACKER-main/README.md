# 💰 MERN Expense Tracker

A full-stack expense tracking application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) with Indian Rupee (₹) currency support.

![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-22.15.1-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)

## ✨ Features

- 🔐 **User Authentication** - JWT-based login/register system
- 💰 **Expense Management** - Add, edit, delete expenses and income
- 📊 **Category Management** - Custom categories with colors and icons
- 📈 **Dashboard Analytics** - Real-time statistics and visualizations
- 📱 **Responsive Design** - Mobile-friendly interface
- 🇮🇳 **Indian Currency** - Full support for Indian Rupees (₹)
- 📊 **Charts & Graphs** - Pie charts and bar charts for expense analysis
- 🔍 **Search & Filter** - Find transactions easily
- 🌙 **Modern UI** - Clean and intuitive interface with Tailwind CSS

## 🚀 Live Demo

- **Frontend**: [http://localhost:3001](http://localhost:3001)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI framework
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling framework
- **Recharts** - Data visualization
- **Lucide React** - Icon library
- **Axios** - HTTP client
- **Date-fns** - Date manipulation

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Bcryptjs** - Password hashing
- **Express Validator** - Input validation
- **CORS** - Cross-origin resource sharing

### Development Tools
- **Nodemon** - Auto-restart server
- **Concurrently** - Run multiple commands

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Install Dependencies
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
npm run install-client
```

### Environment Setup
Create a `.env` file in the root directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

### Database Setup
1. Create a MongoDB database (local or Atlas)
2. Update the `MONGODB_URI` in your `.env` file
3. The app will automatically create collections

## 🚀 Running the Application

### Development Mode
```bash
# Run both frontend and backend
npm run dev

# Or run separately:
npm run server    # Backend only
npm run client    # Frontend only
```

### Production Mode
```bash
# Build frontend
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
mern-expense-tracker/
├── backend/
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Category.js
│   │   ├── Expense.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── categories.js
│   │   └── expenses.js
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js
│   │   │   ├── ExpenseForm.js
│   │   │   ├── ExpenseList.js
│   │   │   ├── Header.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── Statistics.js
│   │   ├── utils/
│   │   │   └── currency.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── tailwind.config.js
├── package.json
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Expenses
- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create new category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

## 💰 Currency Features

- **Indian Rupee Support**: All amounts displayed in ₹
- **Proper Formatting**: Uses Indian number system (lakhs, crores)
- **Currency Conversion**: Utility functions for USD to INR conversion
- **Localized Display**: en-IN locale for proper formatting

## 🎨 UI Components

- **Dashboard**: Overview with summary cards and recent transactions
- **Expense Form**: Add/edit expenses with category selection
- **Expense List**: View all transactions with search and filter
- **Statistics**: Charts and analytics for expense tracking
- **Category Management**: Custom categories with colors and icons

## 🔐 Authentication Flow

1. User registers with email and password
2. JWT token is generated and stored
3. Token is sent with each API request
4. Protected routes verify token validity
5. User-specific data is isolated

## 📊 Data Models

### User
- name, email, password
- currency (default: INR)
- avatar, timezone

### Expense
- title, amount, category
- date, description, type (income/expense)
- user reference

### Category
- name, color, icon
- user reference

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Arjav**
- GitHub: [@Arjavv](https://github.com/Arjavv)
- LinkedIn: [Arjav Dariya](https://www.linkedin.com/in/arjavdariya)

## 🙏 Acknowledgments

- [React.js](https://reactjs.org/) - Frontend framework
- [Express.js](https://expressjs.com/) - Backend framework
- [MongoDB](https://mongodb.com/) - Database
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Recharts](https://recharts.org/) - Charts library

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact me directly.

---

⭐ **Star this repository if you found it helpful!** 