const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                productId: {type: Schema.Types.ObjectId, ref: 'Product', required: true },
                quantity: {type: Number, required: true}
            }
        ]
    }

});

// class User {
//     constructor(username, email) {
//         this.name = username;
//         this.email = email;
//     }

//     save() {
//         const db = getDb();
//         return db.collection('users').insertOne(this);
//     }

//     static findById(userId){
//         const db = getDb();
//         return db
//             .collection('users')
//             .findOne({_id:new mongoDb.ObjectId(userId)})
//     }
// }

module.exports = mongoose.model('User', userSchema);