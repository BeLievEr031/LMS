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
import ComboBox from "@/components/ui/combobox";
import { Course } from "@prisma/client";

interface ICategoryFormProp {
    initialData: Course,
    courseId: string;
    options: { value: string, label: string }[]
}


const formSchema = z.object({
    categoryId: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
})


const CategoryForm = ({ initialData, courseId, options }: ICategoryFormProp) => {

    const [isEditing, setEditing] = useState<boolean>(false)
    const toggle = () => setEditing((current) => !current)

    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            categoryId: initialData.categoryId || "",
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

    const selectedOption = options.find((option) => option.value === initialData.categoryId);


    return (<div className="mt-6 border bg-slate-100 rounded-md p-4">
        <div className="flex justify-between items-center">
            Course Category
            <Button onClick={toggle} variant={"ghost"}>
                {isEditing ?
                    <p className="bg-slate-100 border hover:bg-slate-200 p-2 rounded-md">
                        Cancle
                    </p>
                    : <div className="flex gap-x-2">
                        <Pencil className="h-4 w-4" />
                        Edit Category
                    </div>
                }
            </Button>
        </div>
        <div className="mt-2">
            {
                !isEditing &&
                <p className={cn("text-sm mt-2",
                    !selectedOption?.label && "text-slate-500 italic"
                )}>
                    {selectedOption?.label || "No Category Found."}
                </p>
            }
            {
                isEditing &&
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => {
                                return <FormItem>
                                    <FormControl>
                                        <ComboBox options={...options} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }
                            }
                        />
                        <div className="flex gap-x-2">
                            <Button type="submit">SAVE</Button>
                        </div>
                    </form>
                </Form>
            }
        </div >

    </div >);
}

export default CategoryForm;