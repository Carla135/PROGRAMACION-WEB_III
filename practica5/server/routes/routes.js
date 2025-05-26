import express from 'express';
import {ObtenerMedicamentos,Agregarmedicamentos,Actualizarmedicamentos,Eliminarmedicamentos} from '../controller/FarmaciaController.js'
import { AgregarMedicamentos } from '../models/FarmaciaModel.js';


const rutas=express.Router();

rutas.get('/',ObtenerMedicamentos);
rutas.post('/',Agregarmedicamentos);
rutas.put('/:id', Actualizarmedicamentos);
rutas.delete('/:id', Eliminarmedicamentos);
export default rutas;