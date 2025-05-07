
import { Schema, model, Document } from 'mongoose';

interface Project extends Document {
    name: string;
    description: string;
    user: Schema.Types.ObjectId;
}

const projectSchema = new Schema<Project>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Ensuring this project belongs to a user
}, { timestamps: true });

const ProjectModel = model<Project>('Project', projectSchema);

export default ProjectModel;
