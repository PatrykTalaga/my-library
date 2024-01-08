import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  id: String,
  userName: String,
  email: String,
  password: String,
  role: String,
});

const User = models.User || model("User", userSchema);

export default User;

/* 



{
  "_id": {
    "$oid": "659bb6dcd3e4a686f7a2e6ce"
  },
"id": "117as23312aas1",
"userName": "admin",
"password": "alf123",
"role": "Admin"
}

 */
