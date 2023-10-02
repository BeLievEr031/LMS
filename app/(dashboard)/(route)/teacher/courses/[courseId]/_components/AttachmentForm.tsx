"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon, File, Loader2, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/FileUpload";

interface AttachmentFormProps {
    initialData: Course & { attachments: Attachment[] }
    courseId: string;
};

const formSchema = z.object({
    url: z.string().min(1, {
        message: "attachment is required",
    }),
});

export const AttachmentForm = ({
    initialData,
    courseId
}: AttachmentFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [attachmentId, setAttachmentId] = useState<string | null>(null)
    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/courses/${courseId}/attachments`, values);
            toast.success("Course updated");
            toggleEdit();
            router.refresh();
        } catch (error) {
            toast.error("Internal Server Error");
        }
    }

    const handleDelete = async (id: string) => {
        try {
            setAttachmentId(id)
            await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
            toast.success("Course updated");
            router.refresh();
        } catch (error) {
            return toast.error("Something went wrong.")
        } finally {
            setAttachmentId(null)
        }
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course image
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing && (
                        <>Cancel</>
                    )}
                    {!isEditing && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add an Attachment
                        </>
                    )}

                </Button>
            </div>
            <div className="space-y-2">
                {
                    !isEditing && initialData.attachments.length === 0 ?
                        <div className="flex items-center rounded-md italic">
                            <p>
                                No Attachments Found.
                            </p>
                        </div>
                        : initialData.attachments.map((attachment) => (
                            <div
                                key={attachment.id}
                                className="flex items-center justify-between p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                            >
                                <div className="flex">
                                    <File className="h-4 w-4 mr-2 flex-shrink-0" />
                                    <p className="text-xs line-clamp-1">
                                        {attachment.name}
                                    </p>
                                </div>
                                {
                                    attachmentId === attachment.id &&
                                    <Loader2 className="h-4 w-4" />
                                }
                                {
                                    attachmentId !== attachment.id &&
                                    <button onClick={() => handleDelete(attachment.id)}>
                                        <X className="h-4 w-4" />
                                    </button>
                                }
                            </div>
                        ))
                }
            </div>
            {isEditing && (
                <div>
                    <FileUpload
                        endpoint="attachments"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ url: url });
                            }
                        }}
                    />
                </div>
            )}
        </div>
    )
}

export default AttachmentForm;