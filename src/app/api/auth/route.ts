import { NextResponse } from "next/server";
import { demoCredentials } from "../../../data/mockData";
import { AuthUser, UserRole } from "../../../lib/auth";

const roleNames: Record<UserRole, string> = {
  admin: "Prof. Dr. Rafiqul Islam",
  teacher: "Dr. Md. Kamruzzaman",
  student: "Arif Rahman",
  guardian: "Md. Lutfar Rahman",
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body as { username?: string; password?: string };

    if (!username || !password) {
      return NextResponse.json({ error: "Missing credentials." }, { status: 400 });
    }

    const entry = Object.entries(demoCredentials).find(([, creds]) => creds.username === username && creds.password === password);
    if (!entry) {
      return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
    }

    const [role] = entry as [UserRole, { username: string; password: string; label: string }];
    const user: AuthUser = {
      role,
      username,
      name: roleNames[role],
    };

    return NextResponse.json({ user }, { status: 200, headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return NextResponse.json({ error: "Unable to authenticate." }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: "ok" }, { status: 200, headers: { "Cache-Control": "no-store" } });
}
