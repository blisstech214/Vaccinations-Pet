import Link from "next/link";

export default function Home() {
  return (
    <div className="container text-center py-5">
      <h1 className="display-4 text-primary mb-4">Pet Vaccination Tracker</h1>
      <p className="lead mb-4">
        Keep track of your pets’ vaccinations, never miss an important dose, and stay on top of due dates.
      </p>
      <div className="d-flex justify-content-center gap-3">
        <Link href="/pet" className="btn btn-primary px-4">
          View Vaccinations
        </Link>
        <Link href="/create-pet" className="btn btn-success px-4">
          Add New Pet
        </Link>
      </div>
    </div>
  );
}
