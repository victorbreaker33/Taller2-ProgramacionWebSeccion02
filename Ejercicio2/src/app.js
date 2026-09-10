const express = require('express');
const app = express();
const port = 3158;

const tarifas = {
    elsalvador: 1.50,
    guatemala: 2.00,
    honduras: 2.25,
    nicaragua: 2.50,
    costarica: 3.00,
    panama: 3.50
};

app.get('/api/envio/:pais/:peso', (req, res) => {
    try {
        const pais = req.params.pais.toLowerCase();
        const peso = Number(req.params.peso);

        if (!tarifas.hasOwnProperty(pais)) {
            return res.status(400).json({ error: 'Pais no valido. Paises permitidos: elsalvador, guatemala, honduras, nicaragua, costarica, panama' });
        }

        if (isNaN(peso) || peso <= 0) {
            return res.status(400).json({ error: 'Peso no valido' });
        }

        const tarifaPorKg = tarifas[pais];
        const costoBase = peso * tarifaPorKg;

        let descuento = 0;
        let recargo = 0;

        if (peso > 20) {
            descuento = costoBase * 0.10;
        }

        if (peso < 1) {
            recargo = 5.00;
        }

        const total = costoBase - descuento + recargo;

        const resObj = {
            pais: pais,
            peso: peso,
            tarifaPorKg: tarifaPorKg,
            costoBase: costoBase,
            descuento: descuento,
            recargo: recargo,
            total: total
        };

        res.json(resObj);

    } catch (error) {
        res.status(500).json({ error: 'Ocurrio un error al calcular el envio' });
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
