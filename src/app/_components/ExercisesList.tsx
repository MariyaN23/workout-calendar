import AddNewExercise from "@/app/_components/AddNewExercise";
import ExerciseItem from "@/app/_components/ExerciseItem";

type ExercisesListType = {
    currentDate: string | undefined
    data: ExerciseType[]
    onExercisesEdit: () => void
}

enum ExerciseName {
    Running = "Running",
    Swimming = "Swimming",
    Yoga = "Yoga",
    Strength = "Strength",
    Cycling = "Cycling"
}

export type ExerciseType = {
    id: string
    name: ExerciseName
    progress: number
    isDone: boolean
}

export default function ExercisesList({currentDate, data, onExercisesEdit}: ExercisesListType) {
    return (
        <div className={'flex flex-col border border-gray-200 rounded-md p-6 w-[330px]'}>
            <p className={'text-lg text-center font-bold'}>{currentDate}</p>
            <div className={'flex justify-between items-baseline'}>
                <p className={'font-semibold'}>Exercises:</p>
                <AddNewExercise date={currentDate} onExercisesEdit={onExercisesEdit}/>
            </div>
            <ol className='list-decimal ml-5'>
                {data.length ? data.map((exercise) => (
                        <li key={exercise.id}>
                            <ExerciseItem exercise={exercise} onExercisesEditAction={onExercisesEdit}/>
                        </li>))
                    : <span className={'text-gray-400'}>No records found</span>}
            </ol>
        </div>
    )
}