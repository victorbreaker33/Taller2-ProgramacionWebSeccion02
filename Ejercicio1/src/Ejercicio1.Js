const express = require('express');
const app = express();
const port = 3159;

app.get('/api/calculo/:monto', (req, res) => {
    try {
        const monto = Number(req.params.monto);

        if (isNaN(monto)) {
            return res.status(400).json({ error: 'El salario debe ser un numero mayor a cero' });
        }

        if (monto === 0) {
            return res.status(400).json({ error: 'El salario debe ser un numero mayor a cero' });
        }

        if (monto < 0) {
            return res.status(400).json({ error: 'El salario debe ser un numero mayor a cero' });
        }

        const iva = monto * 0.13;
        const renta = monto * 0.10;

        const resObj = {
            monto: monto,
            iva: iva,
            renta: renta
        };

        res.json(resObj);

    } catch (error) {
        res.status(500).json({ error: 'Ocurrio un error al calcular el IVA y la renta' });
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});