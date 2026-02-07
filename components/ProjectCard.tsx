"use client";

import { motion } from "framer-motion";
import { Badge } from "./Badge";

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  index?: number;
}

export function ProjectCard({
  title,
  description,
  techStack,
  index = 0,
}: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="glass glass-hover rounded-2xl p-6 h-full flex flex-col"
    >
      <h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3>
      <p className="text-foreground/80 text-sm leading-relaxed mb-4">
        {description}
      </p>
      <div className="flex flex-wrap gap-2 mt-auto pt-4">
        {techStack.map((tech) => (
          <Badge key={tech} variant="tech">
            {tech}
          </Badge>
        ))}
      </div>
    </motion.article>
  );
}
