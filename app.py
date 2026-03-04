import os

import psycopg2
from flask import Flask, jsonify


app = Flask(__name__)


def get_connection():
    return psycopg2.connect(
        host=os.getenv("DB_HOST", "db"),
        port=int(os.getenv("DB_PORT", "5432")),
        dbname=os.getenv("DB_NAME", "appdb"),
        user=os.getenv("DB_USER", "appuser"),
        password=os.getenv("DB_PASSWORD", "apppass"),
    )


def ensure_table():
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                CREATE TABLE IF NOT EXISTS visits (
                    id SERIAL PRIMARY KEY,
                    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
                );
                """
            )
            connection.commit()


@app.get("/")
def home():
    return jsonify({"message": "Web service is running"})


@app.get("/db-check")
def db_check():
    ensure_table()

    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute("INSERT INTO visits DEFAULT VALUES;")
            cursor.execute("SELECT COUNT(*) FROM visits;")
            total_rows = cursor.fetchone()[0]
            connection.commit()

    return jsonify(
        {
            "message": "Database is connected and writable",
            "total_rows": total_rows,
        }
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)