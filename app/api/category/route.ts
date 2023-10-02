import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const result = await db.category.createMany({
            data: [
                { name: "Web Development" },
                { name: "Physics" },
                { name: "Mathematics" },
                { name: "Chemistry" },
            ]
        })
        return NextResponse.json(result)
    } catch (error) {
        console.log("[CATEGORY]", error);
        return new NextResponse("Something went wrong", { status: 500 })
    }
}