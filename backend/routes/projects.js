import express from "express";
import Project from "../models/project.js";
import multer from "multer";

import { promises as fsPromises } from "fs";
import path from "path";

const app = express();
const __dirname = path.resolve();

const router = express.Router();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Create a unique filename
  },
});

const uploadsDir = path.join(__dirname, "uploads");
fsPromises
  .mkdir(uploadsDir, { recursive: true })
  .then(() => console.log("Uploads directory created"))
  .catch((err) => console.error("Error creating uploads directory:", err));

const upload = multer({ storage: storage });

// Create a new project
router.post("/create-project", upload.array("images"), async (req, res) => {
  try {
    const imagePaths = req.files.map((file) => `/uploads/${file.filename}`);
    const project = new Project({
      title: req.body.title,
      description: req.body.desc,
      url: req.body.url,
      images: imagePaths,
      date: req.body.date
    });
    await project.save();
    res.status(201).json({ message: "Project created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create project" });
  }
});

router.get("/get-project", async (req, res) => {
  try {
    const project = await Project.find();
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).send({ error: "Project not found" });
    }
  } catch (error) {
    res.status(500).send({ error: "Unable to fetch project" });
  }
});


router.delete('/del-project/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Project.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: 'Project deleted successfully' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
