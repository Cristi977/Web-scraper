# 🌐 HTML Recursive Scraper & Parser

![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)
![Library](https://img.shields.io/badge/Library-Cheerio-orange.svg)
![Course](https://img.shields.io/badge/Proiect-Laborator_Algoritmi-blue.svg)

Proiect realizat pentru disciplina **Proiectarea Algoritmilor**, axat pe procesarea structurilor de date ierarhice (arbori) și gestionarea fluxurilor de date asincrone.

---

## 📝 Descriere
Acest utilitar realizează o interogare HTTPS către un URL specificat, preia structura paginii sub formă de stream de date și reconstruiește documentul într-un obiect DOM (Document Object Model). Punctul central al proiectului este implementarea unui **algoritm de parcurgere recursivă** care mapează ierarhia de tag-uri și conținutul text într-un fișier extern structurat.

## 🚀 Caracteristici Tehnice

* **Asynchronous Data Handling:** Colectarea fragmentelor de date (chunks) prin evenimentele `data` și `end` ale protocolului HTTPS.
* **DOM Parsing:** Utilizarea bibliotecii `Cheerio` pentru transformarea string-ului HTML brut într-o structură de date ierarhică (Arbore Multicăi).
* **Algoritm DFS (Depth-First Search):** Implementarea unei funcții recursive care explorează fiecare nod, gestionând indentarea vizuală în funcție de adâncimea acestuia în arbore.
* **Data Cleaning:** Utilizarea metodei `.trim()` pentru eliminarea zgomotului (spații goale și caractere newline) din nodurile de tip text.
* **File Stream Persistence:** Scrierea rezultatului folosind `fs.createWriteStream`, optimizând consumul de memorie pentru documente HTML de dimensiuni mari.

---

## 🏗️ Logica Algoritmică

Algoritmul urmează o strategie de explorare **Pre-Order Traversal**:

1.  **Vizitare:** Se extrage numele tag-ului (`root.name`) și tipul acestuia (`root.type`).
2.  **Procesare Text:** Dacă nodul este de tip `text`, se curăță conținutul și se salvează dacă acesta nu este vid.
3.  **Recursivitate:** Dacă nodul curent posedă proprietatea `children`, funcția se auto-
