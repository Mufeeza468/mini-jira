
import {
    Box,
    Card,
    CardContent,
    CircularProgress,
    Container,
    FormControl,
    InputLabel,
    List,
    MenuItem,
    Select,
    Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getTasksByProject } from "../api/task";

import { getAllUsers } from "../api/auth";
import Navbar from "../components/Navbar";

interface User {
    _id: string;
    name: string;
    email: string;
}

interface Task {
    _id: string;
    title: string;
    status: string;
    assignee?: User;
}

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchParams] = useSearchParams();
    const projectId = searchParams.get("projectId");
    const navigate = useNavigate();

    useEffect(() => {
        if (!projectId) {
            navigate("/dashboard");
            return;
        }

        const fetchData = async () => {
            try {
                const taskResponse = await getTasksByProject(projectId);
                setTasks(taskResponse.tasks);

                const userResponse = await getAllUsers();
                setUsers(userResponse.users);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [projectId, navigate]);

    const handleStatusChange = (taskId: string, newStatus: string) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task._id === taskId ? { ...task, status: newStatus } : task
            )
        );
    };

    const handleAssigneeChange = (taskId: string, userId: string) => {
        const selectedUser = users.find((user) => user._id === userId);

        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task._id === taskId ? { ...task, assignee: selectedUser } : task
            )
        );
    };

    return (
        <Box sx={{ backgroundColor: "#f4f6f8", minHeight: "100vh", p: 2 }}>
            <Navbar />
            <Container maxWidth="md">
                <Typography variant="h4" textAlign="center" my={3}>
                    Tasks
                </Typography>

                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                        <CircularProgress />
                    </Box>
                ) : (
                    <List>
                        {tasks.length > 0 ? (
                            tasks.map((task) => (
                                <Card key={task._id} sx={{ mb: 2 }}>
                                    <CardContent>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: { xs: "column", sm: "row" },
                                                alignItems: 'center',
                                                justifyContent: "space-between",
                                                gap: 2
                                            }}
                                        >
                                            <Typography variant="h6" sx={{ flex: 1, mb: { xs: 2, sm: 0 } }}>
                                                {task.title}
                                            </Typography>

                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: { xs: "column", sm: "row" },
                                                    gap: { xs: 1, sm: 2 },
                                                    alignItems: "center"
                                                }}
                                            >
                                                <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
                                                    <InputLabel>Status</InputLabel>
                                                    <Select
                                                        value={task.status}
                                                        onChange={(e) => handleStatusChange(task._id, e.target.value)}
                                                        label="Status"
                                                    >
                                                        <MenuItem value="todo">To Do</MenuItem>
                                                        <MenuItem value="in-progress">In Progress</MenuItem>
                                                        <MenuItem value="done">Done</MenuItem>
                                                    </Select>
                                                </FormControl>

                                                <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
                                                    <InputLabel>Assigned to</InputLabel>
                                                    <Select
                                                        value={task.assignee?._id || ""}
                                                        onChange={(e) => handleAssigneeChange(task._id, e.target.value)}
                                                        label="Assigned to"
                                                    >
                                                        <MenuItem value="">Unassigned</MenuItem>
                                                        {users.map((user) => (
                                                            <MenuItem key={user._id} value={user._id}>
                                                                {user.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </Box>
                                    </CardContent>

                                </Card>
                            ))
                        ) : (
                            <Typography>No tasks found for this project.</Typography>
                        )}
                    </List>
                )}
            </Container>
        </Box>
    );
};

export default TaskList;
