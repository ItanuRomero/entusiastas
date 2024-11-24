import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);

  const responseBody = await response.json();

  return responseBody;
}

export default function Status() {
  const { data, isLoading, error } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  if (error) return <h1>Algo deu errado, tente novamente mais tarde.</h1>;

  return (
    <>
      <h1>Status</h1>
      {isLoading ? (
        <div>Carregando...</div>
      ) : (
        <>
          <UpdatedAt updatedAt={data.updated_at} />
          <Services dependencies={data.dependencies} />
        </>
      )}
    </>
  );
}

function UpdatedAt({ updatedAt }) {
  return <p>Atualizado em: {new Date(updatedAt).toLocaleString()}</p>;
}

function Services({ dependencies }) {
  return (
    <div>
      <h2>Serviços:</h2>
      <ul>
        {Object.entries(dependencies).map(([key, dependency]) => (
          <li key={key}>
            <h3>{key}</h3>
            {dependency.error ? (
              <Error error={dependency.error} />
            ) : (
              <Dependency dependency={dependency} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Dependency({ dependency }) {
  return (
    <>
      <h4 style={{ color: "green" }}>Status: Em funcionamento</h4>
      <p>Versão: {dependency.version}</p>
      <p>Número máximo de conexões: {dependency.max_connections}</p>
      <p>Conexões abertas: {dependency.opened_connections}</p>
    </>
  );
}

function Error({ error }) {
  return (
    <>
      <h4 style={{ color: "red" }}>Status: Erro ao tentar conectar</h4>
      <p>Erro: {error}</p>
    </>
  );
}
