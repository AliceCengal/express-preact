import { h } from "preact";
import { route } from "preact-router";
import { AuthForm, postLogin, postRegister } from "controllers/auth";
import useForm from "utils/use-form";
import style from "./style.css";

export default function Login() {
  const { formData, update } = useForm<AuthForm>({
    email: "",
    password: "",
  });

  function handleSubmit(e: any) {
    e.preventDefault();
    if (e.submitter.name == "login") doLogin();
    else if (e.submitter.name == "register") doRegister();
  }

  function doLogin() {
    postLogin(formData)
      .then((res) => {
        console.log(res);
        route("/profile");
      })
      .catch((err) => {
        console.error(err);
        alert(err);
      });
  }

  function doRegister() {
    postRegister(formData)
      .then((res) => {
        console.log(res);
        route("/profile");
      })
      .catch((err) => {
        console.error(err);
        alert(err);
      });
  }

  return (
    <div class="container-lg">
      <form
        class={style.login + " card-1"}
        onChange={update}
        onSubmit={handleSubmit}
      >
        <label>Email</label>
        <input type="email" name="email" required />

        <label>Password</label>
        <input type="password" name="password" required />

        <div class={style.action}>
          <button type="submit" name="register">
            REGISTER
          </button>
          <button type="submit" name="login">
            LOG IN
          </button>
        </div>
      </form>
    </div>
  );
}
