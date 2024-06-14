"use client";
import useAuth from "@/store/auth/useAuth";

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
  const auth = useAuth();
  return (
    <header className="flex gap-4 border-b p-4">
      {routes.map((route) => (
        <a className="no-underline text-xl" href={route.path} key={route.path}>
          {route.title}
        </a>
      ))}
      {auth.isLogged && (
        <a className="no-underline text-xl" href="/captured">
          Capturados
        </a>
      )}

      <div className="ml-auto flex gap-4 text-sm">
        {auth.isLogged ? (
          <>
            <p className="flex justify-center items-center">
              Usuario: {auth.user?.username}
            </p>
            <button
              className="hover:underline text-sm"
              onClick={() => auth.clearUser()}
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <a href="/">Iniciar sesión</a>
        )}
      </div>
    </header>
  );
}
