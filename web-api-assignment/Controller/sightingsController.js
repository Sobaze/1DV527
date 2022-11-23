import SightingsModel from '../Models/sightings.js';
import { createSightingPostValidation } from '../routes/validate.js';


export const getAllSightings = async (req, res) => {
    try {
        SightingsModel.find().then(sightings => {
            res.send(sightings)
        })
    } catch (err) {
        res.status(403);
    }
}


export const createSightingsForUser = (req, res, next) => {

    const { error } = createSightingPostValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    try {

        const sightings = req.body
        const createNewSightings = new SightingsModel({
            username: sightings.username,
            longitude: sightings.longitude,
            latitude: sightings.latitude,
            species: sightings.species,
            size: sightings.size,
            description: sightings.description
        })

        createNewSightings.save();
        res.send(`New Sightings have been added ${sightings.username} saw a ${sightings.species}
        at ${sightings.longitude}, ${sightings.latitude}. The size was ${sightings.size}.
        Desc: ${sightings.description}`)
    } catch (err) {
        res.status(403);
    }
}

export const getSightingPostWithID = async (req, res) => {
    const { id } = req.params;
    const sightingFound = await SightingsModel.findById({_id: id});
    res.send(sightingFound);
}

export const deleteSightingPost = async (req, res) => {
    const { id } = req.params;

    try {
        const sightingPostToDelete = await SightingsModel.findByIdAndRemove({_id: id});

        if(!sightingPostToDelete) {
            res.status(404).send('Sighting post not found');
        } else {
            res.send(`Sighting post with the id ${id} got deleted`);
        }
    } catch (err) {
        res.status(500).send(err);
    }
}

export const updateSightningPost = async (req, res) => {
    const { id } = req.params;
    const { username, longitude, latitude, species, size, description } = req.body;

    try {
        await SightingsModel.findByIdAndUpdate({_id: id}, {
            username: username,
            longitude: longitude,
            latitude: latitude,
            species: species,
            size: size,
            description: description
        }); 
        res.send(`Sighting post with the id ${id} has been updated `)
    } catch (err) {
        res.status(500).send(err);
    }
}