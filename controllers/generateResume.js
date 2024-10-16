import fs from 'fs-extra';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to generate a resume in LaTeX format
export const generateResume = async (req, res, next) => {
    try {
        const resumeData = {
            title: req.body.title || '',
            name: req.body.name || '',
            email: req.body.email || '',
            phone: req.body.phone || '',
            location: req.body.twelveLocation || '',
            linkedin: req.body.linkedin || '',
            github: req.body.github || '',
            leetcode: req.body.leetcode || '',
            education: {
                degree: req.body.degreePursuing || '',
                institution: req.body.collegeName || '',
                startDate: req.body.startYear || '',
                endDate: req.body.passingYear || '',
                location: req.body.collegeLocation || 'Unknown',
            },
            experience1: {
                title: req.body.experience1Title || '',
                company: req.body.experience1Company || '',
                startDate: req.body.experience1StartDate || '',
                endDate: req.body.experience1EndDate || '',
                location: req.body.experience1Location || '',
                responsibilities: req.body.experience1Responsibilities || '',
            },
            experience2: {
                title: req.body.experience2Title || '',
                company: req.body.experience2Company || '',
                startDate: req.body.experience2StartDate || '',
                endDate: req.body.experience2EndDate || '',
                location: req.body.experience2Location || '',
                responsibilities: req.body.experience2Responsibilities || '',
            },
            project1: {
                name: req.body.project1 || '',
                description: req.body.project1Dec || '',
                techStack: req.body.project1TechStack || '',
            },
            project2: {
                name: req.body.project2 || '',
                description: req.body.project2Dec || '',
                techStack: req.body.project2TechStack || '',
            },
            project3: {
                name: req.body.project3 || '',
                description: req.body.project3Dec || '',
                techStack: req.body.project3TechStack || '',
            },
            skills: [
                req.body.Techskill1 || '',
                req.body.Techskill2 || '',
                req.body.Techskill3 || '',
                req.body.Techskill4 || '',
                req.body.Techskill5 || '',
                req.body.Techskill6 || '',
                req.body.Techskill7 || ''
            ].filter(skill => skill !== '').join(', '), // Only include non-empty skills
            extra_curr1: req.body.excurr_1 || '',
            extra_curr2: req.body.excurr_2 || '',
            extra_curr3: req.body.excurr_3 || '',
        };

        // Define the LaTeX template
        const latexTemplate = `
        \\documentclass{article}
        \\usepackage[margin=1in]{geometry}
        \\usepackage{hyperref}
        \\begin{document}
        
        \\title{${resumeData.name}'s Resume}
        \\author{${resumeData.email} | ${resumeData.phone} | ${resumeData.location}}
        \\date{}
        \\maketitle
        
        \\section*{Links}
        LinkedIn: \\href{${resumeData.linkedin}}{${resumeData.linkedin}} \\\\
        GitHub: \\href{${resumeData.github}}{${resumeData.github}} \\\\
        LeetCode: \\href{${resumeData.leetcode}}{${resumeData.leetcode}} \\\\
        
        \\section*{Education}
        ${resumeData.education.degree}, ${resumeData.education.institution}, ${resumeData.education.location} \\\\
        (${resumeData.education.startDate} -- ${resumeData.education.endDate})

        \\section*{Experience}
        \\textbf{${resumeData.experience1.title}} at ${resumeData.experience1.company}, ${resumeData.experience1.location} \\\\
        (${resumeData.experience1.startDate} -- ${resumeData.experience1.endDate}) \\\\
        Responsibilities: ${resumeData.experience1.responsibilities} \\\\
        
        \\textbf{${resumeData.experience2.title}} at ${resumeData.experience2.company}, ${resumeData.experience2.location} \\\\
        (${resumeData.experience2.startDate} -- ${resumeData.experience2.endDate}) \\\\
        Responsibilities: ${resumeData.experience2.responsibilities}

        \\section*{Projects}
        \\textbf{${resumeData.project1.name}} \\\\
        ${resumeData.project1.description} \\\\
        Technologies: ${resumeData.project1.techStack} \\\\
        
        \\textbf{${resumeData.project2.name}} \\\\
        ${resumeData.project2.description} \\\\
        Technologies: ${resumeData.project2.techStack} \\\\
        
        \\textbf{${resumeData.project3.name}} \\\\
        ${resumeData.project3.description} \\\\
        Technologies: ${resumeData.project3.techStack}

        \\section*{Skills}
        ${resumeData.skills}

        \\section*{Extracurricular Activities}
        ${resumeData.extra_curr1} \\\\
        ${resumeData.extra_curr2} \\\\
        ${resumeData.extra_curr3}

        \\end{document}
        `;

        // Path where the .tex file will be saved
        const texPath = path.join(__dirname, 'resume.tex');
        const pdfPath = path.join(__dirname, 'resume.pdf');

        // Write the LaTeX content to a .tex file
        await fs.writeFile(texPath, latexTemplate);

        // Command to compile the LaTeX code to PDF
        const pdflatexCommand = `pdflatex -output-directory=${__dirname} ${texPath}`;

        // Compile the LaTeX file to PDF
        exec(pdflatexCommand, (err, stdout, stderr) => {
            if (err) {
                console.error('Error compiling LaTeX:', err);
                return next(err); // Pass the error to error handling middleware
            }
            // Send the generated PDF to the client
            res.download(pdfPath);
        });
    } catch (err) {
        next(err); // Pass errors to the error handling middleware
    }
};
