const express = require('express');
const path = require('path');
const { getAllPaintings,  getPaintingByID, getPaintingsByArtistID,
        getPaintingsByGalleryID, getPaintingsByTitle, getPaintingsByColor,
        getPaintingsYearOfWork, getAllArtists, getArtistsByCountry,
        getAllGalleries, getGalleriesByCountry
} = require('./provider');

const app = express();

app.get('/api/paintings', (req, res) => {
    res.json(getAllPaintings());
});

app.get('/api/painting/:id', (req, res) => {
    res.json(getPaintingByID(req.params.id));
});

app.get('/api/painting/gallery/:id', (req, res) => {
    res.json(getPaintingsByGalleryID(req.params.id));
});

app.get('/api/painting/artist/:id', (req, res) => {
    res.json(getPaintingsByArtistID(req.params.id));
});

app.get('/api/painting/year/:min/:max', (req, res) => {
    const minYear = parseInt(req.params.min);
    const maxYear = parseInt(req.params.max);
    res.json(getPaintingsYearOfWork(minYear, maxYear));
});

app.get('/api/painting/title/:title', (req, res) => {
    res.json(getPaintingsByTitle(req.params.title));
});

app.get('/api/painting/color/:color', (req, res) => {
    res.json(getPaintingsByColor(req.params.color));
});

app.get('/api/artists', (req, res) => {
    res.json(getAllArtists());
});

app.get('/api/artists/:country', (req, res) => {
    res.json(getArtistsByCountry(req.params.country));
});

app.get('/api/galleries', (req, res) => {
    res.json(getAllGalleries());
});

app.get('/api/galleries/:country', (req, res) => {
    res.json(getGalleriesByCountry(req.params.country));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
});