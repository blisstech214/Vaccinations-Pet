import { useEffect, useState } from "react";
import api from "../utils/api";
import AddVaccinationForm from "../components/AddVaccinationForm";

const VaccinationPage = () => {
  const [vaccinations, setVaccinations] = useState([]);
  const [filteredVaccinations, setFilteredVaccinations] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchVaccinations = async () => {
    const res = await api.get("/vaccinations");
    setVaccinations(res.data);
    setFilteredVaccinations(res.data); // default to all
  };

  useEffect(() => {
    fetchVaccinations();
  }, []);

  // 🔄 Filter when statusFilter or vaccinations change
  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredVaccinations(vaccinations);
    } else {
      const filtered = vaccinations.filter((v) => v.status === statusFilter);
      setFilteredVaccinations(filtered);
    }
  }, [statusFilter, vaccinations]);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Vaccination Records</h2>

      <AddVaccinationForm onVaccinationAdded={fetchVaccinations} />

      {/* 🔽 Filter Dropdown */}
      <div className="mb-3">
        <label className="form-label fw-semibold">Filter by Status:</label>
        <select
          className="form-select w-auto"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="completed">✅ Completed</option>
          <option value="due soon">⚠️ Due Soon</option>
          <option value="overdue">❌ Overdue</option>
        </select>
      </div>

      {/* 📋 Vaccination Table */}
      <table className="table table-bordered table-striped mt-3">
        <thead className="table-light">
          <tr>
            <th>Pet</th>
            <th>Type</th>
            <th>Last Completed</th>
            <th>Due Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredVaccinations.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center text-muted">
                No records found for selected filter.
              </td>
            </tr>
          ) : (
            filteredVaccinations.map((v) => (
              <tr key={v._id}>
                <td>{v.petId?.name}</td>
                <td>{v.type}</td>
                <td>{new Date(v.lastCompleted).toLocaleDateString()}</td>
                <td>{new Date(v.dueDate).toLocaleDateString()}</td>
                <td>
                  <span
                    className={`badge ${
                      v.status === "completed"
                        ? "bg-success"
                        : v.status === "due soon"
                        ? "bg-warning text-dark"
                        : "bg-danger"
                    }`}
                  >
                    {v.status === "completed"
                      ? "✅ Completed"
                      : v.status === "due soon"
                      ? "⚠️ Due Soon"
                      : "❌ Overdue"}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VaccinationPage;
