import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
    {
        Name:String,
        Prenom:String,
        Mail:{type: String, index:{sparse:true,unique:true}},
        Password:{type:String,require:true},
        PhoneNumber:Number,
        Ecole:Boolean,
        Medecin:Boolean,
        Aménageur:Boolean,
        UserPicture:String,
        Initiales:String,     
    });
 
 
 

 const Users= mongoose.model('Users',UserSchema);
 
 
 export default Users;