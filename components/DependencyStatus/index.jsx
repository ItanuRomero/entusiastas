import { CheckCircle, WarningCircle } from "@phosphor-icons/react/dist/ssr";

import styles from "./styles.module.css";

export function DependencyStatus({ name, data, isLoading, error }) {
  if (error) return <Error name={name}>{error}</Error>;

  return (
    <div className={styles.container}>
      <div>
        <h3 className={styles.title}>
          {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
        </h3>
        <Details>
          <p>
            Versão:{" "}
            <IsLoadingOrData data={data.version} isLoading={isLoading} />
          </p>
          <p>
            Número máximo de conexões:{" "}
            <IsLoadingOrData
              data={data.max_connections}
              isLoading={isLoading}
            />
          </p>
          <p>
            Conexões abertas:{" "}
            <IsLoadingOrData
              data={data.opened_connections}
              isLoading={isLoading}
            />
          </p>
        </Details>
      </div>
      <div className={styles.icon}>
        <CheckCircle fill="green" size={32} />
      </div>
    </div>
  );
}

function Error({ children, name }) {
  return (
    <div className={styles.container}>
      <div>
        <h3 className={styles.title}>
          {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
        </h3>
        <Details>
          <p>Erro: {children}</p>
        </Details>
      </div>
      <div className={styles.icon}>
        <WarningCircle size={32} />
      </div>
    </div>
  );
}

function Details({ children }) {
  return (
    <details>
      <summary className={styles.clickable}>
        Clique aqui para ver detalhes
      </summary>
      {children}
    </details>
  );
}

function IsLoadingOrData({ data, isLoading }) {
  return isLoading ? "Carregando..." : data;
}
