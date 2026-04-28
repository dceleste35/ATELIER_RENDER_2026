from flask import Flask
from flask_cors import CORS
import os
import psycopg2

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Flask + Docker + GHCR + Terraform + Render"

@app.route("/info")
def info():
    return {
        "app": "Flask Render",
        "student": "dceleste",
        "version": "v1"
    }

@app.route("/health")
def health():
    return {"status": "Tout est ok ou pas"}

@app.route("/env")
def env():
    return {"env": os.getenv("ENV")}

@app.route("/db")
def db():
    url = os.getenv("DATABASE_URL")
    if not url:
        return {"ok": False, "error": "DATABASE_URL not set"}, 500
    try:
        conn = psycopg2.connect(url)
        cur = conn.cursor()
        cur.execute("SELECT version();")
        version = cur.fetchone()[0]
        cur.close()
        conn.close()
        return {"ok": True, "version": version}
    except Exception as e:
        return {"ok": False, "error": str(e)}, 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)
