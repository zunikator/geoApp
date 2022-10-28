import {pool} from '../database';

export const getLocations = async (req, res) => {
    const connection = await pool.query('SELECT * FROM tbl_patrullas');
    console.log(connection.rows);
    res.json(connection.rows);
}

export const getLocationsCount = async (req, res) => {
    const connection = await pool.query('SELECT COUNT(*) FROM tbl_patrullas');
    res.json(connection.rows[0]["count"]);
}

export const getLocation = async (req, res) => {
    const  { id } = req.params
    const connection = await pool.query('SELECT * FROM tbl_patrullas WHERE id = $1',
     [ id ]);
    
    res.json(connection.rows[0]);
}

export const createLocation = async (req, res) => {
    const { unidad } = req.body
    const { oficial } = req.body
    const { lat } = req.body
    const { long } = req.body
    const { fecha } = req.body
    const { of } = req.body
    const { sof } = req.body
    const { slc } = req.body
    const { fuerza } = req.body
    const result = await pool.query('INSERT INTO geoloc_unidad(unidad, oficial, lat, long, fecha, of, sof, slc, fuerza) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)',
    [unidad, oficial, lat, long, fecha, of, sof, slc, fuerza]);
    console.log(result);
    res.json({
        id: result.id, //No me salió ien este
        ...req.body,
    });
}

export const deleteLocation = async (req, res) => {
    const  { id } = req.params
    const result = await pool.query('DELETE FROM tbl_patrullas WHERE id = $1',
     [ id ]);
    res.sendStatus(204);
}

export const updateLocation = async (req, res) => {
    const { id } = req.params
    const { unidad } = req.body
    const { oficial } = req.body
    const { lat } = req.body
    const { long } = req.body
    const { fecha } = req.body
    const result = await pool.query('UPDATE tbl_patrullas SET unidad = $1, oficial = $2, lat = $3, long = $4, fecha = $5 WHERE id = $6',
        [ unidad, oficial, lat, long, fecha, id]);

    res.sendStatus(204);
}