import NoteEntity from "../../domain/entities/note.entity.js";

export default class NoteService {
    constructor(noteRepository) {
        this.noteRepository = noteRepository;
    }

    async createNote(data) {
        if (!data.title || !data.content) {
            throw new Error("Title and content are required");
        }

        const note = new NoteEntity(data);
        return await this.noteRepository.save(note);
    }

    async getNoteByUser(userId) {
        return await this.noteRepository.findByUserId(userId);
    }

    async getNotesByUserId(userId) {
        return await this.noteRepository.findByUserId(userId);
    }

    async getNoteById(id) {
        const note = await this.noteRepository.findById(id);
        if (!note) throw new Error("Note not found");
        return note;
    }

    async updateNote(id, data) {
        const note = await this.noteRepository.update(id, data);
        if (!note) throw new Error("Note not found");
        return note;
    }

    async deleteNote(id) {
        const note = await this.noteRepository.delete(id);
        if (!note) throw new Error("Note not found");
        return { message: "Note deleted successfully" };
    }
}
