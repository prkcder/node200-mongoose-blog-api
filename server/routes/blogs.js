const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

router.get('/', (req, res) => {
    Blog
        .find()
        .then(blog => {
            res.status(200).json(blog);
        });
});

router.get('/featured', (req, res) => {
    Blog
        .where({ featured: true })
        .then(blog => {
            if (!blog) {
                res.status(404).send('Blogs not found');
            } else {
                res.status(200).json(blog);
            }
        });
});

router.get('/:id', (req, res) => {
    Blog
      .findById(req.params.id)
      .then(blog => {
        if (!blog) {
          res.status(404).send(`blog not found`);
        }
        res.status(200).json(blog);
      });
  });

router.post('/', (req, res) => {
//Create a Blog and assign a User
let dbUser = null;
// Fetch the user from the database
User
    .findById(req.body.author)
    .then(user => {
        // Store the fetched user in higher scope variable
        dbUser = user;

        // Create a blog
        const newBlog = new Blog(
            {
                title: req.body.title,
                article: req.body.article,
                published: req.body.published,
                featured: req.body.featured,
                author: req.body.author
            });

        // Bind the user to it
        newBlog.author = user.id;

        // Save it to the database
        return newBlog.save();
    })
    .then(blog => {
        // Push the saved blog to the array of blogs associated with the User
        dbUser.blogs.push(blog);

        // Save the user back to the database and respond to the original HTTP request with a copy of the newly created blog.
        dbUser.save().then(() => res.status(201).json(blog));
    });
});

router.put('/:id', (req, res) => {
    Blog
        .findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            article: req.body.article,
            published: req.body.published,
            featured: req.body.featured,
            author: req.body.author
        })
        .then(blog => {
            if (!blog) {
                res.status(404).send(`blog not found`);
                return;
              }
              res.status(204).json(blog);
        });
});

router.delete('/:id', (req, res) => {
    Blog
        .findByIdAndRemove(req.params.id)
        .then(blog => {
            if (blogs) res.status(200).json(blogs);
        });
});

module.exports = router;