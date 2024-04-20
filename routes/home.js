const express = require('express');
const router = express.Router();
const path = require('path'); // Import the path module
const cards = [
    {
        title: "Portfolio | Graphic Designer",
        src: "/img/watchtower.jpg",
        author: "Afaq Ahmed",
        likes: 1000,
    },
    {
        title: "Illustration Portfolio",
        src: "/img/watchtower.jpg",
        author: "Afaq Ahmed",
        likes: 20000,
    },
    {
        title: "American Standard Horizon Faucet",
        src: "/img/watchtower.jpg",
        author: "Afaq Ahmed",
        likes: 300000,
    },
    {
        title: "Portfolio | Graphic Designer",
        src: "/img/watchtower.jpg",
        author: "Afaq Ahmed",
        likes: 4000000,
    },
    {
        title: "Portfolio | Graphic Designer",
        src: "/img/watchtower.jpg",
        author: "Afaq Ahmed",
        likes: 4000000,
    },
    {
        title: "Portfolio | Graphic Designer",
        src: "/img/watchtower.jpg",
        author: "Afaq Ahmed",
        likes: 4000000,
    },
];
const carousel = [
    {
        src: "/img/boy.png",
    },
    {
        src: "/img/boy.png",
    },
    {
        src: "/img/boy.png",
    },
    {
        src: "/img/boy.png",
    },
];
const carousel_sib = [
    {
        src: "/img/watchtower.jpg",
    },
    {
        src: "/img/watchtower.jpg",
    },
];
function formatLikes(likes) {
    if (likes >= 1000 && likes < 1000000) {
        return (likes / 1000).toFixed(1) + 'K'; // Convert to K format
    } else if (likes >= 1000000) {
        return (likes / 1000000).toFixed(1) + 'M'; // Convert to M format
    } else {
        return likes; // Return as-is for values below 1000
    }
}
// Route handler for the home page
router.get('/', (req, res) => {
    const pageTitle = 'Home';
    res.render('index', { pageTitle, cards,carousel,carousel_sib,formatLikes });
});

module.exports = router;
