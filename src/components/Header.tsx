const routes = [
  {
    title: "Inicio",
    path: "/",
  },
  {
    title: "Pokedex",
    path: "/pokedex",
  },
];

export default function Header() {
  return (
    <header className="flex gap-4 border-b p-4">
      {routes.map((route) => (
        <a className="no-underline text-xl" href={route.path} key={route.path}>
          {route.title}
        </a>
      ))}
    </header>
  );
}
