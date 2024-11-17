"use client"
import {Calendar} from "@/components/ui/calendar";
import {useEffect, useState} from "react";
import ExercisesList, {ExerciseType} from "@/app/_components/ExercisesList";
import axios from "axios";
import toast from "react-hot-toast";

export default function CalendarComponent() {
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [exercises, setExercises] = useState<ExerciseType[]>([])
    const currentDate = date?.toLocaleDateString()
    const getRecords = async () => {
        const res = await axios.get(`/api/workout/${currentDate}`)
        return res.data
    }
    const onExercisesEdit = async () => {
        const res = await getRecords()
        setExercises(res)
    }
    useEffect(() => {
        const fetchRecords = async () => {
            try {
                if (currentDate) {
                    const res = await getRecords()
                    setExercises(res)
                }
            } catch (error) {
                toast.error(`Error fetching records: ${error}`)
            }
        }
        fetchRecords()
    }, [currentDate])
    return (
        <div className={'flex gap-10'}>
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
            />
            <ExercisesList currentDate={currentDate} data={exercises} onExercisesEdit={onExercisesEdit}/>
        </div>
    )
}