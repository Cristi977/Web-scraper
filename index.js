import https from 'https';
import * as cheerio from 'cheerio'; // Importăm Cheerio pentru parsare HTML
import fs from 'fs'; // Importăm modulul File System

//am incercat sa stochez chunkurile in o coada, dar am renuntat la idee pentru ca
//functiile cheerio lucreaza cu tot corpul paginii, nu doar cu un chunkuri succesive

function parcCheerio(root, stream, nivel = 0) {
    const indentare = '  '.repeat(nivel); // Creăm indentarea în funcție de nivel
    if (!root) return; // Verificăm dacă documentul este valid
    if (root.type === 'tag') {
        stream.write(`${indentare}<${root.name}>\n`); // Scriem numele tag-ului în fișier
    } else if (root.type === 'text') {
        stream.write(`${indentare}${root.data.trim()}\n`); // Scriem textul în fișier
    }

    if (root.children && Array.isArray(root.children)) {
        root.children.forEach(child => {
            parcCheerio(child, stream, nivel + 1); // Apelăm recursiv pentru fiecare copil, incrementând nivelul
        });
    }
}

const options = {
  hostname: 'boitorcristian.netlify.app',
  port: 443,
  path: '',
  method: 'GET',
  headers: { 'User-Agent': 'Mozilla/5.0' }
};

const req = https.get(options, (res) => {
  res.setEncoding('utf8');
  let corpulPaginii = "";
  // 2. Când primim un chunk, îl scriem IMEDIAT în fișier
  res.on('data', (chunk) => {
    corpulPaginii += chunk; // Adăugăm chunk-ul la corpul paginii
  });

  res.on('end', () => {
    const stream = fs.createWriteStream('arbore.txt'); // Deschidem fișierul în modul "append" pentru a adăuga conținut fără a șterge ce e deja acolo
    const $ = cheerio.load(corpulPaginii);
    parcCheerio($.root()[0], stream); // Apelăm funcția de parcurgere a arborelui cu corpul paginii și fișierul de scriere
    stream.end(); // Închidem stream-ul după ce am terminat de scris
  });
});

req.on('error', (err) => {
  console.error("Eroare:", err.message);
});

req.end();