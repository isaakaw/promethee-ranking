import sqlite3
import json

DATABASE_NAME = "data.db"

def init_db():
    conn = sqlite3.connect(DATABASE_NAME)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS listas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            valores TEXT NOT NULL
        )
    """)
    conn.commit()
    conn.close()

def inserir_lista(valores):
    conn = sqlite3.connect(DATABASE_NAME)
    cursor = conn.cursor()
    json_valores = json.dumps(valores)
    cursor.execute("INSERT INTO listas (valores) VALUES (?)", (json_valores,))
    conn.commit()
    conn.close()

def buscar_listas(retornar_ids=False):
    conn = sqlite3.connect(DATABASE_NAME)
    cursor = conn.cursor()
    cursor.execute("SELECT id, valores FROM listas ORDER BY id")
    rows = cursor.fetchall()
    conn.close()
    if retornar_ids:
        return [{"id": row[0], "valores": json.loads(row[1])} for row in rows]
    return [json.loads(row[1]) for row in rows]

def apagar_lista(id):
    conn = sqlite3.connect(DATABASE_NAME)
    cursor = conn.cursor()
    cursor.execute("DELETE FROM listas WHERE id = ?", (id,))
    success = cursor.rowcount > 0 
    conn.commit()
    conn.close()
    return success

def apagar_todas_listas():
    conn = sqlite3.connect(DATABASE_NAME)
    cursor = conn.cursor()
    cursor.execute("DELETE FROM listas")
    cursor.execute("DELETE FROM sqlite_sequence WHERE name='listas'")
    conn.commit()
    conn.close()

