function Header({ onShowCreatePage, onShowDraftPage, isAdmin, onLogout, onNavigate }) {
  return (
    <header className="blog-header">
      <div className="header-content">
        <h1 className="blog-title">Clube Xavier</h1>
        <p className="blog-subtitle">Um blog para mentes inquietas e ideias livres.</p>
        <nav className="main-nav">
          <button className="button" onClick={() => onNavigate('home')}>Home</button>
          <button className="button" onClick={() => onNavigate('diario')}>Diário</button>
          <button className="button" onClick={() => onNavigate('conteudo')}>Conteúdo</button>
          <button className="button" onClick={() => onNavigate('referencias')}>Referências</button>
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