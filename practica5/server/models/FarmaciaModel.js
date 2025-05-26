import pool from "../config/db.js";
export const obtenerMedicamentos=async()=>{
    const [medicamento]=await pool.query('SELECT * FROM medicamento')
    return medicamento;
}
export const AgregarMedicamentos=async(nombre,precio,stock)=>{
    const [medicamento]=await pool.query('INSERT INTO medicamento(nombre,precio,stock) VALUE(?,?,?)',[nombre,precio,stock])
    return {id:medicamento.insertId,nombre,precio,stock};
}

export const Actualizarmedicamentos=async(id,nombre,precio,stock)=>{
    await pool.query('UPDATE medicamento SET nombre=?,precio=?,stock=? WHERE id_medicamento=?',[nombre,precio,stock,id]);
    return{message:'Se actualizo correctamente'};
}

export const Eliminarmedicamentos=async(id)=>{
    await pool.query('DELETE FROM medicamento WHERE id_medicamento= ?',[id]);
    return{message:'Se elimino correctamente'};
}