export default function CardProfil({
  username = "alsindata@gmail.com",
  fotoUrl = "https://ui-avatars.com/api/?name=Admin&background=4ade80&color=fff&rounded=true",
  onEdit,
}) {
  return (
    <div className="max-w-xs mx-auto bg-white shadow rounded-lg p-6 flex flex-col items-center">
      <img
        src={fotoUrl}
        alt="Foto Profil"
        className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-green-200"
      />
      <div className="text-lg font-semibold mb-2">
        <a
          href={`mailto:${username}`}
          className="hover:underline text-blue-700"
        >
          {username}
        </a>
      </div>
      <button
        onClick={onEdit}
        className="mt-2 px-5 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
      >
        Edit Profil
      </button>
    </div>
  );
}
