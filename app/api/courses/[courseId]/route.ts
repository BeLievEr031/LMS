import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function PATCH(req: Request, { params }: { params: { courseId: string } }) {
    try {

        const { userId } = auth()
        if (!userId) {
            return new NextResponse("Unathourized User.", { status: 401 })
        }
        const { courseId } = params
        const values = await req.json();
        console.log(values);


        const course = await db.course.update({
            where: {
                id: courseId,
                userId
            },
            data: {
                ...values
            }
        })

        return NextResponse.json({ course })
    } catch (error) {
        console.log("[COURSEID]", error);
        return new NextResponse("Internal Server Error.", { status: 500 })
    }
}