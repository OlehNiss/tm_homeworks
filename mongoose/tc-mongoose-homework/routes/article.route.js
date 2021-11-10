const express = require('express');
const router = express.Router();

const articleRoutes = require('../controllers/article')

router.post('/', articleRoutes.createArticle)
router.put('/:articleId', articleRoutes.updateArticle)
router.get('/', articleRoutes.getArticles)
router.delete('/:articleId', articleRoutes.deleteArticle)

module.exports = router;