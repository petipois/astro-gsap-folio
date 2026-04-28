import { getCollection } from "astro:content";
import { experience, fullName, navLinks, siteURL } from "../lib/consts";

export async function GET() {
  const projects = await getCollection("projects");
  const posts: any[] = []; // Placeholder for future post logic

  const profile = [
    `# Developer Profile: ${fullName}`,
    `## Framework: Built with Astro and TypeScript`,
    `## Focus: Showcasing Projects, Experiences, and Insights in the Tech World`,
    `## Career Summary`,
    experience.map(exp => `- **${exp.role}** at **${exp.place}** (${exp.year})\n  - ${exp.desc}`).join("\n"),
    `## Primary Links`,
    navLinks.map(link => `- [${link.name}](${siteURL}${link.href})`).join("\n")
  ].join("\n\n");

  const projectList = [
    `## Featured Projects`,
    projects.map(p => `- **${p.data.title}**: ${p.data.description}\n  - [View Project](${siteURL}/projects/${p.data.slug})`).join("\n")
  ].join("\n");

  const blogList = [
    `## Recent Blog Posts`,
    posts.length > 0 
      ? posts.map(post => `- **${post.data.title}**: ${post.data.description}\n  - [Read Post](${siteURL}/posts/${post.slug})`).join("\n")
      : "_No recent posts available._"
  ].join("\n");

  const body = `${profile}\n\n${projectList}\n\n${blogList}`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}