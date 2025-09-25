import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// --- COMPONENTES DO BLOG ---

function Header({ onShowCreatePage, onShowDraftPage, isAdmin, onLogout, onNavigate }) {
  return (
    <header className="blog-header">
      <div className="header-content">
        <h1 className="blog-title">Clube Xavier</h1>
        <p className="blog-subtitle">Um blog para mentes inquietas e ideias livres.</p>
        <nav className="main-nav">
          <button onClick={() => onNavigate('home')}>Home</button>
          <button onClick={() => onNavigate('diario')}>Diário</button>
          <button onClick={() => onNavigate('conteudo')}>Conteúdo</button>
          <button onClick={() => onNavigate('referencias')}>Referências</button>
        </nav>
      </div>
      {isAdmin && (
        <div className="admin-actions">
          <button className="button" onClick={onShowCreatePage}>✍️ Escrever Novo Post</button>
          <button className="button" onClick={onShowDraftPage}>📝 Rascunho</button>
          <button className="button logout-button" onClick={onLogout}>Sair</button>
        </div>
      )}
    </header>
  );
}

function PostExcerpt({ post, onSelect, onEdit, onDelete, isAdmin }) {
  const handleDelete = () => {
    if (window.confirm(`Tem certeza que deseja apagar o post "${post.title}"?`)) {
      onDelete(post.id);
    }
  };
  return (
    <article className="post-excerpt" key={post.id}>
      <div className="post-excerpt-content" onClick={() => onSelect(post)}>
        <h2>{post.title}</h2>
        <p>{post.excerpt}</p>
        <span className="read-more">Ler mais...</span>
      </div>
      {isAdmin && (
        <div className="post-actions">
          <button className="edit-button" onClick={() => onEdit(post)}>✏️</button>
          <button className="delete-button" onClick={handleDelete}>🗑️</button>
        </div>
      )}
    </article>
  );
}

function PostList({ posts, onSelect, onEdit, onDelete, isAdmin }) {
  if (posts.length === 0) {
    return <p className="empty-message">Nenhum post publicado ainda. Seja o primeiro!</p>;
  }
  return (
    <div className="post-list">
      {posts.map(post => (
        <PostExcerpt key={post.id} post={post} onSelect={onSelect} onEdit={onEdit} onDelete={onDelete} isAdmin={isAdmin} />
      ))}
    </div>
  );
}

function PostDetail({ post, onBack }) {
  return (
    <div className="post-detail">
      <button className="back-button" onClick={onBack}>← Voltar para todos os posts</button>
      <article>
        <h2>{post.title}</h2>
        <p className="post-detail-excerpt"><i>{post.excerpt}</i></p>
        <div className="post-detail-content" style={{ whiteSpace: 'pre-wrap' }}>{post.content}</div>
      </article>
    </div>
  );
}

function CriarPostPage({ onBack, onCreate }) {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleCreate = () => {
    if (!title.trim() || !excerpt.trim() || !content.trim()) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    onCreate({ id: Date.now(), title, excerpt, content });
  };

  return (
    <div className="form-page-container">
      <button className="back-button" onClick={onBack}>← Voltar</button>
      <h2>Criar Novo Post</h2>
      <input type="text" placeholder="Título do post" value={title} onChange={e => setTitle(e.target.value)} />
      <input type="text" placeholder="Resumo (um parágrafo)" value={excerpt} onChange={e => setExcerpt(e.target.value)} />
      <textarea placeholder="Conteúdo completo do post..." value={content} onChange={e => setContent(e.target.value)} rows={12} />
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleCreate} className="button publish-button">Publicar Post</button>
    </div>
  );
}

function EditarPostPage({ onBack, onSave, post }) {
  const [title, setTitle] = useState(post.title);
  const [excerpt, setExcerpt] = useState(post.excerpt);
  const [content, setContent] = useState(post.content);
  const [error, setError] = useState('');
  
  const handleSave = () => {
    if (!title.trim() || !excerpt.trim() || !content.trim()) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    onSave({ ...post, title, excerpt, content });
  };

  return (
    <div className="form-page-container">
      <button className="back-button" onClick={onBack}>← Voltar</button>
      <h2>Editar Post</h2>
      <input type="text" placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} />
      <input type="text" placeholder="Resumo" value={excerpt} onChange={e => setExcerpt(e.target.value)} />
      <textarea placeholder="Conteúdo" value={content} onChange={e => setContent(e.target.value)} rows={12} />
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleSave} className="button save-button">Salvar Alterações</button>
    </div>
  );
}

function RascunhoPage({ onBack }) {
  const [text, setText] = useState(() => localStorage.getItem('rascunho') || '');

  useEffect(() => {
    localStorage.setItem('rascunho', text);
  }, [text]);
  
  const clearDraft = () => {
    localStorage.removeItem('rascunho');
    setText('');
  };
  
  return (
    <div className="form-page-container draft-page">
      <button className="back-button" onClick={onBack}>← Voltar</button>
      <h2>Rascunho Rápido</h2>
      <p>Este texto é salvo automaticamente no seu navegador.</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Suas ideias começam aqui..."
        rows={15}
      />
      <div className="draft-actions">
        <span className="save-status">Salvo!</span>
        <button onClick={clearDraft} className="button clear-button">🗑️ Limpar Rascunho</button>
      </div>
    </div>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="blog-footer">
      <p>&copy; {currentYear} Samara Gonçalves - Clube Xavier</p>
    </footer>
  );
}

// --- COMPONENTE PRINCIPAL DO BLOG ---
export default function Blog() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(() => {
      const saved = localStorage.getItem('posts');
      return saved ? JSON.parse(saved) : [
        { id: 1, title: 'Bem-vindo ao Clube Xavier', excerpt: 'Este é um espaço para ideias raras, reflexões e pensamentos livres.', content: 'Aqui você vai encontrar textos sobre tudo que passa pela mente de quem pensa diferente.' },
        { id: 2, title: 'Meu segundo post', excerpt: 'Continuo escrevendo sobre assuntos diversos, sem regras e sem temas fixos.', content: 'O Clube Xavier é um lugar para explorar tudo o que inspira e inquieta.' }
      ];
  });
  const [view, setView] = useState({ name: 'list' });
  const [isAdmin] = useState(true);

  useEffect(() => {
      localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const handleLogout = () => {
      localStorage.removeItem('authToken');
      navigate('/login');
  };

  const addPost = (newPost) => { setPosts([newPost, ...posts]); setView({ name: 'list' }); };
  const updatePost = (updatedPost) => { setPosts(posts.map(post => post.id === updatedPost.id ? updatedPost : post)); setView({ name: 'list' }); };
  const deletePost = (id) => { setPosts(posts.filter(post => post.id !== id)); if (view.name === 'post' && view.postId === id) { setView({ name: 'list' }); } };
  
  const handleNavigate = (page) => {
    if (page === 'home' || page === 'diario' || page === 'conteudo' || page === 'referencias') {
      setView({ name: 'list' });
    }
  };

  const renderContent = () => {
    switch (view.name) {
      case 'post':
        const postToView = posts.find(p => p.id === view.postId);
        return postToView ? <PostDetail post={postToView} onBack={() => setView({ name: 'list' })} /> : null;
      case 'create':
        return <CriarPostPage onBack={() => setView({ name: 'list' })} onCreate={addPost} />;
      case 'edit':
        const postToEdit = posts.find(p => p.id === view.postId);
        return postToEdit ? <EditarPostPage post={postToEdit} onBack={() => setView({ name: 'list' })} onSave={updatePost} /> : null;
      case 'draft':
        return <RascunhoPage onBack={() => setView({ name: 'list' })} />;
      case 'list':
      default:
        return <PostList posts={posts} isAdmin={isAdmin} onSelect={(post) => setView({ name: 'post', postId: post.id })} onEdit={(post) => setView({ name: 'edit', postId: post.id })} onDelete={deletePost}/>;
    }
  };

  return (
    <div className="app-container">
      <Header
        isAdmin={isAdmin}
        onShowCreatePage={() => setView({ name: 'create' })}
        onShowDraftPage={() => setView({ name: 'draft' })}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
      />
      <main className="container">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}