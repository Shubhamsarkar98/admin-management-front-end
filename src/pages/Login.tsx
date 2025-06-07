import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import {
    Box,
    Button,
    Typography,
    Alert,
    CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FormInputTextField } from "../components/FormElements";
import {
    loginThunk,
    selectAuthError,
    selectAuthLoading,
    selectIsLogin,
} from "../redux/authSlice";

type LoginFormInputs = {
    email: string;
    password: string;
};

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const loading = useSelector(selectAuthLoading);
    const error = useSelector(selectAuthError);
    const isLogin = useSelector(selectIsLogin);

    const { control, handleSubmit } = useForm<LoginFormInputs>({
        defaultValues: { email: "", password: "" },
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (isLogin) {
            navigate("/dashboard");
        }
    }, [isLogin, navigate]);

    const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
        dispatch(loginThunk(data) as any);
    };

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f0f2f5",
            }}
        >
            <Box
                sx={{
                    maxWidth: 400,
                    width: "100%",
                    p: 4,
                    boxShadow: 3,
                    borderRadius: 2,
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}
            >
                <Typography variant="h5" align="center">
                    Login
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <FormInputTextField
                        control={control}
                        name="email"
                        label="Email"
                        type="email"
                        required
                        fullWidth
                    />
                    <FormInputTextField
                        control={control}
                        name="password"
                        label="Password"
                        type="password"
                        required
                        fullWidth
                    />
                    {error && (
                        <Alert severity="error">
                            {error}
                        </Alert>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : "Login"}
                    </Button>
                    {isLogin && (
                        <Alert severity="success">
                            Login successful!
                        </Alert>
                    )}
                </form>
            </Box>
        </Box>
    );
};

export default Login;
