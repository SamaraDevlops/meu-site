import { useEffect, useState } from "react";

export default function Escrever() {
  const [rascunho, setRascunho] = useState("");
  const [posts, setPosts] = useState([]);

  // ID que identifica você (simples)
  const seuIdentificador = "samara"; // Mude se quiser

  // Carregar rascunho salvo
  useEffect(() => {
    const draft = localStorage.getItem("rascunho");
    const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    if (draft) setRascunho(draft);
    setPosts(savedPosts);
  }, []);

  // Salvar rascunho em tempo real
  useEffect(() => {
    localStorage.setItem("rascunho", rascunho);
  }, [rascunho]);

  const handlePublicar = () => {
    if (rascunho.trim() === "") return;
    const novoPost = { texto: rascunho.trim(), data: new Date().toLocaleString() };
    const atualizados = [novoPost, ...posts];
    setPosts(atualizados);
    localStorage.setItem("posts", JSON.stringify(atualizados));
    setRascunho("");
  };

  const handleClear = () => {
    if (window.confirm("Tem certeza que deseja apagar todos os textos?")) {
      localStorage.removeItem("posts");
      setPosts([]);
    }
  };

  const isAutorizado = () => {
    return localStorage.getItem("autorizado") === seuIdentificador;
  };

  // Ativando autorização se você estiver usando agora
  useEffect(() => {
    // Simulação: se estiver usando localmente, ativa
    localStorage.setItem("autorizado", seuIdentificador);
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Novo texto</h1>
      <textarea
        value={rascunho}
        onChange={(e) => setRascunho(e.target.value)}
        placeholder="Escreva aqui seu texto..."
        className="w-full h-40 p-2 border rounded mb-4 resize-none"
      />
      <button
        onClick={handlePublicar}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Publicar
      </button>

      {isAutorizado() && (
        <button
          onClick={handleClear}
          className="ml-4 px-4 py-2 bg-red-400 text-white rounded hover:bg-red-500 transition"
        >
          Apagar tudo
        </button>
      )}

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-2">Postagens</h2>
      {posts.length === 0 ? (
        <p className="text-gray-500">Nenhuma postagem ainda.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post, index) => (
            <li key={index} className="bg-gray-100 p-4 rounded shadow">
              <p className="whitespace-pre-line">{post.texto}</p>
              <p className="text-sm text-gray-500 mt-2">Postado em: {post.data}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
