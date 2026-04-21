# 🏫 Shakti Education Trust — Educational Platform

A full-stack educational platform with Django REST backend and React frontend, featuring IIT-JEE / NEET UG coaching content, enquiry management, scholarship registration, blog, and more.

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
│   ├── blog/              # Blog posts (exam tips, career guidance, news)
│   ├── courses/           # Course listings (IIT-JEE, NEET, Foundation)
│   ├── enquiries/         # Enquiry forms + Counselling appointment booking
│   ├── requirements.txt
│   ├── manage.py
│   └── build.sh           # Render build script
│
└── frontend/              # React + Vite
    ├── src/
    │   ├── auth/          # JWT AuthContext
    │   ├── services/      # Axios API service layer
    │   ├── components/    # Navbar, Footer, WhatsAppButton, Sidebar, Modal
    │   └── pages/         # Home, About, Courses, Scholarship, Blog, Contact, Faculty, Gallery, Admin pages
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── vercel.json
```

---

## 🌐 Public Pages

| Route | Description |
|-------|-------------|
| `/` | Home — Hero, courses overview, results, testimonials, quick enquiry |
| `/about` | About Us — Trust intro, vision/mission, leadership, infrastructure |
| `/courses` | Courses — IIT-JEE, NEET UG, Foundation, Scholarship Prep |
| `/scholarship` | Scholarship Exam — SETSE overview, syllabus, registration form |
| `/faculty` | Faculty — Profiles, qualifications, expertise |
| `/gallery` | Gallery — Classroom activities, events, achievements |
| `/blog` | Blog — Exam tips, career guidance, news & announcements |
| `/contact` | Contact & Counselling — Maps, enquiry form, appointment booking |

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
python manage.py makemigrations
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
# Set VITE_WHATSAPP_NUMBER=91XXXXXXXXXX

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
| GET | `/api/blog/` | None | List published blog posts |
| POST | `/api/blog/` | Admin JWT | Create blog post |
| GET | `/api/courses/` | None | List active courses |
| POST | `/api/courses/` | Admin JWT | Create course |
| POST | `/api/contact/enquiries/` | None | Submit enquiry |
| GET | `/api/contact/enquiries/` | Admin JWT | List all enquiries |
| POST | `/api/contact/appointments/` | None | Book counselling appointment |
| GET | `/api/contact/appointments/` | Admin JWT | List all appointments |

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
   - `VITE_WHATSAPP_NUMBER` = your WhatsApp number (country code + number, no +)
6. Deploy!

---

## 🔒 Security Notes

- JWT access tokens expire after **8 hours** (configurable in settings)
- Razorpay payments verified via **HMAC-SHA256 signature** on backend
- Overpayment is **blocked** at both API and DB level
- All admin routes are **JWT-protected**
- CORS is restricted to your frontend domain only
- Secrets stored in **environment variables**, never in code
- Enquiry / Appointment endpoints are public (POST only); listing requires authentication

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
