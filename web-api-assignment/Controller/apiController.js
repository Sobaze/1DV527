


export const apiInformation = async (req, res) => {
    res.send({
        meta: {
            title: "Bird sightings",
            licence: "MIT",
            author: "Jonas Nilsson",
            description: "Api for a collection of different users sightings of various birds"
        }, 
        links: {
            self: {
                url: process.env.AZURE_URL + '/api',
                method: 'GET',
                token: "Not required",
                access: "Pulbic",
                description: "The starting point of this API"
            },
            users: {
                createUser: {
                    url: process.env.AZURE_URL + '/api/users',
                    method: 'POST',
                    token: "Not required",
                    access: "Public",
                    description: "Create user with {username: <username>, password: <password> }, do it in JSON format"
                },
                viewUsers: {
                    url: process.env.AZURE_URL + '/api/users',
                    method: 'GET',
                    token: 'Not required',
                    access: "Public",
                    description: "Get all users for us to view"
                }
            },
            authorize: {
                auth: {
                    url: process.env.AZURE_URL + '/api/auth',
                    method: 'POST',
                    token: 'Not required',
                    access: "Public",
                    description: "Sign in in order to get an token to be able to do bird sightings posts"
                }
            },
            "Bird Sighting post": {
                create: {
                    url: process.env.AZURE_URL + '/api/sightings',
                    method: 'POST',
                    token: "Required",
                    access: "Private",
                    description: "Create an bird sighting post {username: <username>, longitude: <longitude>, latitude:<latitude>, species: <species>, size: <size>, description: <description of the bird> (JSON format)  } "
                },
                "Show Post": {
                    url: process.env.AZURE_URL + '/api/sightings',
                    method: 'GET',
                    token: 'Required',
                    access: "Private",
                    description: "Get a list of all bird sighting posts user have made"
                },
                Edit: {
                    url: process.env.AZURE_URL + '/api/sightings/:id',
                    method: "PATCH",
                    token: "Required",
                    access: "Private",
                    description: "Edit information in a bird sighting post {username: <username>, longitude: <longitude>, latitude:<latitude>, species: <species>, size: <size>, description: <description of the bird> (JSON format)} write in new value of the one you want to change value of "
                },
                Delete: {
                    url: process.env.AZURE_URL + '/api/sightings/:id',
                    method: "DELETE",
                    token: "Required",
                    access: "Private",
                    description: "Delete an specific bird sighting post"
                }
            },
            webhooks: {
                view: {
                    url: process.env.AZURE_URL + '/api/webhook',
                    method: "GET",
                    token: "Required",
                    access: "Private",
                    description: "View our created webhooks"
                },
                create: {
                    url: process.env.AZURE_URL + '/api/webhook',
                    method: "POST",
                    token: "Required",
                    access: "Private",
                    description: "Register: {url: " + process.env.AZURE_URL + " in JSON Format } "
                },
                "view latest sightings": {
                    url: process.env.AZURE_URL + '/api/webhook/view-latest-sightings',
                    method: 'POST',
                    token: 'Required',
                    access: 'Private',
                    description: "View latest changes on our sightings posts"
                },
                delete: {
                    url: process.env.AZURE_URL + '/api/webhook/:id',
                    method: "DELETE",
                    token: "Required",
                    access: "Private",
                    description: " Select a webhook to delete"
                }
            }
        }
    })
}