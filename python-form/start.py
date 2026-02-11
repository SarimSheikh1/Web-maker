#!/usr/bin/env python3
"""
WebCraft Studio Free Trial Form - Startup Script
Quick setup and launch script for the Python Flask version
"""

import os
import sys
import subprocess
import json
from pathlib import Path

def check_python_version():
    """Check if Python version is compatible"""
    if sys.version_info < (3, 7):
        print("❌ Python 3.7 or higher is required")
        print(f"Current version: {sys.version}")
        return False
    print(f"✅ Python {sys.version.split()[0]} detected")
    return True

def install_dependencies():
    """Install required dependencies"""
    print("📦 Installing dependencies...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✅ Dependencies installed successfully")
        return True
    except subprocess.CalledProcessError:
        print("❌ Failed to install dependencies")
        return False

def create_sample_data():
    """Create sample data for demonstration"""
    sample_data = [
        {
            "id": 1,
            "name": "John Doe",
            "email": "john@example.com",
            "company": "Demo Company",
            "website_type": "business",
            "tech_preference": "python",
            "features": ["Contact Forms", "SEO Optimization", "Analytics"],
            "description": "Need a professional business website with contact forms and SEO optimization.",
            "submitted_at": "2024-02-03T10:30:00"
        },
        {
            "id": 2,
            "name": "Jane Smith",
            "email": "jane@portfolio.com",
            "company": "",
            "website_type": "portfolio",
            "tech_preference": "javascript",
            "features": ["Image Gallery", "Blog/News", "Social Media Integration"],
            "description": "Creating a portfolio website to showcase my design work.",
            "submitted_at": "2024-02-03T11:15:00"
        },
        {
            "id": 3,
            "name": "Mike Johnson",
            "email": "mike@restaurant.com",
            "company": "Mike's Bistro",
            "website_type": "restaurant",
            "tech_preference": "visual",
            "features": ["Contact Forms", "Image Gallery", "Multi-language"],
            "description": "Restaurant website with menu display and online reservations.",
            "submitted_at": "2024-02-03T12:00:00"
        }
    ]
    
    data_file = "trial_submissions.json"
    if not os.path.exists(data_file):
        with open(data_file, 'w') as f:
            json.dump(sample_data, f, indent=2)
        print(f"✅ Sample data created in {data_file}")
    else:
        print(f"📄 Data file {data_file} already exists")

def print_banner():
    """Print startup banner"""
    banner = """
    ╔══════════════════════════════════════════════════════════════╗
    ║                    WebCraft Studio                           ║
    ║                Free Trial Form - Python Flask               ║
    ║                                                              ║
    ║  🚀 Starting up the free trial registration system...       ║
    ╚══════════════════════════════════════════════════════════════╝
    """
    print(banner)

def print_success_info():
    """Print success information and URLs"""
    info = """
    ✅ WebCraft Studio Free Trial Form is now running!
    
    📍 Access URLs:
    ┌─────────────────────────────────────────────────────────────┐
    │  Main Form:        http://localhost:5000                    │
    │  Admin Dashboard:  http://localhost:5000/admin              │
    │  API Endpoint:     http://localhost:5000/api/submissions    │
    │  Success Page:     http://localhost:5000/success            │
    └─────────────────────────────────────────────────────────────┘
    
    🎯 Features Available:
    • Interactive form with validation
    • Multiple technology stack options
    • Feature selection checkboxes
    • Admin dashboard with statistics
    • JSON API for data access
    • Sample data pre-loaded
    
    🛠️ Tech Stack:
    • Python Flask web framework
    • Jinja2 templating engine
    • JSON file storage
    • Responsive CSS design
    
    📊 Sample Data:
    • 3 demo submissions loaded
    • Various website types and tech preferences
    • Ready for testing and demonstration
    
    🔧 Development:
    • Debug mode enabled
    • Auto-reload on file changes
    • Detailed error messages
    
    Press Ctrl+C to stop the server
    """
    print(info)

def main():
    """Main startup function"""
    print_banner()
    
    # Check Python version
    if not check_python_version():
        sys.exit(1)
    
    # Install dependencies
    if not install_dependencies():
        sys.exit(1)
    
    # Create sample data
    create_sample_data()
    
    # Print success info
    print_success_info()
    
    # Start the Flask application
    try:
        from app import app
        app.run(debug=True, host='0.0.0.0', port=5000)
    except ImportError:
        print("❌ Failed to import Flask app")
        print("Make sure app.py is in the current directory")
        sys.exit(1)
    except KeyboardInterrupt:
        print("\n\n👋 WebCraft Studio Free Trial Form stopped")
        print("Thank you for using WebCraft Studio!")
    except Exception as e:
        print(f"❌ Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()