import express from 'express';

import authentications from './authentications';

const router = express.Router();

export default (): express.Router => {
    authentications(router);
    return router;
}