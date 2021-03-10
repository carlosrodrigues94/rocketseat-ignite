export function RepositoryItem(props) {
  return (
    <li>
      <strong>{props.repository.name ?? "default"}</strong>

      <a href={props.repository.link}>Acessar repositorio</a>
    </li>
  );
}
