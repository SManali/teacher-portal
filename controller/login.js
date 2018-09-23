const credentials = require('../models/user-credentials');

const checkIfExist = (userId) => {
    return new Promise((resolve, reject) => {
        console.log(userId.toLowerCase());
        const query = {
            userId: userId.toLowerCase()
        }
        credentials.find(query, (err, doc) => {
            console.log(doc);
            if (err) {
                reject(new Error('Error while quering database'));
            } else if (doc.length > 0) {
                reject(new Error("User already exits"));
            } else {
                resolve(doc)
            }
        });
    });
}

const addUser = (userId, password) => {
    return new Promise((resolve, reject) => {
        checkIfExist(userId).then(() => {
            const data = {
                userId: userId.toLowerCase(),
                password: password,
                created_at: new Date()
            };
            credentials.create(data, (err) => {
                if (err) {
                    reject(new Error("Unable to create user Id"));
                } else {
                    resolve("user created successfully");
                }
            })
        }, (err) => {
            reject(err);
        });
    });
}

const isAuthenticate = (userId, password) => {
    return new Promise((resolve, reject) => {
        const data = {
            userId: userId.toLowerCase(),
            password: password
        }
        credentials.find(data, (err, doc) => {
            if (err || doc.length === 0) {
                reject(new Error("User is not authenticate"));
            } else {
                resolve("User is Authenticate");
            }
        });
    });
}

module.exports = {
    addUser,
    isAuthenticate
};