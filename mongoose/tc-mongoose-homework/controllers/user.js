'use strict';

const _ = require('lodash');

const utilError = require('../config/errorHelper')
const User = require('../models/user')
const Article = require('../models/article')
module.exports = {
  createUser,
  updateUser,
  getUser,
  deleteUser,
  getUsersArticles
};

async function createUser(req, res, next) {
  const fields = [
    'firstName',
    'lastName',
    'role',    
    'numberOfArticles',
    'nickname'
  ]
  const body = req.body;
  const newUser = _.pick(body, fields)
  
  try{
    const user = new User(newUser);
    const result = await user.save()

    console.log(result);
    
    return res.status(200).json(result);
  }catch(error){
    console.log(error);
    next(error)
  }
}

async function updateUser(req, res, next) {
  const reqUserId = req.params.userId
  const body = req.body
  try{
    const newUser = await User.findOne({_id: reqUserId})
    if(!newUser){
      throw utilError.badRequest('User not exists!')
    }
    if(body.firstName){
      newUser.firstName = body.firstName
    }
    if(body.lastName){
      newUser.lastName = body.lastName
    }
    if(body.role && (body.role === 'admin' || body.role === 'writer' || body.role === 'guest')){
      newUser.role = body.role;
    }else{
      throw utilError.badRequest('Role must be one of these : [admin, writer, guest]')
    }
    if(body.nickname){
      newUser.nickname = body.nickname;
    }
    await newUser.save()
    
    return res.status(200).json(newUser);
  }catch(error){
    console.log(error);
    next(error)
  }
}

async function getUser(req, res, next) {
  const userId = req.params.userId

  try{
    const existingUsers = await User.findOne({_id: userId})
    if(!existingUsers){
      throw utilError.badRequest('No such user!')
    }
    console.log(existingUsers);
    let result = [];
    result.push(existingUsers)

    const existsArticle = await Article.find({owner: userId})
    if(existsArticle){
      result.push(existsArticle)
    }

    return res.status(200).json(result);
  }catch(error){
    console.log(error);
    next(error)
  }
}

async function deleteUser(req, res, next) {
  const reqUserId = req.params.userId

  try{
    const existingUser = await User.findOne({_id: reqUserId})
    if(!existingUser){
      throw utilError.badRequest('User is not exist!')
    }

    const existingArticlesOfUser = await Article.find({owner: reqUserId})
    if(existingArticlesOfUser){
      await existingArticlesOfUser.forEach(element => {
        element.remove();
      });
    }

    await existingUser.remove();
    
    return res.status(200).json(existingArticlesOfUser);
  }catch(error){
    console.log(error);
    next(error)
  }
}

async function getUsersArticles(req, res, next) {
  const userId = req.params.userId;

  try{
    const existingUser = await User.findOne({_id: userId})
    if(!existingUser){
      throw utilError.badRequest('User is not exists!')
    }
    const existingArticles = await Article.find({owner: userId})
    if(!existingArticles){
      throw utilError.badRequest('User have no articles!')
    }

    console.log(existingArticles);
    
    return res.status(200).json(existingArticles);
  }catch(error){
    console.log(error);
    next(error)
  }
}
