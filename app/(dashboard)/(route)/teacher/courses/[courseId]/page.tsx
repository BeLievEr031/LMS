// "use client"

import db from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { LayoutDashboard } from "lucide-react"
import IconBadge from "@/components/IconBadge"
import TitleForm from "./_components/TitleForm"
import DescriptionForm from "./_components/DescriptionForm"
import ImageForm from "./_components/ImageForm"
import CategoryForm from "./_components/CategoryForm"

interface ICourseIdProp {
    params: {
        courseId: string
    }
}

const CourseIdPage = async ({ params }: ICourseIdProp) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    // @Fetching Course
    const course = await db.course.findUnique({
        where: {
            id: params.courseId,
            userId: userId
        }
    })

    if (!course) {
        return redirect("/");
    }

    // @Fetching Categories
    const categories = await db.category.findMany({
        orderBy: {
            name: "asc"
        }
    })

    const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId
    ]

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length

    const completionText = `(${completedFields}/${totalFields})`
    return (
        <div className="p-6">
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium text-blue-500">Course Setup</h1>
                    <span className="text-slate-700 text-sm">
                        Complete all fields {completionText}</span>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={LayoutDashboard} />
                        <h2 className="text-xl">
                            Customize your course
                        </h2>
                    </div>
                    <TitleForm initialData={course} courseId={course.id} />
                    <DescriptionForm initialData={course} courseId={course.id} />
                    <ImageForm initialData={course} courseId={course.id} />
                    <CategoryForm initialData={course} courseId={course.id} options={categories.map((category) => ({ value: category.id, label: category.name }))} />
                </div>
            </div>
        </div>
    );
}

export default CourseIdPage;