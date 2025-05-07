import axios from "axios";

export const getTasksByProject = async (projectId: string) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/task/${projectId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch tasks:", error);
        throw new Error("Failed to fetch tasks");
    }
};
