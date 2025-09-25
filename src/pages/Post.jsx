function MenuPage() {
  const sabores = [
    'Carne',
    'Queijo',
    'Frango com Catupiry',
    'Calabresa',
    'Pizza',
    'Bauru',
    'Palmito',
    'Chocolate',
    'Romeu e Julieta',
    'Banana com Canela'
  ];

  return (
    <section className="menu">
      <h2>Cardápio Completo</h2>
      <ul>
        {sabores.map((sabor, index) => (
          <li key={index}>
            <strong>{sabor}</strong> — R$ 11,00
          </li>
        ))}
      </ul>
    </section>
  );
}

export default MenuPage;
