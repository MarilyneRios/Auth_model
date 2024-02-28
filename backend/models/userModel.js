import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

//Définir un schéma utilisateur : username, email, pasword
const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique : true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      unique : true
    },
    password: {
      type: String,
      required: true,
    },
  },
  // la date et l’heure de création ou modication du document
  {
    timestamps: true,
  }
);

// Vérifier si le mot de passe saisi = mot de passe haché dans la base de données
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//crypter le mot de passe avec bcrypt avant de le sauvegarder dans la base de données
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
    //  salt pour renforcer la sécurité du hachage du mot de passe
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Création du modèle utilisateur
const UserModel = mongoose.model('User', UserSchema);

export default UserModel;