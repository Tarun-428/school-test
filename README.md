# 🏫 Canadian Bilingual School — Management App

A full-stack school management system with Django REST backend and React frontend.

## Tech Stack
- **Backend:** Django 4.2 + Django REST Framework + PostgreSQL
- **Frontend:** React 18 + Vite + Tailwind CSS
- **Images:** Cloudinary
- **Payments:** Razorpay
- **Deploy:** Backend → Render | Frontend → Vercel

---

## 📁 Project Structure

```
school-app/
├── backend/               # Django project
│   ├── school_backend/    # Settings, main URLs, WSGI
│   ├── students/          # Student CRUD + public search
│   ├── faculty/           # Faculty CRUD
│   ├── payments/          # Razorpay order + verify
│   ├── gallery/           # Cloudinary image gallery
│   ├── requirements.txt
│   ├── manage.py
│   └── build.sh           # Render build script
│
└── frontend/              # React + Vite
    ├── src/
    │   ├── auth/          # JWT AuthContext
    │   ├── services/      # Axios API service layer
    │   ├── components/    # Navbar, Footer, Sidebar, Modal, Layout
    │   └── pages/         # Home, FeePayment, Admin pages
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── vercel.json
```

---

## 🚀 Local Development

### 1. Backend Setup

```bash
cd backend

# Create & activate virtual environment
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy and fill environment variables
cp .env.example .env
# Edit .env with your actual credentials

# Create superuser for admin panel
python manage.py createsuperuser

# Run migrations and start server
python manage.py makemigrations students faculty payments gallery
python manage.py migrate
python manage.py runserver
```

Backend runs at: `http://localhost:8000`

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Copy and fill environment variables
cp .env.example .env
# Set VITE_API_URL=http://localhost:8000

# Start dev server
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## 🔑 API Endpoints

| Method | URL | Auth | Description |
|--------|-----|------|-------------|
| POST | `/api/auth/login/` | None | Get JWT token |
| POST | `/api/auth/refresh/` | None | Refresh token |
| GET | `/api/students/search/?student_id=CBS001` | None | Parent fee lookup |
| GET/POST | `/api/students/` | Admin JWT | List / Create students |
| GET/PATCH/DELETE | `/api/students/{id}/` | Admin JWT | Read / Update / Delete |
| GET/POST | `/api/faculty/` | GET=None, POST=JWT | Faculty list / Create |
| GET/POST | `/api/gallery/` | GET=None, POST=JWT | Gallery list / Upload |
| POST | `/api/payments/create-order/` | None | Create Razorpay order |
| POST | `/api/payments/verify/` | None | Verify payment signature |
| GET | `/api/payments/transactions/` | Admin JWT | All transactions |

---

## ☁️ Deploy to Render (Backend)

1. Push backend folder to GitHub
2. Go to [render.com](https://render.com) → **New Web Service**
3. Connect your GitHub repo
4. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `./build.sh`
   - **Start Command:** `gunicorn school_backend.wsgi:application`
   - **Environment:** Python 3
5. Add **PostgreSQL** database from Render dashboard
6. Set all environment variables from `.env.example`
7. Set `ALLOWED_HOSTS` to your Render URL
8. Deploy!

---

## 🌐 Deploy to Vercel (Frontend)

1. Push frontend folder to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your frontend repo
4. Vercel auto-detects Vite — no build config needed
5. Add environment variables:
   - `VITE_API_URL` = your Render backend URL
   - `VITE_RAZORPAY_KEY_ID` = your Razorpay public key
6. Deploy!

---

## 🔒 Security Notes

- JWT access tokens expire after **8 hours** (configurable in settings)
- Razorpay payments verified via **HMAC-SHA256 signature** on backend
- Overpayment is **blocked** at both API and DB level
- All admin routes are **JWT-protected**
- CORS is restricted to your frontend domain only
- Secrets stored in **environment variables**, never in code

---

## 📦 Cloudinary Setup

1. Create free account at [cloudinary.com](https://cloudinary.com)
2. Go to Dashboard → copy Cloud Name, API Key, API Secret
3. Add to backend `.env`

## 💳 Razorpay Setup

1. Create account at [razorpay.com](https://razorpay.com)
2. Dashboard → Settings → API Keys → Generate
3. Add Key ID to both frontend and backend `.env`
4. Add Key Secret to backend `.env` **only**

---

## 🧪 Test Payments (Razorpay Test Mode)

Use test card: `4111 1111 1111 1111` | Expiry: any future | CVV: any 3 digits

Or UPI: `success@razorpay`
