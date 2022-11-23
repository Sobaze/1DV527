import mongoose from 'mongoose';
import WebHook from '../Models/webHooks.js';
import Sightings from '../Models/sightings.js';
import fetch from 'node-fetch';

export const createWebhook = async (req, res) => {
    try {
        const webHook = new WebHook({
            _id: new mongoose.Types.ObjectId(),
            url: req.body.url
        })

        if(!req.body.url) {
            res.status(403).send('Please enter a url')
        } else {
            webHook.save()
            res.status(201).send('Webhook got created')
        }

    } catch(err) {

    }
}

export const displayWebhooks = async (req, res, next) => {
    try {
        const webHooks = await WebHook.find().select('-__v')

        if(!webHooks.length > 0) {
            res.status(404).send('There was no webhooks to be found')
        } else {
            res.status(200).send('Webhook has been found ' + `${webHooks}`)
        }
    } catch(err) {
        res.status(500).send(err)
    }

    next()
}

export const sendWebhook = async (req, res, next) => {
    
    const data =  Sightings.find()
    
    try {
        WebHook.find().select('-__v').then(webHooks => {
            for(const webHook of webHooks) {
                const dataOfUsers = fetch(webHook.url, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                return dataOfUsers
            }
        })
        res.send( dataOfUsers.body)
    } catch(err) {
        res.status(500).send('Could not send webhook')
    }
}

export const deleteWebhook = async (req, res, next) => {
    
    const { id } = req.params;


    try {
        const webHookToDelete = await WebHook.findByIdAndDelete({_id: id});

        if(!webHookToDelete) {
            res.status(404).send('Webhook not found')
        } else {
            res.status(200).send(` Webhook with the id  was removed with success`)
        }
    }catch(err) {
        res.status(500).send(err)
    }

    next()
}