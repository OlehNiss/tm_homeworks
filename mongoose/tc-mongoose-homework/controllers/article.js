'use strict';

const _ = require('lodash');

const utilError = require('../config/errorHelper')
const Article = require('../models/article')
const Owner = require('../models/user')
module.exports = {
  createArticle,
  updateArticle,
  deleteArticle,
  getArticles
};

async function createArticle(req, res ,next){
    const fields = [
        'title',
        'subtitle',
        'description',
        'owner',
        'category'
    ]
    const body = req.body;
    const newArticle = _.pick(body, fields)
    try{
        const existsOwner = await Owner.findOne({_id: body.owner})
        if(!existsOwner){
            throw utilError.badRequest('Owner is not exists!')
        }
        const article = new Article(newArticle)
        const result = await article.save()
        console.log(result);

        existsOwner.numberOfArticles++;
        await existsOwner.save()

        res.status(200).json(result);
    }catch(error){
        console.log(error);
        next(error)
    }
}

async function updateArticle(req, res ,next){
    const updateId = req.params.articleId;
    const body = req.body;
    try{
        const existingArticle = await Article.findOne({_id: updateId})
        if(!existingArticle){
            throw utilError.badRequest('Article is not exists!')
        }
        if(body.title){
            existingArticle.title = body.title;
        }
        if(body.subtitle){
            existingArticle.subtitle = body.subtitle;
        }
        if(body.description){
            existingArticle.description = body.description;
        }
        if(body.category && (body.category === 'sport' || body.category === 'games' || body.category === 'history')){
            existingArticle.category = body.category;
        }else{
            throw utilError.badRequest('Category must be one of these : [sport, games, history]')
        }

        if(body.owner){
            const newOwner = await Owner.findOne({_id: body.owner});
            if(!newOwner){
                throw utilError.badRequest('New owner is not exists!')
            }
            const oldOwner = await Owner.findOne({_id: existingArticle.owner});
            oldOwner.numberOfArticles--;
            await oldOwner.save()

            existingArticle.owner = body.owner;
            newOwner.numberOfArticles++;
            await newOwner.save();
        }

        await existingArticle.save()
        console.log(existingArticle);
        res.status(200).json(existingArticle);
    }catch(error){
        console.log(error);
        next(error)
    }
}

async function getArticles(req, res ,next){
    try {
        const {
          query: {skip = 0, limit = 10, search = '', sort: sortFromClient}
        } = req;
        const sort = util.sort(sortFromClient);
        const filter = {$regex: new RegExp(util.escapeRegExpChars(search), 'i')}; 
        const query = {$or: [{title: filter}, {description: filter}, {subtitle: filter}, {category: filter}]};
        const result = await Article.find(query)
            .populate('owner')
            .sort(sort)
            .skip(skip)
            .limit(limit);
    
        return res.status(200).json(result);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

async function deleteArticle(req, res ,next){
    const deleteId = req.params.articleId;
    const body = req.body;
    try{
        const existingArticle = await Article.findOne({_id: deleteId})
        if(!existingArticle){
            throw utilError.badRequest('Article you want to delete is not exists!')
        }
        const existsOwner = await Owner.findOne({_id: existingArticle.owner})
    
        existsOwner.numberOfArticles--
        await existsOwner.save()

        await existingArticle.remove()
        console.log(existingArticle)
        res.status(200).json(existingArticle)
    }catch(error){
        console.log(error);
        next(error)
    }
}