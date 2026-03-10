from flask import Flask, request, jsonify
from flask_cors import CORS
from database import init_db, inserir_lista, buscar_listas, apagar_lista, apagar_todas_listas
import numpy as np
from pyDecision.algorithm import promethee_ii

init_db()

# Config PROMETHEE II
Q = [0.07, 0.13, 0.1, 0.2, 0.33]
P = [0.2, 0.4, 0.3, 0.4, 1]
S = [0.35, 0.33, 0.33, 0.5, 0.33]
W = [4.00, 1.50, 1.00, 1.00, 1.50]
F = ['t5', 't5', 't5', 't5', 't5']

app = Flask(__name__)
CORS(app)

@app.route('/add', methods=['POST'])
def add():
    data = request.json
    if not isinstance(data, list) or len(data) != 5:
        return jsonify({"error": "A lista deve conter exatamente 5 números."}), 400
    try:
        [float(i) for i in data]
    except (ValueError, TypeError):
        return jsonify({"error": "Todos os valores devem ser numéricos."}), 400
        
    inserir_lista(data)
    return jsonify({"message": "Lista salva com sucesso!"}), 201 

@app.route('/rank', methods=['GET'])
def rank():
    try:
        data = buscar_listas()
        if not data:
            return jsonify({"error": "Sem dados para calcular o ranking."}), 400

        dataset = np.array(data)
        ranking = promethee_ii(dataset, W=W, Q=Q, S=S, P=P, F=F, sort=True, topn=10, graph=False, verbose=False)
        return jsonify(ranking.tolist())
    except Exception as e:
        return jsonify({"error": f"Erro no cálculo do ranking: {e}"}), 500

@app.route('/listas', methods=['GET'])
def listar():
    data = buscar_listas(retornar_ids=True)
    return jsonify(data)


@app.route('/delete/<int:id>', methods=['DELETE'])
def delete(id):
    try:
        if apagar_lista(id):
            return jsonify({"message": "Lista removida"}), 200
        else:
            return jsonify({"error": "ID não encontrado"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/delete_all', methods=['DELETE'])
def delete_all():
    try:
        apagar_todas_listas()
        return jsonify({"message": "Todas as listas foram removidas"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)