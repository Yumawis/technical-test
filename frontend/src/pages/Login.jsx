import { Box, Button, Link, Typography, TextField } from "@mui/material";
import { useLoginMutation } from "../services/authService";
import { Field, Form, Formik } from "formik";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();

  const [login, { data, error, isSuccess, isError, isLoading }] =
    useLoginMutation();

  const handleLogin = (nickname) => {
    login({ nickname });
  };

  useEffect(() => {
    if (isSuccess) navigate("fruits", { state: data });
    if (isError) alert(error?.data?.message);
  }, [data, error, isSuccess, isError]);

  return (
    <Box>
      <Formik
        initialValues={{ nickname: "" }}
        onSubmit={(values) => {
          const nickname = values.email;
          handleLogin(nickname);
        }}
      >
        {({ values, handleChange, handleBlur }) => (
          <Form>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <Field
                fullWidth
                as={TextField}
                name="nickname"
                label="Nombre de usuario"
                placeholder="Ingresa tu nombre de usuario"
                value={values.nickname}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <Button type="submit" disabled={isLoading} variant="contained">
                {!isLoading ? "Iniciar Sesión" : "Cargando..."}
              </Button>

              <Box sx={{ marginTop: "5px", textAlign: "center" }}>
                <Typography variant="body2">
                  ¿No estás registrado?{" "}
                  <Link
                    component={RouterLink}
                    to={"sign-up"}
                    sx={{
                      cursor: "pointer",
                      fontWeight: 600,
                      color: "#1E88E5",
                    }}
                  >
                    {"Regístrate"}
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
