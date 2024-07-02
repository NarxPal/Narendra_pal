import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    url: String,
    images: [String],
    date: String,
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
