import Image from "next/image";
import Link from "next/link";

function Home() {
  return (
    <>
      <section
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          height: "100vh",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1>
            Escreva sobre o que você é <strong>entusiasta</strong>
          </h1>
          <p>
            Ainda estamos trabalhando nisso... Mas você já pode ver a página de{" "}
            <Link href={"/status"}>/status</Link>
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Image
            style={{ borderRadius: "9999px" }}
            width={200}
            height={200}
            alt="Foto de Itanú Romero"
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
