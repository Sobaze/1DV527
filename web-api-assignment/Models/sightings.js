
import mongoose from 'mongoose';

const sightingsSchema = mongoose.Schema({
    username: { type: String, required: true, maxlength: 20, minlength: 4 },
    longitude: {type: Number, required: true },
    latitude: { type: Number, required: true },
    species: { type: String, required: true },
    size: {type: String, required: true },
    description: { type: String, required: true, maxlength: 200 }

})

const Sightings = mongoose.model('sightingsSchema', sightingsSchema);

export default Sightings;