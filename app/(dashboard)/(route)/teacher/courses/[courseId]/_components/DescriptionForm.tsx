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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface IDescriptionFormProp {
    initialData: {
        description: string | null;
    },
    courseId: string;
}


const formSchema = z.object({
    description: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
})



const DescriptionForm = ({ initialData, courseId }: IDescriptionFormProp) => {

    const [isEditing, setEditing] = useState<boolean>(false)
    const toggle = () => setEditing((current) => !current)

    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: initialData.description || "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await axios.patch(`/api/courses/${courseId}`, values)
            toast.success("Description Updated.")
            toggle();
            router.refresh();
        } catch (error) {
            toast.error("Something Went Wrong.")
        }
    }

    return (<div className="mt-6 border bg-slate-100 rounded-md p-4">
        <div className="flex justify-between items-center">
            Course Description
            <Button onClick={toggle} variant={"ghost"}>
                {isEditing ?
                    <p className="bg-slate-100 border hover:bg-slate-200 p-2 rounded-md">
                        Cancle
                    </p>
                    : <div className="flex gap-x-2">
                        <Pencil className="h-4 w-4" />
                        Edit Description
                    </div>
                }
            </Button>
        </div>
        <div className="mt-2">
            {
                !isEditing &&
                <p className={cn("text-sm mt-2",
                    !initialData.description && "text-slate-500 italic"
                )}>
                    {initialData.description || "No Description Found."}
                </p>
            }
            {
                isEditing &&
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea placeholder="e.g. 'Your Course is about...'" {...field} />
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

export default DescriptionForm;