import {
    Box,
    Paper,
    Typography,
    Skeleton,
    Alert,
} from "@mui/material";
import DashboardLayout from "../layout/DashboardLayout";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/authSlice";
import React, { useState, useEffect } from "react";

const StatCard = ({
    title,
    value,
    loading,
    error,
}: {
    title: string;
    value: number | string;
    loading?: boolean;
    error?: string;
}) => {
    if (loading) {
        return (
            <Paper sx={{ p: 3, flex: "1 1 250px" }}>
                <Skeleton variant="text" width="60%" height={32} />
                <Skeleton variant="text" width="40%" height={40} />
            </Paper>
        );
    }

    if (error) {
        return (
            <Paper sx={{ p: 3, flex: "1 1 250px" }}>
                <Alert severity="error" sx={{ mb: 1 }}>
                    {error}
                </Alert>
                <Typography variant="h6" sx={{ color: "text.secondary" }}>
                    {title}
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper sx={{ p: 3, flex: "1 1 250px", transition: "0.3s", "&:hover": { boxShadow: 6 } }}>
            <Typography variant="h6" sx={{ color: "text.secondary" }}>
                {title}
            </Typography>
            <Typography variant="h4" sx={{ color: "primary.main" }}>
                {value}
            </Typography>
        </Paper>
    );
};

const Dashboard = () => {
    const user = useSelector(selectUser);
    const [stats, setStats] = useState<{
        loading: boolean;
        error: string | null;
        data: any;
    }>({
        loading: true,
        error: null,
        data: null,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setStats((prev) => ({ ...prev, loading: true }));
                // Simulate delay
                setTimeout(() => {
                    setStats({ loading: false, error: null, data: {} });
                }, 1000);
            } catch (error) {
                setStats({ loading: false, error: "Failed to load stats", data: null });
            }
        };

        fetchStats();
    }, []);

    return (
        <DashboardLayout>
            <Box sx={{ px: 3, py: 4 }}>
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" sx={{ color: "text.primary", fontWeight: 500 }}>
                        Dashboard Overview
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        Welcome back, {user?.name || "Admin"}
                    </Typography>
                </Box>

                {/* Stat Cards without MUI Grid */}
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 3,
                        justifyContent: "space-between",
                    }}
                >
                    <StatCard
                        title="Total Users"
                        value={1234}
                        loading={stats.loading}
                        error={stats.error ?? undefined}
                    />
                    <StatCard
                        title="Active Users"
                        value={789}
                        loading={stats.loading}
                        error={stats.error ?? undefined}
                    />
                    <StatCard
                        title="Total Revenue"
                        value="$45,678"
                        loading={stats.loading}
                        error={stats.error ?? undefined}
                    />
                    <StatCard
                        title="New Users"
                        value={123}
                        loading={stats.loading}
                        error={stats.error ?? undefined}
                    />
                </Box>
            </Box>
        </DashboardLayout>
    );
};

export default Dashboard;
