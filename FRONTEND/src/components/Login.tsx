"use client";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookie from "js-cookie";
const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  //const { login } = useUser();
  const router = useRouter();
  const auth = useAuth();
  const handleSubmit = (e: any) => {
    event.preventDefault();
    try {
      auth
        .signIn(username, password)
        .then(() => {
          if (auth.user?.rol === "admin") {
            router.push("/dashboard-admin");
          } else if (auth.user?.rol === "customer") {
            router.push("/dashboard-customer");
          }
        })
        .catch((error: any) => {
          alert(`onRejected function called: ${error.message}`);
        });

      setUsername("");
      setPassword("");
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    // Comprueba si hay una cookie de sesión al cargar la página
    const authToken = Cookie.get("token");
    // Si hay una sesión, redirige al usuario a otra página (por ejemplo, la página de inicio)
    if (authToken) {
      router.push("/dashboard");
    }
  }, []);

  return (
    <div className="hero min-h-screen bg-base-100">
      <ToastContainer />
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left ">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-md shadow-2xl bg-slate-700 m-9">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                //value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label className="label">
                <Link href="/recoveryPassword">Forgot password?</Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
