import *as FarmaciaModel from '../models/FarmaciaModel.js';
export const ObtenerMedicamentos=async(req,res)=>{
    try{
       const medicamento=await FarmaciaModel.obtenerMedicamentos();
       res.json(medicamento);
    }catch(error){
res.status(500).json({error:error.message});
    }
}
export const Agregarmedicamentos=async(req,res)=>{
    try{
       const {nombre,precio,stock}=req.body;

       const medicamento=await FarmaciaModel.AgregarMedicamentos(nombre,precio,stock);
       res.status(200).json(medicamento);
    }catch(error){
res.status(500).json({error:error.message});
    }

}

export const Actualizarmedicamentos=async(req,res)=>{
    try{
        const {id}=req.params;
       const {nombre,precio,stock}=req.body;

       const medicamento=await FarmaciaModel.Actualizarmedicamentos(id,nombre,precio,stock);
       res.status(200).json(medicamento);
    }catch(error){
res.status(500).json({error:error.message});
    }
}

export const Eliminarmedicamentos=async(req,res)=>{
    try{
        const {id}=req.params;
     
       const medicamento=await FarmaciaModel.Eliminarmedicamentos(id);
       res.status(200).json(medicamento);
    }catch(error){
res.status(500).json({error:error.message});
    }
}