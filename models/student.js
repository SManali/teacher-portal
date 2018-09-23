const mongoose = require('mongoose');
const StudentModel = new mongoose.Schema({
    created_at:{type:Date},
    updated_at:{type:Date},
    created_by: {type: String},
    updated_by: {type:String},
    full_name: {type: String},
    date_of_birth: {type: Date},
    school: {type: String},
    class : {type: String},
    division:{type:String},
    is_active: {type: Boolean},
    is_deleted:{type: Boolean},
    uniqueId:{type: String}
});

module.exports = mongoose.model("studentsDetails", StudentModel);