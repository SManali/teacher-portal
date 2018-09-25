const tokenSchema = require('../models/token');
const uniqid = require('uniqid');

const createToken = (userId) => {
    return new Promise((resolve, reject) => {
        getUserToken(userId).then((doc) => {
            if (doc.length === 0) {
                const token = _createNewToken();
                saveToken(userId, token).then(() => {
                    resolve(token)
                }, err => {
                    reject(err);
                });
            } else {
                const token = doc.token;
                validateToken(userId, token).then(() => {
                    resolve(doc.tokenId);
                }, err => {
                    //If token is present and if its invalid,then create new token, to avoid un authorised 
                    const token = _createNewToken();
                    const token = _createNewToken();
                    saveToken(userId, token).then(() => {
                        resolve(token)
                    }, err => {
                        reject(err);
                    });
                });
            }
        }, err => {
            reject(err);
        });
    });
}

const _createNewToken = () => {
    return uniqid('token-');
}

const validateToken = (userId, tokenId) => {
    return new Promise((resolve, reject) => {
        tokenSchema.find({
            userId: userId,
            tokenId: tokenId
        }, (err, doc) => {
            if (err || doc.length === 0) {
                reject(err || new Error('invalid token'));
            } else {
                const lastUpdated = doc.updated_at;
                if (new Date() - lastUpdated <= process.env.TOKEN_VALID_TIME) {
                    resolve(`${tokenId} for ${userId} is valid`)
                } else {
                    reject('invalid token');
                }
            }
        });
    });
}
const saveToken = (userId, token) => {
    return new Promise((resolve, reject) => {
        tokenSchema.update({
            userId: userId,
            token: token,
            updated_at: new Date()
        }, (err, doc) => {
            if (err) {
                reject(new Error("Error while updating token"))
            } else {
                resolve(doc);
            }
        });
    });
}

const updateToken = (userId, tokenId) => {
    return new Promise((resolve, reject) => {
        validateToken(userId, tokenId).then(() => {
            saveToken(userId, tokenId).then((token) => {
                resolve(token);
            }, err => {
                reject(err);
            });
        }, err => {
            reject(err);
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

module.exports = {
    // getToken,
    validateToken,
    updateToken,
    createToken
}