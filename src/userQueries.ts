import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createUser(email: string, name: string) {
  return await prisma.user.create({
    data: {
      email,
      name,
    },
  });
}


export async function getPublishedPosts() {
    return await prisma.post.findMany({ where: { published: true } });
  }

    export async function createPost(email: string, title: string, content: string) {
        return await prisma.post.create({
        data: {
            title,
            content,
            published: false,
            author: {
                connect: {email: email}
            },
        },
        });
    }