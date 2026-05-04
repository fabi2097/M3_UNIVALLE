import { Router } from "express";
import NoteController from "../controllers/note.controller.js";
import NoteService from "../../application/use-cases/note.service.js";
import upload from "../middlewares/upload.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import NoteMySQLRepository from "../../infraestructure/database/mysql/note.mysql.repository.js";

const noteRepository = new NoteMySQLRepository();
const noteService = new NoteService(noteRepository);
const noteController = new NoteController(noteService);

const router = Router();

router.post("/", authMiddleware, upload.single("image"), noteController.createNote);
router.get("/", authMiddleware, noteController.getNotesByUserId);
router.get("/:id", authMiddleware, noteController.getNoteById);
router.put("/:id", authMiddleware, roleMiddleware(["admin"]), upload.single("image"), noteController.updateNote);
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), noteController.deleteNote);

export default router;
