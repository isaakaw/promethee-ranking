<p align="right">
  <a href="README-us.md">🇺🇸 English</a> | 
  <a href="README.md">🇧🇷 Português</a>
</p>

# Decision Ranking System (PROMETHEE II)

Sistema web simples para **armazenar e ranquear alternativas usando o método PROMETHEE II**.

O projeto permite adicionar listas de critérios, armazená-las em um banco SQLite e calcular automaticamente o ranking usando o algoritmo de decisão multicritério.

Este site foi feito como segundo teste para o projeto PIBIT no 18º seminário com o tema:

**Ferramentas Baseadas em Agentes Inteligentes de Apoio Decisão para Seleção de Projetos de Negócios Inovadores em Pré-Incubadora**

---

## Tecnologias utilizadas

Backend

* Python
* Flask
* NumPy
* pyDecision

Frontend

* HTML
* CSS
* JavaScript

Banco de dados

* SQLite

---

## Como executar o projeto

### 1. Clonar o repositório

```sh
git clone https://github.com/isaakaw/promethee-ranking
cd seuprojeto
```

### 2. Instalar dependências

```sh
pip install -r requirements.txt
```

### 3. Executar o servidor

```sh
cd backend
python main.py
```

O servidor iniciará em:

```sh
http://127.0.0.1:5000
```

### 4. Abrir o frontend

Abra o arquivo:

```sh
index.html
```

no navegador.

### Como usar

1. Abra o arquivo `index.html` no navegador
2. Insira os valores dos 5 critérios no formulário
3. Clique em "Adicionar" para incluir uma nova alternativa
4. Clique em "Calcular Ranking" para ver os resultados

   Obs.: precisa ter no min duas alternativas para calcular o ranking

---

## Endpoints da API

### Adicionar lista

POST `/add`

Adiciona uma nova alternativa contendo **5 critérios numéricos**.

`Body (JSON)`

```json
[1, 2, 3, 4, 5]
```

---

### Obter ranking

GET `/rank`

Retorna ranking calculado pelo PROMETHEE II.

---

### Listar dados

GET `/listas`

---

### Remover item

DELETE `/delete/{id}`

---

### Remover todos

DELETE `/delete_all`

---

## Método de decisão

O ranking é calculado usando o método:

**PROMETHEE II (Preference Ranking Organization Method for Enrichment Evaluation)**

Parâmetros usados:

```
Q = [0.07, 0.13, 0.1, 0.2, 0.33]
P = [0.2, 0.4, 0.3, 0.4, 1]
S = [0.35, 0.33, 0.33, 0.5, 0.33]
W = [4.00, 1.50, 1.00, 1.00, 1.50]
```

---

## 📄 Licença

MIT License

---

## 📬 Contato

Para dúvidas, sugestões ou contribuições, entre em contato ou abra uma issue no repositório.

**Desenvolvido com 💙 para apoiar tomadas de decisão mais estruturadas e transparentes.**
