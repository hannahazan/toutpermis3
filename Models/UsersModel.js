import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
    {
        Name:String,
        Prenom:String,
        Mail:String,
        Password:String,
        PhoneNumber:Number,
        Ecole:Boolean,
        Medecin:Boolean,
        Aménageur:Boolean,
        UserPicture:String,
        Initiales:String
    });
 
     
 const Users= mongoose.model('Users',UserSchema);
 
 
 export default Users;