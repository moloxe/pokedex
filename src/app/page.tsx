"use client";
import useAuth from "@/store/auth/useAuth";
import { FormEvent } from "react";

export default function Home() {
  const auth = useAuth();

  function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    auth.login(username, password);
  }

  if (auth.isLoading) <>Cargando :D</>;
  console.log(auth.isLogged);
  console.log(auth.user?.username);

  if (auth.isLogged) <h1>Hola {auth.user?.username}</h1>;

  return (
    <form
      className="flex flex-col rounded-lg gap-4 p-8 bg-white bg-opacity-10 m-auto w-full max-w-[640px]"
      onSubmit={login}
    >
      <h1>Ingresar</h1>
      <input
        className="rounded"
        type="text"
        name="username"
        placeholder="Nombre de usuario"
      />
      <input type="password" placeholder="Contraseña" />
      <button type="submit" className="p-2 bg-primary rounded">
        Ingresar
      </button>
    </form>
  );
}
