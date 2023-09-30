import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


interface ICourseProp extends Request {
    title: string
}

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const { title } = await req.json()
        if (!userId) {
            return new NextResponse("Unathourized", { status: 401 })
        }

        const course = await db.course.create({
            data: {
                userId,
                title
            }
        })

        return NextResponse.json(course)
    } catch (error) {
        console.log("[COURSES]", error);
        return new NextResponse("Internal Server Error", { status: 500 })

    }
}