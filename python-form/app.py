#!/usr/bin/env python3
"""
SiteCraft Free Trial Form - Python Flask Version
Simple form handling with Flask
"""

from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
import json
import os
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'sitecraft-demo-key-change-in-production'

# Data storage (in production, use a proper database)
DATA_FILE = 'trial_submissions.json'

def load_submissions():
    """Load existing submissions from JSON file"""
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as f:
            return json.load(f)
    return []

def save_submission(data):
    """Save new submission to JSON file"""
    submissions = load_submissions()
    data['submitted_at'] = datetime.now().isoformat()
    data['id'] = len(submissions) + 1
    submissions.append(data)
    
    with open(DATA_FILE, 'w') as f:
        json.dump(submissions, f, indent=2)

@app.route('/')
def index():
    """Main form page"""
    return render_template('form.html')

@app.route('/submit', methods=['POST'])
def submit_form():
    """Handle form submission"""
    try:
        # Get form data
        form_data = {
            'name': request.form.get('name', '').strip(),
            'email': request.form.get('email', '').strip(),
            'company': request.form.get('company', '').strip(),
            'website_type': request.form.get('websiteType', ''),
            'tech_preference': request.form.get('techPreference', ''),
            'features': request.form.getlist('features'),
            'description': request.form.get('description', '').strip()
        }
        
        # Basic validation
        if not form_data['name'] or not form_data['email']:
            flash('Name and email are required!', 'error')
            return redirect(url_for('index'))
        
        if not form_data['website_type'] or not form_data['tech_preference']:
            flash('Please select website type and technology preference!', 'error')
            return redirect(url_for('index'))
        
        # Save submission
        save_submission(form_data)
        
        flash('Free trial activated successfully!', 'success')
        return redirect(url_for('success', email=form_data['email']))
        
    except Exception as e:
        flash(f'Error processing form: {str(e)}', 'error')
        return redirect(url_for('index'))

@app.route('/success')
def success():
    """Success page after form submission"""
    email = request.args.get('email', '')
    return render_template('success.html', email=email)

@app.route('/api/submissions')
def api_submissions():
    """API endpoint to view all submissions (for demo purposes)"""
    submissions = load_submissions()
    return jsonify(submissions)

@app.route('/admin')
def admin():
    """Simple admin page to view submissions"""
    submissions = load_submissions()
    return render_template('admin.html', submissions=submissions)

if __name__ == '__main__':
    # Create templates directory if it doesn't exist
    os.makedirs('templates', exist_ok=True)
    
    print("SiteCraft Free Trial Form - Python Flask Version")
    print("Visit: http://localhost:5000")
    print("Admin: http://localhost:5000/admin")
    print("API: http://localhost:5000/api/submissions")
    
    app.run(debug=True, host='0.0.0.0', port=5000)