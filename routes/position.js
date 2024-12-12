/**
 *  @swagger
 *      /position/insert:
 *      post:
 *          summary: Insertar una posición en la bdd
 *          requestBody:
 *              description: Mensaje parseado
 *              required: true
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          properties:
 *                              patente:
 *                                  type: string
 *                              fecha_hora:
 *                                  type: string
 *                              latitud:
 *                                  type: string
 *                              longitud:
 *                                  type: string
 *                              direccion:
 *                                  type: string
 *                              velocidad:
 *                                  type: string
 *                              estado_registro:
 *                                  type: string
 *                              numero_evento:
 *                                  type: string
 *                              odometro:
 *                                  type: string
 *                              numero_satelites:
 *                                  type: string
 *                              hdop:
 *                                  type: string
 *                              edad_dato:
 *                                  type: string
 *                              rut_conductor:
 *                                  type: string
 *                              nombre_conductor:
 *                                  type: string
 *                              opcional_1:
 *                                  type: string
 *          responses:
 *              200:
 *                  description: A successful response
 */

const express = require('express');
const { MongoClient } = require("mongodb");

const clusterId = process.env.CLUSTER || 'cluster0.uqrbj.mongodb.net/';
const MongoUser = process.env.MONGO_USER || 'desarrollowtcorp';
const MongoPword = process.env.MONGO_PASSWORD || '8BhbNe6AvWIvXy8A';
const router = express.Router();

const MongoUrl = `mongodb+srv://${MongoUser}:${MongoPword}@${clusterId}?retryWrites=true&w=majority`

const client = new MongoClient(MongoUrl);
(async () => { await client.connect() })();

const dbName = "GPS_WISETRACKMONGO_DESA";
const collectionName = "MOVIL_POSICION_4K";
        
const database = client.db(dbName);
const collection = database.collection(collectionName);


router.post('/insert', async (req, res) => {
    try{
        const newPos = req.body
        newPos.fecha_hora = new Date(newPos.fecha_hora + '-03:00')
        const insertResult = await collection.insertOne(newPos)
        console.log(insertResult)
        res.status(201).json({ message: 'Objeto almacenado' });

    }catch(err){
        res.status(500).json({ message: 'Error al almacenar el objeto', error: err.message });
    }
  });

/**
 *  @swagger
 *      /position/one/{id}:
 *      get:
 *        summary: retorna una posición determinada por la patente, fecha y hora y el número de evento.
 *        parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: Numeric ID of the user to get
 *        responses:
 *          200:
 *              description: A successful response
 *          404:
 *              description: Object not found
 *          500:
 *              description: Error while searching
*/

router.get('/one/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const cursor = await collection.find({ patente : { $lt: 'WISE-12' } }).sort({ patente: 1 });
    
    res.status(200).json(cursor);

  } catch (err) {
    res.status(500).json({ message: 'Error al buscar el objeto', error: err.message });
  }
});

/**
 *  @swagger
 *      /position/all:
 *      get:
 *          summary: retorna todas las posiciones.
 *          responses:
 *            200:
 *              description: A successful response
*/

router.get('/all', async (_req, res) => {
    try {
      const cursor = await collection.find().sort({ patente: 1 });;
      console.log(cursor)
      res.status(200).json(cursor);
    } catch (err) {
      res.status(500).json({ message: 'Error al obtener los objetos', error: err.message });
    }
  });

module.exports = router;