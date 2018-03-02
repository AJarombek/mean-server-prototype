/**
 * Routes for the Post API
 * @author Andrew Jarombek
 * @since 2/24/2018
 */

const express = require('express');
const files = require('../utils/files');

const routes = (Post, User, Audit) => {

    const postRouter = express.Router();

    postRouter.route('/')
        .get((req, res) => {

            find().catch(error => res.status(500).send(error));

            async function find() {
                const posts = await Post.find().exec();

                res.json(posts);
            }
        })
        .post((req, res) => {

            // pictureData is not a part of the Post Schema, so remove it once we assign it a variable
            const data = req.body.pictureData;
            delete req.body.pictureData;

            const post = new Post(req.body);
            console.info(`Creating Post: ${post}`);

            if (post.picture && post.name && post.picture && data) {

                // First save the file to the servers filesystem
                files.saveFile(post.name, data);

                // Then insert the post into MongoDB
                insert().catch(error => res.status(500).send(error));

                async function insert() {

                    // Get the user that is about to create a new post
                    const user = await User.findOne({username: post.username}).exec();

                    // Set the new posts user_id to the user ID we just received
                    post.user_id = user._id;

                    const newPost = await Post.create(post);
                    console.info(`New Post Created: ${newPost}`);

                    if (newPost === null || newPost.username === undefined) {
                        throw Error("Invalid New Post");
                    }

                    // Audit the creation of a new post
                    const auditPost = new Audit({
                        object: newPost._id,
                        type: 'post',
                        message: `Created Post ${newPost.name} by ${newPost.username}`,
                        source: 'NodeJS MeowCat API'
                    });

                    await Audit.create(auditPost);

                    await User.findOneAndUpdate({username: newPost.username}, { $inc: { postCount: 1}});

                    // Audit the update of a user (increment post count)
                    const auditUser = new Audit({
                        object: user._id,
                        type: 'user',
                        message: `Modified User ${newPost.username}`,
                        source: 'NodeJS MeowCat API'
                    });

                    await Audit.create(auditUser);

                    res.json(newPost);
                }
            } else {
                res.status(500).send("Error: Invalid Post Entered");
            }
        });

    postRouter.use('/:id', (req, res, next) => {

        find().catch(error => res.status(500).send(error));

        async function find() {

            const post = await Post.findById(req.params.id).exec();
            console.info(`Post with matching ID: ${post}`);

            if (post) {
                req.post = post;
                next();
            } else {
                res.status(404).send("Error: No Post found with given ID");
            }
        }
    });

    postRouter.route('/:id')
        .get((req, res) => {
            res.json(req.post);
        })
        .put((req, res) => {

            let post = req.post;

            // Only a few of posts properties are allowed to change
            post.picture = req.body.picture;
            post.name = req.body.name;
            post.description = req.body.description;
            post.up = req.body.up;
            post.down = req.body.down;

            update().catch(error => res.status(500).send(error));

            async function update() {
                const updatedPost = await Post.save(post).exec();
                console.info(`Updated Post: ${updatedPost}`);

                res.json(updatedPost);
            }
        })
        .delete((req, res) => {
            remove().catch(error => res.status(500).send(error));

            async function remove() {

                // We need to get the picture name for this post so we can remove it from the file system
                const post = await Post.findById(req.params.id).exec();

                await req.post.remove();

                files.removeFile(post.picture);

                res.status(204).send();
            }
        });

    return postRouter;
};

module.exports = routes;