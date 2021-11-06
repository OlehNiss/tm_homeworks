const express = require('express')
const router = express.Router()

const createError = require('http-errors')

function validation(req, res, next) {//middlreware validator for post
    if(req.body.id && req.body.name){
        if(!authors.some(elem => elem.id === req.body.id)){
            if(req.body.posts && req.body.posts.length > 0){
                if(Array.isArray(req.body.posts)){
                    req.body.posts.forEach(post => {
                        if((!post.id || !post.text) || (post.id == '' || post.text == '')){
                            next(createError(400, 'Every post must have both fields \'id\' and \'text\' filled'))
                            return
                        }
                    });
                    if(ifPostsIdUnique(req.body.posts)){
                        next();
                    }else{
                        next(createError(400, 'Every post\'s id must be unique!'))
                        return
                    }
                }else{
                    next(createError(400, 'Posts must be array of objects!'))
                    return
                }
            }
            else{
                next(createError(400, 'Author must have at least 1 post'))
                return
            }
        }else{
            next(createError(400, `There is already exist author with such id! You can choose id which is bigger than ${authors.length-1}`))
            return
        }
    }else{
       next(createError(400, 'Both fields \'id\' and \'name\' must be field'))
       return
    }
}

router.get('/', (req, res) => {
    res.json(authors)
})  

router.get('/:id', (req, res, next) => {
    if(authors.some(auth => auth.id === req.params.id)){
        res.json(authors[req.params.id])
    }else{
        next(createError(400, `There isn't such author with id: ${req.params.id}`))
        return
    }
}) 

router.get('/:id/posts', (req, res)=>{
    res.json(authors[req.params.id].posts)
})

router.get('/:id/posts/:postId', (req, res, next)=>{
    if(authors[req.params.id].posts.some(el => el.id == req.params.postId)){
        res.json(authors[req.params.id].posts[req.params.postId])
    }else{
        next(createError(400, `There isn't post with such id: ${req.params.postId}`))
        return
    }
})

router.post('/', validation, (req, res)=>{ // add some author with posts
    authors.push({id: req.body.id,name: req.body.name, posts: req.body.posts});
    res.status(200).json({authors});
})

router.put('/:id', (req, res, next)=>{ // update name of some author
    if(authors.some(aut => aut.id === req.params.id)){
        if(req.body.name){
            authors[req.params.id].name = req.body.name;
            console.log('name was updated!');
            res.json(authors[req.params.id])
        }else{
            next(createError(400, 'You have to input some new name!'))
            return
        }
    }else{
        next(createError(400, `There isn't such author with id: ${req.params.id}`))
        return
    }
})

router.delete('/:id', (req, res, next)=>{ //remove some author
    if(authors.some(auth => auth.id === req.params.id)){
        authors.splice(req.params.id , 1)
        recountId(authors, req.params.id)
        res.json(authors)
    }else{
        next(createError(400, `There isn't such author with id: ${req.params.id}`))
        return
    }
})

function recountId(arr, deletedId){
    arr.forEach(elem => {
        if(elem.id > deletedId){
            elem.id = elem.id - 1;
        }
    });
}

function ifPostsIdUnique(array) {
    let isUnique;
    array.filter((item, index, arr) => {
        isUnique = arr.map((mapItem) => mapItem['id']).indexOf(item['id']) === index;
    })
    return isUnique;
}

let authors = [
    {
        id: '0',
        name: 'John',
        posts: [
                {id: '0', text: 'Hello world'},
                {id: '1', text: 'Wild world'}
        ]
    },
    {
        id: '1',
        name: 'Oleh',
        posts: [
                {id: '0', text: 'Black panter'},
                {id: '1', text: 'Penny Pipady'}
        ]
    },
    {
        id: '2',
        name: 'Ivan',
        posts: [
                {id: '0', text: 'Tom Sayer'},
                {id: '1', text: 'Petro is Kyiv'}
        ]
    }  
]


module.exports = router