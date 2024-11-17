"use client"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";

const formSchema = z.object({
    name: z.string(),
    progress: z.number().positive()
})

export default function NewExerciseForm({date, onExercisesEditAction}: {
    date: string | undefined,
    onExercisesEditAction: () => void
}) {
    const [label, setLabel] = useState("km")
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "Running",
            progress: 0
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const res = await axios.post(`/api/workout/${date}`, values)
            if (res.data) {
                toast.success('New record created successfully')
                onExercisesEditAction()
                form.reset()
            }
        } catch
            (error) {
            toast.error(`Error adding new record: ${error}`)
        }
    }

    const setFormLabel = (value: string) => {
        if (value === "Running" || value === "Cycling") {
            setLabel("km")
        } else if (value === "Yoga" || value === "Swimming") {
            setLabel("min")
        } else if (value === "Strength") {
            setLabel("reps")
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Exercise type</FormLabel>
                            <Select onValueChange={(value) => {
                                field.onChange(value)
                                setFormLabel(value)
                            }} value={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select exercise type"/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Running">Running</SelectItem>
                                    <SelectItem value="Swimming">Swimming</SelectItem>
                                    <SelectItem value="Yoga">Yoga</SelectItem>
                                    <SelectItem value="Strength">Strength</SelectItem>
                                    <SelectItem value="Cycling">Cycling</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="progress"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Progress in {label}</FormLabel>
                            <FormControl>
                                <Input {...field}
                                       value={field.value}
                                       type={"number"}
                                       onChange={(e) => field.onChange(+e.currentTarget.value)}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type="submit">Add</Button>
            </form>
        </Form>
    )
}