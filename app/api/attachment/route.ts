import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { userId } = auth()
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 500 })
        }
        const values = await req.json();
        const result = await db.attachment.createMany({
            data: {
                ...values
            }
        })
        return NextResponse.json(result)
    } catch (error) {
        console.log("[ATTACHMENTS]", error);
        return new NextResponse("Something went wrong", { status: 500 })
    }
}