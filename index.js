import puppeteer from "puppeteer";
import fs from "fs/promises";

async function scrapeData() {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 500
    });
    const page = await browser.newPage();
    await page.goto('https://www.utp.edu.pe/web/pregrado/facultad-de-ingenieria/ingenieria-de-sistemas-e-informatica/malla-curricular');

    const data = await page.evaluate(() => {
        // Encuentra todos los divs independientes dentro del div general
        const divs = document.querySelectorAll('.col-content');
        const scrapedData = [];
    
        // Verifica si se encontraron divs
        if (divs.length > 0) {
            divs.forEach((div) => {
                const cicloDiv = div.querySelector('.field-name-ciclo');
                const span = div.querySelector('span');
                const cicloObj = {};
    
                if (cicloDiv) {
                    const ciclo = cicloDiv.querySelector('.loop-index').textContent.trim();
                    cicloObj.ciclo = ciclo;
                }
    
                if (span) {
                    const spanText = span.textContent.trim();
                    cicloObj.spanText = spanText;
                }
    
                const listas = div.querySelectorAll("li")
                if (listas.length > 0) {
                    const listaTextos = [];
    
                    listas.forEach((li) => {
                        const lista = li.textContent.trim();
                        listaTextos.push(lista);
                    });
    
                    cicloObj.listaTextos = listaTextos;
                }
    
                scrapedData.push(cicloObj);
            });
        }
    
        return scrapedData;
    });
    
    await fs.writeFile('data.json', JSON.stringify(data, null, 2));
    console.log("Ciclos encontrados:", data);
    await browser.close();
}

scrapeData();