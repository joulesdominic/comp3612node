const fs = require('fs');
const { parse } = require('path');

const rawPaintingsData = fs.readFileSync('./paintings-nested.json');
const rawArtistsData = fs.readFileSync('./artists.json');
const rawGalleriesData = fs.readFileSync('./galleries.json');
const paintingsData = JSON.parse(rawPaintingsData);
const artistsData = JSON.parse(rawArtistsData);
const galleriesData = JSON.parse(rawGalleriesData);

function getAllPaintings() {
    return paintingsData;
}

function getPaintingByID(id) {
    const paintingID = parseInt(id);
    const painting = paintingsData.find(painting => painting.paintingID === paintingID);
    return painting || notFound();
}

function getPaintingsByGalleryID(id) {
    const paintingID = parseInt(id);
    const painting = paintingsData.filter(painting => painting.gallery.galleryID === paintingID);
    return painting || notFound();
}

function getPaintingsByArtistID(id) {
    const paintingID = parseInt(id);
    const painting = paintingsData.filter(painting => painting.artist.artistID === paintingID);
    return painting || notFound();
}

function getPaintingsYearOfWork(min, max) {
    const filteredPaintings = paintingsData.filter(painting => painting.yearOfWork >= min && painting.yearOfWork <= max);
    if (filteredPaintings.length === 0) {
        return notFound();
    }
    return filteredPaintings;
}

function getPaintingsByTitle(title) {
    const matchedPaintings = paintingsData.filter(painting =>
        painting.title.toLowerCase().includes(title.toLowerCase())
    );

    if (matchedPaintings.length === 0) {
        return notFound();
    }

    return matchedPaintings;
}

function getPaintingsByColor(color) {
    const matchedPaintings = paintingsData.filter(painting =>
        painting.details.annotation.dominantColors.some(
            dominantColor =>
                dominantColor.name.toLowerCase().includes(color.toLowerCase())
        )
    );

    if (matchedPaintings.length === 0) {
        return notFound();
    }

    return matchedPaintings;
}

function getAllArtists() {
    return artistsData;
}

function getArtistsByCountry(country) {
    const matchedArtists = artistsData.filter(artist => artist.Nationality.toLowerCase().includes(country.toLowerCase()));
    if (matchedArtists.length === 0) {
        return notFound();
    }
    return matchedArtists;
}

function getAllGalleries() {
    return galleriesData;
}

function getGalleriesByCountry(country) {
    const matchedGalleries = galleriesData.filter(gallery => gallery.GalleryCountry.toLowerCase().includes(country.toLowerCase()));
    if (matchedGalleries.length === 0) {
        return notFound();
    }
    return matchedGalleries;
}

function notFound() {
    return { message: 'Not Found!' };
}

module.exports = {
    getAllPaintings, getPaintingByID, getPaintingsByGalleryID,
    getPaintingsByArtistID, getPaintingsYearOfWork, getPaintingsByTitle,
    getPaintingsByColor, getAllArtists, getArtistsByCountry, getAllGalleries,
    getGalleriesByCountry
}