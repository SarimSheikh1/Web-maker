# WebCraft Studio - Free Trial Form (Python Flask Version)

A complete free trial registration system built with Python Flask, featuring form handling, validation, and data storage.

## 🚀 Features

- **Interactive Form**: Beautiful, responsive form with validation
- **Multiple Tech Stacks**: Support for Visual Builder, HTML/CSS, JavaScript, Python, React, PHP, WordPress
- **Feature Selection**: Checkbox grid for selecting website features
- **Data Storage**: JSON file storage (easily replaceable with database)
- **Admin Dashboard**: View all submissions with statistics
- **Success Page**: Confirmation page after form submission
- **API Endpoint**: JSON API for accessing submission data

## 📋 Requirements

- Python 3.7+
- Flask 2.3.3+
- Werkzeug 2.3.7+

## 🛠️ Installation

1. **Clone or download the python-form directory**

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the application:**
   ```bash
   python app.py
   ```

4. **Access the application:**
   - Main Form: http://localhost:5000
   - Admin Dashboard: http://localhost:5000/admin
   - API Endpoint: http://localhost:5000/api/submissions

## 📁 Project Structure

```
python-form/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── templates/            # HTML templates
│   ├── form.html         # Main form page
│   ├── success.html      # Success confirmation page
│   └── admin.html        # Admin dashboard
├── trial_submissions.json # Data storage (auto-created)
└── README.md             # This file
```

## 🎯 Usage

### 1. Fill Out the Form
- Enter personal information (name, email, company)
- Select website type (business, portfolio, e-commerce, etc.)
- Choose technology stack preference
- Select needed features from the checkbox grid
- Add project description

### 2. Form Validation
- Required fields: Name, Email, Website Type, Technology Stack
- Email format validation
- Real-time error messages

### 3. Data Storage
- Form submissions are stored in `trial_submissions.json`
- Each submission includes timestamp and unique ID
- Easy to migrate to database (PostgreSQL, MySQL, etc.)

### 4. Admin Dashboard
- View all submissions in a table format
- Statistics cards showing submission counts
- Filter by technology preference and website type
- Export data via JSON API

## 🔧 Customization

### Database Integration
Replace JSON storage with database:

```python
# Example with SQLAlchemy
from flask_sqlalchemy import SQLAlchemy

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://user:pass@localhost/webcraft'
db = SQLAlchemy(app)

class TrialSubmission(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    # ... other fields
```

### Email Integration
Add email confirmation:

```python
from flask_mail import Mail, Message

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
mail = Mail(app)

def send_confirmation_email(email, name):
    msg = Message('Welcome to WebCraft Studio!', 
                  sender='noreply@webcraftstudio.com',
                  recipients=[email])
    msg.body = f'Hi {name}, your free trial has been activated!'
    mail.send(msg)
```

### Authentication
Add admin authentication:

```python
from flask_login import LoginManager, login_required

@app.route('/admin')
@login_required
def admin():
    # Admin dashboard code
```

## 🎨 Styling

The form includes:
- **Responsive Design**: Works on all device sizes
- **Gradient Backgrounds**: Beautiful color schemes
- **Animations**: Smooth transitions and hover effects
- **Interactive Elements**: Hover states and focus indicators
- **Grid Layouts**: Organized checkbox and form sections

## 📊 API Endpoints

### GET /api/submissions
Returns all form submissions in JSON format:

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "company": "Demo Company",
    "website_type": "business",
    "tech_preference": "python",
    "features": ["Contact Forms", "SEO Optimization"],
    "description": "Need a business website",
    "submitted_at": "2024-02-03T10:30:00"
  }
]
```

### POST /submit
Accepts form data and creates new submission:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "websiteType": "business",
  "techPreference": "python",
  "features": ["Contact Forms"],
  "description": "Project description"
}
```

## 🚀 Deployment

### Local Development
```bash
python app.py
```

### Production (Gunicorn)
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Docker
```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
```

## 🔒 Security Considerations

For production deployment:

1. **Change Secret Key**: Use a secure random secret key
2. **Add CSRF Protection**: Use Flask-WTF for CSRF tokens
3. **Input Validation**: Sanitize all user inputs
4. **Rate Limiting**: Implement rate limiting for form submissions
5. **HTTPS**: Use SSL/TLS encryption
6. **Database Security**: Use parameterized queries

## 📈 Analytics

Track form submissions:
- Conversion rates by traffic source
- Popular technology stack choices
- Feature request patterns
- Geographic distribution

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is part of WebCraft Studio and is available for educational and commercial use.

## 🆘 Support

For support and questions:
- Check the admin dashboard at `/admin`
- Review the API documentation above
- Submit issues through the main WebCraft Studio repository

---

**WebCraft Studio** - The ultimate website builder for creators, businesses, and developers.