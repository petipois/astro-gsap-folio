import { defineCollection } from "astro/content/config";
import {z } from "zod";
import { glob } from 'astro/loaders';

const projects = defineCollection({
     loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
    schema: z.object({
        title: z.string(),
        slug: z.string(),
        description: z.string(),
        date: z.coerce.date(),
        skills: z.array(z.string()).optional(),
        link: z.string().optional(),
        imageUrl: z.string().optional()
    })
});

export const collections = {
    projects
};