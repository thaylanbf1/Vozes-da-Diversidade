import mongoose from "mongoose";

const denunciaSchema = new mongoose.Schema({
  occurenceType: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  wantsSupport: {
    type: Boolean,
    default: false,
  },
  contactMethod: {
    type: String,
    default: "",
  },
  contactEmail: {
    type: String,
    default: "",
  },
  contactPhone: {
    type: String,
    default: "",
  },
  contactPreferredTime: {
    type: String,
    default: "",
  },
  protocol: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Denuncia = mongoose.model("Denuncia", denunciaSchema);

export default Denuncia;
