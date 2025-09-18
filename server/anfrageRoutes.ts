// anfrageRoute.ts
import { Router } from "express";
import { prisma } from "./prismaClient";
import { sendAnfrageEmail, AnfrageSubmission } from "./emailService";
import { processAndSaveFiles } from './utils/fileUtils';
import { findOrCreateUser } from './utils/userDeduplication';

const router = Router();

router.post("/", async (req, res) => {
  try {
    const submission: AnfrageSubmission = req.body;
    if (!submission.name || !submission.email) {
      return res.status(400).json({ error: "Name und Email sind erforderlich" });
    }

    const category = (submission.category ?? "").toString().trim();
    if (!category) {
      console.error('Category is missing');
      return res.status(400).json({ error: "Category is required" });
    }


    const user = await findOrCreateUser(submission);


    const saved = await prisma.anfrageSubmission.create({
      data: {
        name: submission.name,
        email: submission.email,
        phone: submission.phone || '',
        message: submission.message || '',
        unterlagen: submission.unterlagen || '',
        category,
        subcategory: submission.subcategory || '',
        user: { connect: { id: user.id } }
      },
    });

    const attachments = await processAndSaveFiles(submission.uploadedFiles ?? [], saved.id);

    await sendAnfrageEmail({
      ...submission,
      id: saved.id,
      category: category
    }, attachments);

    res.json(saved);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Fehler beim Senden" });
  }
});

export default router;