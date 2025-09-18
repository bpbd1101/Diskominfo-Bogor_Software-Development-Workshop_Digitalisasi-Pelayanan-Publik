import { NextResponse } from "next/server";
import { Admin, initializeDatabase } from "@/lib/sequelize";
import auth from "@/lib/auth";
import bcrypt from "bcryptjs";

let dbInitialized = false;
const initDB = async () => {
  if (!dbInitialized) {
    await initializeDatabase();
    dbInitialized = true;
  }
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(request) {
  try {
    await initDB();
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: "Username dan password wajib diisi" },
        { status: 400 }
      );
    }

    const admin = await Admin.findOne({ where: { username } });
    if (!admin) {
      return NextResponse.json(
        { message: "Kredensial tidak valid" },
        { status: 401 }
      );
    }

    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return NextResponse.json(
        { message: "Kredensial tidak valid" },
        { status: 401 }
      );
    }

    const token = auth.signJwt({
      sub: admin.id,
      username: admin.username,
      role: admin.role,
      name: admin.name,
    });

    const response = NextResponse.json({
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        name: admin.name,
        role: admin.role,
      },
    });

    response.headers.set("Cache-Control", "no-store");
    response.headers.set("Access-Control-Allow-Origin", "*");
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan internal server" },
      { status: 500 }
    );
  }
}


