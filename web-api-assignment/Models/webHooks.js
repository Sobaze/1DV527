import mongoose from 'mongoose';

const webHooksSchema = mongoose.Schema({
    url: { type: String }
})

const WebHook = mongoose.model('webHooksSchema', webHooksSchema);

export default WebHook;