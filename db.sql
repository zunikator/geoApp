CREATE DATABASE geo_db;

CREATE EXTENSION postgis;

CREATE TABLE geoloc_unidad
( id serial NOT NULL PRIMARY KEY,
unidad character(30),
oficial character(30),
lat real,
long real,
fecha timestamp without time zone,
of int,
sof int,
slc int,
fuerza int
);

CREATE TABLE geoloc_unidad_geom
( id_geom serial NOT NULL PRIMARY KEY,
unidad_geom character(30),
oficial_geom character(30),
lat_geom real,
long_geom real,
coord_geom geometry,
fecha_geom timestamp without time zone,
of_geom int,
sof_geom int,
slc_geom int,
fuerza_geom int
);

ALTER TABLE geoloc_unidad_geom
ALTER COLUMN coord_geom TYPE geometry(POINT,4326)
USING ST_SetSRID(coord_geom,4326);

CREATE OR REPLACE FUNCTION tf_ingreso_uni_geom()
RETURNS trigger AS
$$

DECLARE
v_coord_geom geometry;

BEGIN

v_coord_geom = ST_SetSRID(ST_MakePoint(NEW.long,NEW.lat), 4326);

INSERT INTO geoloc_unidad_geom (
unidad_geom,
oficial_geom,
lat_geom,
long_geom,
coord_geom,
fecha_geom,
of_geom,
sof_geom,
slc_geom,
fuerza_geom
)
VALUES (
NEW.unidad,
NEW.oficial,
NEW.lat,
NEW.long,
v_coord_geom,
NEW.fecha,
NEW.of,
NEW.sof,
NEW.slc,
NEW.fuerza
);
RETURN NEW;
END;

$$
LANGUAGE 'plpgsql';

CREATE TRIGGER tr_tf_ingreso_uni_geom
AFTER INSERT ON geoloc_unidad
FOR EACH ROW
EXECUTE FUNCTION tf_ingreso_uni_geom();

CREATE TABLE despliegue
( id_desp serial NOT NULL PRIMARY KEY,
unidad_desp character(30),
oficial_desp character(30),
lat_desp real,
long_desp real,
coord_desp geometry,
fecha_desp timestamp without time zone,
of_desp int,
sof_desp int,
slc_desp int,
fuerza_desp int
);

ALTER TABLE despliegue
ALTER COLUMN coord_desp TYPE geometry(POINT,4326)
USING ST_SetSRID(coord_desp,4326);


CREATE OR REPLACE FUNCTION tf_despliegue_uni()
RETURNS trigger AS
$$

BEGIN

IF(NEW.unidad_geom IN (SELECT unidad_desp FROM despliegue )) THEN
	UPDATE despliegue SET 
	 lat_desp = NEW.lat_geom,
	 long_desp = NEW.long_geom,
	 coord_desp = NEW.coord_geom,
	 fecha_desp = NEW.fecha_geom,
     of_desp = NEW.of_geom,
     sof_desp = NEW.sof_geom,
     slc_desp = NEW.slc_geom,
     fuerza_desp = NEW.fuerza_geom
	WHERE NEW.unidad_geom IN (unidad_desp);
END IF;
IF (NEW.unidad_geom NOT IN (SELECT unidad_desp FROM despliegue )) THEN
	INSERT INTO despliegue (
	unidad_desp,
	oficial_desp,
	lat_desp,
	long_desp,
	coord_desp,
	fecha_desp,
    of_desp,
    sof_desp,
    slc_desp,
    fuerza_desp
	)
	VALUES (
	NEW.unidad_geom,
	NEW.oficial_geom,
	NEW.lat_geom,
	NEW.long_geom,
	NEW.coord_geom,
	NEW.fecha_geom,
    NEW.of_geom,
    NEW.sof_geom,
    NEW.slc_geom,
    NEW.fuerza_geom
);
END IF;
RETURN NEW;
END;
$$
LANGUAGE 'plpgsql';


CREATE TRIGGER tr_tf_despliegue_uni
AFTER INSERT ON geoloc_unidad_geom
FOR EACH ROW
EXECUTE FUNCTION tf_despliegue_uni();

//-------------------------------------------------------

ALTER SEQUENCE geoloc_unidad_id_seq RESTART WITH 1
ALTER SEQUENCE geoloc_unidad_geom_id_geom_seq RESTART WITH 1
ALTER SEQUENCE despliegue_id_desp_seq RESTART WITH 1



INSERT INTO geoloc_unidad (
unidad,
oficial,
lat,
long,
fecha,
of,
sof,
slc,
fuerza
)
VALUES (
'Secc Prueba',
'Cap Araneda',
-37.5678,
-122.5678,
'2022-10-02 10:25:00',
1,
3,
30,
34
);


INSERT INTO geoloc_unidad (
unidad,
oficial,
lat,
long,
fecha,
of,
sof,
slc,
fuerza
)
VALUES (
'Secc Prueba',
'Cap Araneda',
-36.4000,
-121.6000,
'2022-10-02 10:27:00',
1,
3,
30,
34
);


SELECT * FROM unidad;
SELECT * FROM unidad_geom;
SELECT * FROM despliegue;


//------------------ALTER TABLE table_name ALTER COLUMN column_name TYPE column_definition;

-- ALTER TABLE unidad ADD fecha timestamp without time zone;
-- ALTER TABLE unidad_geom ADD fecha_geom timestamp without time zone;

//-----------------TIMESTAMP '2004-10-19 10:23:54+02'

-- ALTER TABLE tbl_patrullas_geom DROP COLUMN fecha;
-- ALTER SEQUENCE geoloc_unidad_id_seq RESTART WITH 1;
-- ALTER SEQUENCE geoloc_unidad_geom_id_geom_seq RESTART WITH 1;
-- ALTER SEQUENCE despliegue_id_desp_seq RESTART WITH 1;

//----------------- cd backend //------------------ npm start //------------ Crt + C (terminar)

SELECT oficial, count(*) FROM person GROUP BY oficial;
SELECT NOW() +/- INTERVAL '10 YEARS/MONTHS/DAYS';
value IN (SELECT column_name FROM table_name);