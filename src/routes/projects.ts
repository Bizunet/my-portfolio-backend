import { Router } from "express";

const router = Router();

const projects = [
  {
    id: 1,
    title: "My Portfolio",
    description: "A responsive portfolio website built with React.",
    link: "https://example.com",
  },
  {
    id: 2,
    title: "Your Next Project",
    description: "Add your project details here.",
    link: "https://example.com",
  },
];

router.get("/", (_req, res) => {
  res.json(projects);
});

export default router;
