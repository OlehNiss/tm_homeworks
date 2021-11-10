const express = require('express');
const router = express.Router();

const userRoutes = require('../controllers/user');

router.post('/', userRoutes.createUser);
router.put('/:userId', userRoutes.updateUser);
router.get('/:userId', userRoutes.getUser);
router.delete('/:userId', userRoutes.deleteUser);
router.get('/:userId/articles', userRoutes.getUsersArticles);

module.exports = router;