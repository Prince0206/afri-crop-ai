import type { NextApiRequest } from "next";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  role: "user" | "expert" | "admin";
}

// ─── getUserFromRequest ───────────────────────────────────────────────────────
//
// Extracts the authenticated user from an API request.
// Currently reads a user ID from the "x-user-id" header and role from
// "x-user-role" — replace this with a real session lookup (e.g. next-auth
// getServerSession) when authentication is implemented.

export async function getUserFromRequest(
  req: NextApiRequest,
): Promise<AuthUser | null> {
  const id = req.headers["x-user-id"];
  const role = req.headers["x-user-role"];

  if (!id || typeof id !== "string") return null;

  return {
    id,
    role: role === "expert" || role === "admin" ? role : "user",
  };
}

// ─── requireExpertAuth ────────────────────────────────────────────────────────

export async function requireExpertAuth(
  req: NextApiRequest,
  res: { status: (code: number) => { json: (body: unknown) => void } },
): Promise<AuthUser | null> {
  const user = await getUserFromRequest(req);
  if (!user || user.role !== "expert") {
    res.status(401).json({ error: "Unauthorized" });
    return null;
  }
  return user;
}
