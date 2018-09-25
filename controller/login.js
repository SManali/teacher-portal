const credentials = require('../models/user-credentials');
const { createToken } = require('./controller/token')

const checkIfExist = (userId) => {
    return new Promise((resolve, reject) => {
        const query = {
            userId: userId.toLowerCase()
        }
        credentials.find(query, (err, doc) => {
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

const authenticateUser = (userId, password) => {
    return new Promise((resolve, reject) => {
        const data = {
            userId: userId.toLowerCase(),
            password: password
        }
        credentials.find(data, (err, doc) => {
            if (err || doc.length === 0) {
                reject(new Error("User is not authenticate"));
            } else {
                createToken(userId).then((token) => {
                    resolve(token);
                }, err => {
                    reject(new Error("Error in creating authentication token"))
                });
            }
        });
    });
}

module.exports = {
    addUser,
    authenticateUser
};