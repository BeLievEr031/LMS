"use client";

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";

interface ITitleFormProp {
    initialData: Course,
    courseId: string;
}

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
})



const TitleForm = ({ initialData, courseId }: ITitleFormProp) => {

    const [isEditing, setEditing] = useState<boolean>(false)
    const toggle = () => setEditing((current) => !current)

    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialData.title,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await axios.patch(`/api/courses/${courseId}`, values)
            toast.success("Title Updated.")
            toggle();
            router.refresh();
        } catch (error) {
            toast.error("Something Went Wrong.")
        }
    }

    return (<div className="mt-6 border bg-slate-100 rounded-md p-4">
        <div className="flex justify-between items-center">
            Course Title
            <Button onClick={toggle} variant={"ghost"}>
                {isEditing ?
                    <p className="bg-slate-100 border hover:bg-slate-200 p-2 rounded-md">
                        Cancle
                    </p>
                    : <div className="flex gap-x-2">
                        <Pencil className="h-4 w-4" />
                        Edit Title
                    </div>
                }
            </Button>
        </div>
        <div className="mt-2">
            {
                !isEditing &&
                <p>
                    {initialData.title}
                </p>
            }
            {
                isEditing &&
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="e.g. Web Development" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex gap-x-2">
                            <Button type="submit">SAVE</Button>
                        </div>
                    </form>
                </Form>
            }
        </div>

    </div>);
}

export default TitleForm;