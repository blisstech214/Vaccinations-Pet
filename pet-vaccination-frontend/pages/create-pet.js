// pages/create-pet.js
import { useState } from "react";
import api from "../utils/api";
import { useRouter } from "next/router";

export default function CreatePetPage() {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/pets", { name, birthDate });
      setMessage("Pet created successfully!");
      setName("");
      setBirthDate("");
      router.push("/");
    } catch (err) {
      console.error(err);
      setMessage("Failed to create pet.");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="card-title h4 mb-4 text-center">Add New Pet</h1>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="petName" className="form-label fw-semibold">
                    Pet Name
                  </label>
                  <input
                    type="text"
                    id="petName"
                    required
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Buddy"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="birthDate" className="form-label fw-semibold">
                    Birth Date
                  </label>
                  <input
                    type="date"
                    id="birthDate"
                    required
                    className="form-control"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                  />
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Create Pet
                  </button>
                </div>
              </form>

              {message && (
                <div className="alert alert-info mt-4" role="alert">
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
