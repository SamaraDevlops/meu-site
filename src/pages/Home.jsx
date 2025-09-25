import { useEffect, useState } from 'react';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('posts'));
    if (savedPosts) setPosts(savedPosts);
  }, []);

  return (
    <div className="container p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Clube Xavier - Posts Recentes</h1>

      {posts.length === 0 && <p>Nenhum post publicado ainda.</p>}

      {posts.map(post => (
        <div key={post.id} className="border p-4 rounded mb-4">
          <h2 className="text-xl font-semibold">{post.titulo}</h2>
          <p className="text-gray-600 text-sm mb-2">{post.data}</p>
          <p>{post.conteudo}</p>
        </div>
      ))}
    </div>
  );
}
