import useSWR from "swr";

import styles from "./styles.module.css";
import { fetchAPI } from "utils/fetchAPI";
import { DependencyStatus } from "components/DependencyStatus";

export default function Status() {
  const { data, isLoading, error } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  if (error) return <h1>Algo deu errado, tente novamente mais tarde.</h1>;

  return (
    <div className={styles.container}>
      <h1>Status</h1>
      <UpdatedAt updatedAt={data?.updated_at} isLoading={isLoading} />
      <Services dependencies={data?.dependencies} isLoading={isLoading} />
    </div>
  );
}

function UpdatedAt({ updatedAt, isLoading }) {
  if (isLoading) return <p>Atualizando...</p>;
  return <p>Atualizado em: {new Date(updatedAt).toLocaleString()}</p>;
}

function Services({ dependencies, isLoading }) {
  return (
    <div>
      <h2>Serviços:</h2>
      <div className={styles.container}>
        {dependencies && !isLoading
          ? Object.entries(dependencies).map(([key, dependency]) => (
              <div key={key}>
                <DependencyStatus
                  name={key}
                  error={dependency.error}
                  data={dependency}
                  isLoading={isLoading}
                />
              </div>
            ))
          : "Carregando..."}
      </div>
    </div>
  );
}
