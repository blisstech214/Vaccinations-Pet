import { useState, useEffect } from "react";
import api from "../utils/api";

const AddVaccinationForm = ({ onVaccinationAdded }) => {
  const [pets, setPets] = useState([]);
  const [petId, setPetId] = useState("");
  const [type, setType] = useState("");
  const [lastCompleted, setLastCompleted] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    const fetchPets = async () => {
      const res = await api.get("/pets");
      setPets(res.data);
    };
    fetchPets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/vaccinations", {
      petId,
      type,
      lastCompleted,
      dueDate,
    });
    setPetId("");
    setType("");
    setLastCompleted("");
    setDueDate("");
    onVaccinationAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded bg-white shadow-sm">
      <h2 className="h5 mb-4">Add Vaccination</h2>

      <div className="mb-3">
        <label className="form-label">Select Pet</label>
        <select
          className="form-select"
          value={petId}
          onChange={(e) => setPetId(e.target.value)}
          required
        >
          <option value="">-- Choose Pet --</option>
          {pets.map((pet) => (
            <option key={pet._id} value={pet._id}>
              {pet.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Vaccination Type</label>
        <input
          type="text"
          className="form-control"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Last Completed</label>
        <input
          type="date"
          className="form-control"
          value={lastCompleted}
          onChange={(e) => setLastCompleted(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Due Date</label>
        <input
          type="date"
          className="form-control"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Add Vaccination
      </button>
    </form>
  );
};

export default AddVaccinationForm;
