import pg from 'pg';
import {config} from './config';

//minuto 40

export const pool = new pg.Pool(config);
