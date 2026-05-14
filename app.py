from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
import mysql.connector
from werkzeug.security import generate_password_hash, check_password_hash
import os

app = Flask(__name__)
CORS(app)

db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'Katakuhika337',
    'database': 'lol_project'
}

def get_db_connection():
    return mysql.connector.connect(**db_config)

# --- МАРШРУТЫ ДЛЯ ОТОБРАЖЕНИЯ СТРАНИЦ ---

@app.route('/')
def index():
    return render_template('glavnaia.html')

@app.route('/characters')
def characters_page():
    return render_template('Characters.html')

@app.route('/register')
def reg_page():
    return render_template('Reg.html')

@app.route('/login')
def login_page():
    return render_template('login.html')

@app.route('/tierlist')
def tierlist_page():
    return render_template('tierlist.html')

@app.route('/maps')
def maps_page():
    return render_template('Maps.html')

@app.route('/stats')
def stats_page():
    return render_template('Stats.html')


@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    hashed_password = generate_password_hash(password)

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO users (username, email, password) VALUES (%s, %s, %s)", 
                       (username, email, hashed_password))
        user_id = cursor.lastrowid
        cursor.execute("INSERT INTO user_stats (user_id) VALUES (%s)", (user_id,))
        conn.commit()
        return jsonify({"message": "Success"}), 201
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    finally:
        if 'conn' in locals(): conn.close()

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    user = cursor.fetchone()
    conn.close()

    if user and check_password_hash(user['password'], password):
        return jsonify({"message": "OK"}), 200
    return jsonify({"message": "Error"}), 401

@app.route('/api/stats/<username>')
def get_stats(username):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    query = "SELECT s.* FROM user_stats s JOIN users u ON s.user_id = u.id WHERE u.username = %s"
    cursor.execute(query, (username,))
    stats = cursor.fetchone()
    conn.close()
    return jsonify(stats) if stats else ({}, 404)

if __name__ == '__main__':
    app.run(port=5000, debug=True)