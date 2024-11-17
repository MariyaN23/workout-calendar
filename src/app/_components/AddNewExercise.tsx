import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button";
import NewExerciseForm from "@/app/_components/NewExerciseForm";

export default function AddNewExercise({date, onExercisesEdit}: {
    date: string | undefined,
    onExercisesEdit: () => void
}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>+</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="pb-2">Add new exercise</DialogTitle>
                    <NewExerciseForm date={date} onExercisesEditAction={onExercisesEdit}/>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}