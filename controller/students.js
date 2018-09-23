const studentSchema = require('../models/student');
const uniqid = require('uniqid');

const addStudent = (details) => {
    return new Promise((resolve, reject) => {
        const data = {
            created_at: new Date(),
            created_by: details.userId,
            full_name: details.fullName,
            data_of_birth: details.DOB,
            school: details.school,
            class: details.class,
            division: details.division,
            is_active: details.isActive,
            is_deleted: details.isDeleted,
            uniqueId : getUniqueID()
        }
        studentSchema.create(data, (err, doc) => {
            if (err) {
                reject(new Error("Error in add Student,", err))
            } else {
                resolve("new student add successfully");
            }
        });
    });
}
const deleteStudent = (studentId) => {
    return new Promise((resolve, reject) => {
        studentSchema.update({
            studentId: studentId
        }, {
                is_deleted: true
            }, (err, doc) => {
                if (err) {
                    reject(new Error("Student is not deleted."));
                } else {
                    resolve(doc);
                }
            });
    });
}

const getUniqueID = () => {
    return uniqid('student-');
}

const getAllStudent = () => {
    return new Promise((resolve, reject) => {
        //Return all student which are not deleted and active
        studentSchema.find({
            is_deleted: { $not: true },
            is_active: { $not: false }
        }, (err, doc) => {
            if (err) {
                reject(new Error("Error: while fetching students details"));
            } else {
                resolve(doc);
            }
        })
    });
}

module.exports = {
    addStudent,
    deleteStudent,
    getAllStudent
}

