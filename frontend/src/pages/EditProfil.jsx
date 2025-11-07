import Profil from "../components/Profil";

export default function EditProfil() {
  return (
    <section>
      <h1 className="text-lg md:text-2xl font-bold mb-4 text-black">
        Edit Profil
      </h1>
      <div className="bg-white shadow p-4 md:p-6 rounded text-black">
        <Profil />
      </div>
    </section>
  );
}
