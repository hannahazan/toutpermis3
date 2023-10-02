import mongoose from "mongoose";
const MessUtilSchema = new mongoose.Schema(
    {
        ListeUtil:Object,
    });
 
 
 

 const MessUtil= mongoose.model('MessUtil',MessUtilSchema);
 
 
 export default MessUtil;