import express from "express";
import cors from "cors";
import path from "path";
import sapSimulator from "./routes/sapSimulator.js";
import analyticsSimulator from "./routes/analyticsSimulator.js";
import integrationRoutes from "./routes/integrationRoutes.js";

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 4000;

app.use(cors());
app.use(express.json());

app.get("/api/status", (_req, res) => {
  res.json({ status: "ok", service: "SAP S/4HANA Financial Integration", timestamp: new Date().toISOString() });
});

app.get("/api/spec", (_req, res) => {
  res.sendFile(path.resolve("src/spec/api-spec.yaml"));
});

app.use("/api/sap", sapSimulator);
app.use("/api/analytics", analyticsSimulator);
app.use("/api/integration", integrationRoutes);

app.listen(port, () => {
  console.log(`Integration server started at http://localhost:${port}`);
});
