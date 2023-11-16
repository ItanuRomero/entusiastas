function Home() {
  return (
    <>
      <section
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          height: "100vh",
        }}
      >
        <div>
          <h1>
            Escreva sobre o que você é <strong>entusiasta</strong>
          </h1>
          <p>Ainda estamos trabalhando nisso, mas não esqueça de voltar</p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img
            style={{ borderRadius: "9999px", width: "200px" }}
            src="https://avatars.githubusercontent.com/u/66224956?v=4"
          />
          <p>
            Sendo desenvolvido por:{" "}
            <a href="https://github.com/ItanuRomero">Itanú Romero</a>
          </p>
        </div>
      </section>
    </>
  );
}

export default Home;
