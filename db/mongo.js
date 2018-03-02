// Author: Andrew Jarombek
// Date: 2/25/2018
// MongoDB JavaScript code

db.test.insert({"time":Date()});

db.test.find().pretty();
db.test.count();

// Delete all the documents in the test collection
db.test.deleteMany({});

db.post.deleteMany({});

let andy_id = db.user.findOne({username: "andy"})._id;
let tom_id = db.user.findOne({username: "tom"})._id;
let joe_id = db.user.findOne({username: "joe"})._id;
let fish_id = db.user.findOne({username: "fish"})._id;
let kyle_id = db.user.findOne({username: "kyle"})._id;
let lisa_id = db.user.findOne({username: "lisag"})._id;

// Insert all the pre-populated cat posts
db.post.insertMany([
    {
        picture: "russianblue.jpg",
        name: "Cat Pic",
        username: "andy",
        user_id: andy_id,
        first: "Andrew",
        last: "Jarombek",
        date: new Date("2018-02-26"),
        description: "I love this picture!",
        up: 1,
        down: 0
    },
    {
        picture: "toms-cat.jpg",
        name: "Kitty!",
        username: "tom",
        user_id: tom_id,
        first: "Thomas",
        last: "Caulfield",
        date: new Date("2018-02-24"),
        description: "awww!",
        up: 5,
        down: 1
    },
    {
        picture: "rb.jpg",
        name: "Russian Blue :)",
        username: "andy",
        user_id: andy_id,
        first: "Andrew",
        last: "Jarombek",
        date: new Date("2018-02-25"),
        description: "I want this cat",
        up: 0,
        down: 0
    },
    {
        picture: "kitty.jpg",
        name: "What a Cute Kitten!",
        username: "joe",
        user_id: joe_id,
        first: "Joseph",
        last: "Smith",
        date: new Date("2018-02-27"),
        description: "❤️",
        up: 0,
        down: 0
    },
    {
        picture: "stretch.jpg",
        name: "What a Cute Kitten!",
        username: "fish",
        user_id: fish_id,
        first: "Ben",
        last: "Fishbein",
        date: new Date("2018-02-23"),
        description: "hot dog!",
        up: 3,
        down: 0
    },
    {
        picture: "peek.jpg",
        name: "Just Hangin Out",
        username: "andy",
        user_id: andy_id,
        first: "Andrew",
        last: "Jarombek",
        date: new Date("2018-02-28"),
        description: "💕",
        up: 0,
        down: 0
    },
    {
        picture: "hey.jpg",
        name: "Oh Hey",
        username: "tom",
        user_id: tom_id,
        first: "Thomas",
        last: "Caulfield",
        date: new Date("2018-02-27"),
        description: "whats up",
        up: 1,
        down: 0
    },
    {
        picture: "khakis.jpg",
        name: "Oh Hell Yeah!",
        username: "kyle",
        user_id: kyle_id,
        first: "Kyle",
        last: "Blanchette",
        date: new Date("2018-02-28"),
        description: "~~whats up~~",
        up: 0,
        down: 0
    },
    {
        picture: "cuddles.jpg",
        name: "Love",
        username: "andy",
        user_id: andy_id,
        first: "Andrew",
        last: "Jarombek",
        date: new Date("2018-02-28"),
        description: "Always",
        up: 0,
        down: 0
    },
    {
        picture: "hi.jpg",
        name: "Hi Guys!!",
        username: "lisag",
        user_id: lisa_id,
        first: "Lisa",
        last: "Grohn",
        date: new Date("2018-02-28"),
        description: "How is everyone doing!!",
        up: 0,
        down: 0
    },
    {
        picture: "sleepy.jpg",
        name: "Tired 😸",
        username: "andy",
        user_id: andy_id,
        first: "Andrew",
        last: "Jarombek",
        date: new Date("2018-02-28"),
        description: "lol",
        up: 0,
        down: 0
    }
]);

db.post.find().pretty();
db.post.count(); // 11

// Find a post and sort it by date in ascending order (newest last)
db.post.find().sort({date: 1}).pretty();

db.user.insertMany([
    {
        username: "andy",
        first: "Andrew",
        last: "Jarombek",
        password: "$2a$10$c/DwED6TayK0d3ce5761zOTBBsnCB.JMpcF4l4Zojqti6Adaym9W2",
        postCount: 4
    },
    {
        username: "tom",
        first: "Thomas",
        last: "Caulfield",
        password: "$2a$10$8Irw8CAvdJr2uBAUYdlinOf8T9dblJiz0mumgNyfiHGBmT9vUweo6",
        postCount: 2
    },
    {
        username: "joe",
        first: "Joseph",
        last: "Smith",
        password: "$2a$10$gaAmOinWS5v7QOmgr6a0/u65eLuOt5CUa.Z8dyyNblQzJeeHn5lye",
        postCount: 1
    },
    {
        username: "fish",
        first: "Ben",
        last: "Fishbein",
        password: "$2a$10$L53hy9nsY.MW7Ih20fosF.IvoLsGFJdq1NvBBpvHb1XKLz4L7GS22",
        postCount: 1
    },
    {
        username: "kyle",
        first: "Kyle",
        last: "Blanchette",
        password: "$2a$10$VOCT5/8f2gYqWpkSSXM5uOx6qnNynhYOpDCTNqFyWbxMGADyE9tsq",
        postCount: 1
    },
    {
        username: "lisag",
        first: "Lisa",
        last: "Grohn",
        password: "$2a$10$B3/eNl3QAwwHAv288dum2.W.jojuOBhs7YV9O8zs1ntkr74BL6v0m",
        postCount: 1
    }
]);

db.user.find().pretty();