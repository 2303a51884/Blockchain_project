
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Counterfeit Detection API is running!",
        status: "success"
    });
});

app.get("/api/health", (req, res) => {
    res.json({
        status: "healthy",
        project: "Blockchain Counterfeit Detection"
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
