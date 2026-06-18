import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useForm } from "react-hook-form";

export default function LoginModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const { login } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data.email === "admin@gmail.com" && data.password === "123456") {
      login(data.email, data.password);
      reset();
      onClose();
    } else {
      setError("root.serverError", {
        type: "custom",
        message: "E-posta veya şifre hatalı!",
      });
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content">
          <span className="drawer-close" onClick={handleClose}>
            &times;
          </span>
          <h2 className="form-title">Giriş Yap</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label className="form-label">E-Posta</label>
              <input
                className="form-input"
                type="email"
                placeholder="ahmet@yilmaz.com"
                {...register("email", {
                  required: "E-Posta Zorunludur",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Geçerli e-posta adresi",
                  },
                })}
              />
              {errors.email && (
                <span className="form-error">{errors.email.message}</span>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">Şifre</label>
              <input
                className="form-input"
                placeholder="********"
                type="password"
                {...register("password", {
                  required: "Şifre Zorunludur",
                  minLength: {
                    value: 6,
                    message: "Şifre en az 6 karakter olmalıdır",
                  },
                })}
              />
              {errors.password && (
                <span className="form-error">{errors.password.message}</span>
              )}
            </div>
            <button type="submit" className="form-submit">
              Giriş Yap
            </button>
            {errors.root?.serverError && (
              <span className="form-error mt-3">
                {errors.root.serverError.message}
              </span>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
