/**
 * Routes for the Post API
 * @author Andrew Jarombek
 * @since 2/24/2018
 */

const express = require('express');
const files = require('../utils/files');
const jwtUtils = require('../utils/jwt');

const routes = (Post, User, Audit) => {

    const postRouter = express.Router();

    // The HTTP POST request for posts is not public, valid JWT token must be present on HTTP request
    postRouter.route('/')
        .get((req, res) => {

            find().catch(error => res.status(500).send(error));

            async function find() {
                const posts = await Post.find().exec();

                res.json(posts);
            }
        })
        .post(jwtUtils.checkIfAuthenticated, (req, res) => {

            // pictureData is not a part of the Post Schema, so remove it once we assign it a variable
            const data = req.body.pictureData;
            delete req.body.pictureData;

            const post = new Post(req.body);
            console.info(`Creating Post: ${post}`);

            if (post.picture && post.name && post.picture && data) {

                // The naming convention for saved files is [username]_[filename].[filetype]
                post.picture = `${post.username}_${post.picture}`;

                // First save the file to the servers filesystem
                files.saveFile(post.picture, data);

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
                        message: `Created Post '${newPost.name}' by ${newPost.username}`,
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

                    res.status(201).json(newPost);
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

    // The HTTP PUT & DELETE requests for posts are not public, valid JWT token must be present on HTTP request
    postRouter.route('/:id')
        .get((req, res) => {
            res.json(req.post);
        })
        .put(jwtUtils.checkIfAuthenticated, (req, res) => {

            let post = req.post;

            // Only a few of posts properties are allowed to change

            // Save a new picture to the filesystem if the pictures name has changed and the request has picture data
            if (post.picture !== req.body.picture  && req.body.pictureData) {

                console.info("New Picture Uploaded: Saving to Filesystem");
                req.body.picture = `${post.username}_${req.body.picture}`;

                files.saveFile(req.body.picture, req.body.pictureData);
                post.picture = req.body.picture;
            }

            post.name = req.body.name;
            post.description = req.body.description;
            post.up = req.body.up;
            post.down = req.body.down;

            update().catch(error => res.status(500).send(error));

            async function update() {

                // First update the post with the given id
                const update = await Post.update({_id: post._id}, post).exec();

                // Then find the newly updated user
                const updatedPost = await Post.findOne({_id: post._id}).exec();
                console.info(`Updated Post: ${updatedPost}`);

                // Audit the edit of a user
                const audit = new Audit({
                    object: updatedPost._id,
                    type: 'post',
                    message: `Modified Post '${updatedPost.name}' by ${updatedPost.username}`,
                    source: 'NodeJS MeowCat API'
                });

                await Audit.create(audit);

                res.json(updatedPost);
            }
        })
        .delete(jwtUtils.checkIfAuthenticated, (req, res) => {

            // If the remove function errors out, return a 500 status
            remove().catch(error => res.status(500).send(error));

            // Function for removing the post from MongoDB
            async function remove() {

                await req.post.remove();

                // Should return null if we successfully deleted the post from Mongo
                const deleted = await Post.findById(req.params.id).exec();

                // Call the catch() function if the post was not deleted
                if (deleted !== null) {
                    throw Error('Post Still Exists');
                }

                // Audit the deletion of a post
                const audit = new Audit({
                    object: req.post._id,
                    type: 'post',
                    message: `Deleted Post '${req.post.name}' by ${req.post.username}`,
                    source: 'NodeJS MeowCat API'
                });

                await Audit.create(audit);

                res.status(204).send();

                // If the remove file function errors out just log an error message
                removeFile().catch(error => console.error(error));
            }

            // Function for removing the posts file from the filesystem if no other posts reference it
            async function removeFile() {
                const postReferencingFile = await Post.findOne({picture: req.post.picture}).exec();

                if (!postReferencingFile) {
                    console.info("There are no posts referencing this file.  It will be deleted.");
                    files.removeFile(req.post.picture);
                } else {
                    console.info(`There is still a post referencing this file with ID: ${postReferencingFile._id}`);
                }
            }
        });

    return postRouter;
};

module.exports = routes;