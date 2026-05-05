import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  await requireExpertAuth(req, res);
  const convo = await prisma.conversation.findUnique({
    where: { id: req.query.id as string },
    include: { messages: { orderBy: { createdAt: "asc" } } },
  });
  res.json(convo);
}
function requireExpertAuth(req: any, res: any) {
  throw new Error("Function not implemented.");
}

