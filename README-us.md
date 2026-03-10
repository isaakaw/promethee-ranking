<p align="right">
  <a href="README-us.md">🇺🇸 English</a> | 
  <a href="README.md">🇧🇷 Português</a>
</p>

# Decision Ranking System (PROMETHEE II)

Simple web system for **storing and ranking alternatives using the PROMETHEE II method**.

The project allows adding criteria lists, storing them in a SQLite database, and automatically calculating the ranking using the multi-criteria decision algorithm.

This website was created as a second test for the PIBIT project at the 18th seminar with the theme:

**Intelligent Agent-Based Decision Support Tools for Selecting Innovative Business Projects in Pre-Incubators**

---

## Technologies Used

Backend
* Python
* Flask
* NumPy
* pyDecision

Frontend
* HTML
* CSS
* JavaScript

Database
* SQLite

## How to Run the Project

### 1. Clone the repository
```sh
git clone https://github.com/yourusername/yourproject.git
cd yourproject
```
### 2. Install dependencies
```sh
pip install -r requirements.txt
```

### 3. Run the server
```sh
cd backend
python main.py
```
The server will start at:
```sh
http://127.0.0.1:5000
```
### 4. Open the frontend
Open the file:
```sh
index.html
```
in your browser.

### How to Use
1. Open the `index.html` file in your browser
2. Enter the values for the 5 criteria in the form
3. Click "Adicionar Alternativa" to include a new alternative
4. Click "Calcular Ranking" to see the results

   Note: You need at least two alternatives to calculate the ranking

--- 
## API Endpoints

### Add List
POST `/add`

Adds a new alternative containing **5 numerical criteria**.

`Body (JSON)`

```json
[1, 2, 3, 4, 5]
```
### Get Ranking
GET `/rank`

Returns the ranking calculated by PROMETHEE II.

### List Data
GET `/listas`

### Delete Item
DELETE `/delete/{id}`

### Delete All
DELETE `/delete_all`

---
## Decision Method
The ranking is calculated using the method:

**PROMETHEE II (Preference Ranking Organization Method for Enrichment Evaluation)**

Parameters used:
```text
Q = [0.07, 0.13, 0.1, 0.2, 0.33]
P = [0.2, 0.4, 0.3, 0.4, 1]
S = [0.35, 0.33, 0.33, 0.5, 0.33]
W = [4.00, 1.50, 1.00, 1.00, 1.50]
```
---
## 📄 License
MIT License

---
## 📬 Contact
For questions, suggestions, or contributions, please get in touch or open an issue in the repository.

Developed with 💙 to support more structured and transparent decision-making.