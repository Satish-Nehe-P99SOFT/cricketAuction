import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { login } from "../services/auth.service";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Form from "../components/Form";
import { UserContext } from "../hooks/UserContext";
import {
  handleEmailChange,
  handlePasswordChange,
} from "../utilities/handleChanges";

const Login = (props) => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    form: "",
  });

  const message = () => {
    return (
      <div className="flex flex-col items-center gap-4 mt-6 pt-6 border-t border-white/10">
        <div className="text-center">
          <span className="text-text-secondary text-sm">New User? </span>
          <Link
            to="/signup"
            className="text-primary hover:text-primary-light font-semibold text-sm transition-colors duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </div>

        <div className="text-center">
          <Link
            to="/reset/forgot"
            className="text-text-muted hover:text-primary text-sm transition-colors duration-200 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
      </div>
    );
  };

  const data = [
    {
      type: "email",
      title: "Email",
      placeholder: "Enter your email",
      onChange: (value) => {
        handleEmailChange(value, setEmail, setErrors);
      },
      icon: faEnvelope,
      error: errors.email,
    },
    {
      type: "password",
      title: "Password",
      placeholder: "Enter your Password",
      onChange: (value) => {
        handlePasswordChange(value, setPassword, setErrors);
      },
      icon: faLock,
      error: errors.password,
    },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (errors.email !== "" || errors.password !== "") {
      return;
    }

    setLoading(true);
    const data = await login(email, password);
    setLoading(false);
    if (!data.success) {
      return setErrors((prev) => ({
        ...prev,
        form: data.message,
      }));
    }

    setErrors((prev) => ({
      ...prev,
      form: "",
    }));

    setUser(data.user);
    props.history.push("/auction");
  };
  return (
    <Form
      title="Login"
      data={data}
      onFormSubmit={handleSubmit}
      message={message}
      error={errors.form}
      loading={loading}
    />
  );
};

export default Login;
