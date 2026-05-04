export default class NoteController {
    constructor(noteService) {
        this.noteService = noteService;
    }

    createNote = async (req, res) => {
        const data = req.body;
        if (req.file) data.imageUrl = "/uploads/" + req.file.filename;
        data.userId = req.user.id;

        try {
            const note = await this.noteService.createNote(data);
            res.status(201).json(note);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    getNotesByUserId = async (req, res) => {
        try {
            const notes = await this.noteService.getNotesByUserId(req.user.id);
            res.status(200).json(notes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    getNoteById = async (req, res) => {
        const { id } = req.params;

        try {
            const note = await this.noteService.getNoteById(id);
            res.status(200).json(note);
        } catch (error) {
            if (error.message === "Note not found") {
                return res.status(404).json({ error: error.message });
            }

            res.status(500).json({ error: "Error getting note" });
        }
    };

    updateNote = async (req, res) => {
        const { id } = req.params;
        const data = req.body;
        if (req.file) data.imageUrl = "/uploads/" + req.file.filename;

        try {
            const note = await this.noteService.updateNote(id, data);
            res.status(200).json(note);
        } catch (error) {
            if (error.message === "Note not found") {
                return res.status(404).json({ error: error.message });
            }

            res.status(500).json({ error: "Error updating note" });
        }
    };

    deleteNote = async (req, res) => {
        const { id } = req.params;

        try {
            const result = await this.noteService.deleteNote(id);
            res.status(200).json(result);
        } catch (error) {
            if (error.message === "Note not found") {
                return res.status(404).json({ error: error.message });
            }

            res.status(500).json({ error: "Error deleting note" });
        }
    };
}
