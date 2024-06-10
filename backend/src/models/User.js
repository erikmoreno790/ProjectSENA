const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


// Esquema para los elementos
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    enum: ['Customer', 'Supplier', 'Admin'],
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: false
    }
  },
  profilePhoto: {
    type: String,
    default: null
  },
  services: [{
    type: Schema.Types.ObjectId,
    ref: 'Service'
  }]
});

//Índice espacial para el campo de ubicación
userSchema.index({location:'2dsphere'})

// Método para comparar la contraseña ingresada con la contraseña almacenada en la base de datos
userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};


module.exports = mongoose.models.User || mongoose.model('User', userSchema)

