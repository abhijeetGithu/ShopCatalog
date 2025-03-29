import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const DB_PATH = path.join(process.cwd(), "data", "users.json")

// Initialize users.json if it doesn't exist
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify([]), "utf-8")
}

export async function GET() {
  try {
    const users = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"))
    return NextResponse.json(users[0] || null) // For demo, returning first user
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const userData = await request.json()
    const users = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"))
    
    if (users.length === 0) {
      users.push(userData)
    } else {
      users[0] = { ...users[0], ...userData } // Update first user
    }

    fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2), "utf-8")
    return NextResponse.json(userData)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update user data" }, { status: 500 })
  }
}