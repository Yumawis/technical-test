import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useSignUpMutation } from "../services/authService";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SignUp = () => {
  const navigate = useNavigate();

  const [signUp, { data, error, isSuccess, isError, isLoading }] =
    useSignUpMutation();

  const handleSignUp = ({ firstName, lastName, nickname }) => {
    signUp({ firstName, lastName, nickname });
  };

  useEffect(() => {
    if (isSuccess) {
      alert(data?.message);
      navigate("/");
    }
    if (isError) alert(error?.data?.message);
  }, [data, error, isSuccess, isError]);

  return (
    <Box>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          nickname: "",
        }}
        onSubmit={(values) => {
          handleSignUp(values);
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
                as={TextField}
                name="firstName"
                label="Nombres"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <Field
                as={TextField}
                name="lastName"
                label="Apellidos"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <Field
                as={TextField}
                name="nickname"
                label="Nombre de usuario"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <Button type="submit" disabled={isLoading} variante="contained">
                {!isLoading ? "Registrarse" : "Cargando..."}
              </Button>

              <Box sx={{ marginTop: "5px", textAlign: "center" }}>
                <Typography variant="body2">
                  ¿Ya tienes cuenta?{" "}
                  <Link
                    component={RouterLink}
                    to={"login"}
                    sx={{
                      cursor: "pointer",
                      fontWeight: 600,
                      color: "#1E88E5",
                    }}
                  >
                    {"Inicia Sesión"}
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

export default SignUp;