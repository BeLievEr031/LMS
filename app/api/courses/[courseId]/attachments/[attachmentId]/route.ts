import db from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
export async function DELETE(req: Request, { params }: { params: { courseId: string, attachmentId: string } }) {
    try {
        const { userId } = auth();
        const { courseId, attachmentId } = params;
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const courseOwner = await db.course.findUnique({
            where: {
                id: courseId,
                userId,
            }
        })

        if (!courseOwner) {
            return new NextResponse("Unathourized.", { status: 401 })
        }

        await db.attachment.delete({
            where: {
                id: attachmentId,
                courseId
            }
        })

        return NextResponse.json({
            message: "Attachment Deleted."
        })
    } catch (error) {
        console.log("COURSE_ID_ATTACHMENT_ID", error);
        return new NextResponse("Internal Server Error.", { status: 500 })

    }
}