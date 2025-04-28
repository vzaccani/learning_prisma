import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import { createUser } from './userQueries';
import { getPublishedPosts, createPost } from './userQueries';

const prisma = new PrismaClient()
  .$extends(withAccelerate());

// A `main` function so that we can use async/await
async function main() {



  // Seed the database with users and posts
  const user1Email= `pedro${Date.now()}@prisma.io`;
  const userteste = await createUser(user1Email, 'Pedro');


  // Retrieve all published posts
  const allPosts = await getPublishedPosts();
  console.log(`Todos os posts: ${JSON.stringify(allPosts)}`)

  const newPost = await createPost(user1Email, 'Titulo', 'lorem ipsum dolor sit amet');
  console.log(`Novo post: ${JSON.stringify(newPost)}`)

 
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
