const mongoose = require("mongoose");

const VaccinationSchema = new mongoose.Schema({
  petId: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },
  type: { type: String, required: true },
  lastCompleted: { type: Date, required: true },
  dueDate: { type: Date, required: true }, // ✅ manually entered
});

// Calculate status using dueDate directly
VaccinationSchema.virtual("status").get(function () {
  const today = new Date();
  const diffInMs = this.dueDate - today;
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  if (diffInDays <= 0) return "overdue";
  if (diffInDays <= 30) return "due soon";
  return "completed";
});

VaccinationSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Vaccination", VaccinationSchema);
