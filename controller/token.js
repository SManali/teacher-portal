const tokenSchema = require('../models/token');
const uniqid = require('uniqid');

const getToken = (userId) => {
    return new Promise((resolve, reject) => {
        getUserToken(userId).then((doc) => {
            if (doc.length === 0) {
                const token = _createNewToken();

            }
        }, err => {
            reject(err);
        });
    });
}

const _createNewToken = () => {
    return uniqid('token-');
}

const _updateToken = (data) => {
    return new Promise((resolve, reject) => {

    });
}

const validateToken = (userId, tokenId) => {
    return new Promise((resolve, reject) => {
        tokenSchema.find({
            userId: userId,
            tokenId: tokenId
        }, (err, doc) => {

        });
    });
}

const getUserToken = (userId) => {
    return new Promise((resolve, reject) => {
        tokenSchema.find({
            userId: userId
        }, (err, doc) => {
            if (err) {
                reject(new Error("Error fetching token"));
            } else {
                resolve(doc);
            }
        });
    });
}

const updateToken = (tokenId) => {

}
module.exports = {
    getToken,
    validateToken,
    updateToken
}