
import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
    title: string;
    status: 'todo' | 'in-progress' | 'done';
    project: mongoose.Types.ObjectId;
    assignedTo?: mongoose.Types.ObjectId;
}

const taskSchema = new Schema<ITask>(
    {
        title: { type: String, required: true },
        status: {
            type: String,
            enum: ['todo', 'in-progress', 'done'],
            default: 'todo',
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: 'Project',
            required: true,
        },
        assignedTo: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<ITask>('Task', taskSchema);
