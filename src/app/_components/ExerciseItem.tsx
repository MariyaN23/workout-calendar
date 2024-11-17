"use client"
import {ExerciseType} from "@/app/_components/ExercisesList";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {Trash2} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast"

type ExerciseItemType = {
    exercise: ExerciseType
    onExercisesEditAction: ()=>void
}

export default function ExerciseItem({exercise, onExercisesEditAction}: ExerciseItemType) {
    const [isDone, setIsDone] = useState(exercise.isDone)
    const handleCheckboxChange = async (id: string, newIsDoneStatus: boolean) => {
        try {
            const res = await axios.patch(`/api/workout`, {
                id: id,
                isDone: newIsDoneStatus
            })
            if (res.data.error) {
                toast.error(`Error updating status: ${res.data.error}`)
            }
            if (res.data) {
                toast.success('Status updated successfully')
                setIsDone(newIsDoneStatus)
                onExercisesEditAction()
            }
        } catch (error) {
            toast.error(`Error updating status: ${error}`)
        }
    }
    const deleteWorkoutRecord = async (id: string) => {
        try {
            const res = await axios.delete(`/api/workout`, {
                data: {id}
            })
            if (res.data.error) {
                toast.error(`Error deleting record: ${res.data.error}`)
            }
            if (res.data) {
                toast.success('Record deleted successfully')
                onExercisesEditAction()
            }
        } catch (error) {
            toast.error(`Error deleting record: ${error}`)
        }
    }
    const progressUnits = (exercise.name === "Running" || exercise.name === "Cycling") ? "km"
        : (exercise.name === "Yoga" || exercise.name === "Swimming")
            ? "min"
            : "reps"
    return (
        <div className={'flex items-center justify-between p-2'}>
            <div className={`${isDone ? 'line-through decoration-gray-400' : ''}`}>
                <span className={`mr-2 ${isDone ? 'text-gray-400' : ''}`}>{exercise.name}</span>
                <span className={`font-bold ${isDone ? 'text-gray-400 font-medium' : ''}`}>
                    {exercise.progress} {progressUnits}
                </span>
            </div>
            <div>
                <input type={"checkbox"}
                       checked={isDone}
                       className={'h-4 w-4 cursor-pointer'}
                       onChange={(e) => handleCheckboxChange(exercise.id, e.currentTarget.checked)}/>
                <Button variant={"ghost"} onClick={() => deleteWorkoutRecord(exercise.id)}><Trash2/></Button>
            </div>
        </div>
    )
}