const API = 'https://api-zunikator-2.azurewebsites.net/locations'
// const API2 = 'http://10.0.2.2:3000/locations'
// import {pool} from "./src/db/database";
import { supabase } from "./src/db/database";

export const getLocations = async () => {
    const res = await fetch(API)
    return await res.json();
}

export const createLocation = async (Location) => {
    const res = await fetch(API, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(Location)
    });
    return await res.json();
};

export const insertLocation = async (Location) => {
    try {

    const { unidad } = Location.unidad
    const { oficial } = Location.oficial
    const { lat } = Location.lat
    const { long } = Location.long
    const { fecha } = Location.fecha
    const { of } = Location.of
    const { sof } = Location.sof
    const { slc } = Location.slc
    const { fuerza } = Location.fuerza

    const text = 'INSERT INTO tbl_patrullas(unidad, oficial, lat, long, fecha, of, sof, slc, fuerza) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)' //el $1 $2 son variables a las que se les asigna valor después
    const values = [unidad, oficial, lat, long, fecha, of, sof, slc, fuerza];

    const res = await pool.query(text, values);
    console.log(res);
    pool.end();
    } catch(err) {
        console.log(err);
    }
};

export const enviarSupabase = async (localizacion) => {
    try{
    const { data, error } = await supabase
    .from('geoloc_unidad')
    .insert({
        unidad: localizacion.unidad,
        oficial: localizacion.oficial,
        lat: localizacion.lat,
        long: localizacion.long,
        fecha: localizacion.fecha,
        of: localizacion.of,
        sof: localizacion.sof,
        slc: localizacion.slc,
        fuerza: localizacion.fuerza
    });
    return console.log(data);
    }catch (error) {
        console.error(error);
    }
}