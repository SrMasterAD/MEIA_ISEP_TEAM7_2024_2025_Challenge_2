const Home = () => {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h2>Descubra o Vinho Ideal para Cada Ocasião</h2>
          <p>
            Explore nossa classificação de vinhos ou crie um ranking
            personalizado de acordo com seus critérios.
          </p>
          <div className="buttons">
            <a href="../ranking/ranking.html" className="btn">
              Ranking
            </a>
            <a href="../classification/classification.html" className="btn">
              Classificação
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
