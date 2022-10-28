import { Router } from 'express';
import { 
    createLocation,
    getLocation,
    getLocations,
    getLocationsCount,
    deleteLocation, 
    updateLocation
} from '../controllers/location'

const router = Router();

router.get('/locations', getLocations);

router.get('/locations/count', getLocationsCount);

router.get('/locations/:id', getLocation);

router.post('/locations', createLocation);

router.delete('/locations/:id', deleteLocation);

router.put('/locations/:id', updateLocation);

export default router;