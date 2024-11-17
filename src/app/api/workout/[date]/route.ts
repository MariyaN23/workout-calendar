import {NextRequest, NextResponse} from "next/server";
import {prisma} from "../../../../../prisma/prisma-client";

interface Context {
    params: Promise<{ date: string }>
}

export async function GET(req: NextRequest, context: Context) {
    try {
        const {date} = await context.params
        const workouts = await prisma.workoutData.findMany({
            where: {
                date
            }
        })
        return NextResponse.json(workouts)
    } catch (error) {
        return NextResponse.json({error: `Error getting all vacancies: ${error}`, status: 500})
    }
}

export async function POST(req: Request, context: Context) {
    try {
        const {date} = await context.params
        const {name, progress} = await req.json()
        if (!name || !progress) {
            return NextResponse.json({
                error: "Missing required fields",
                status: 400,
            })
        }
        if (progress < 0) {
            return NextResponse.json({
                error: "Progress should be grater than 0",
                status: 400,
            })
        }
        const newWorkoutRecord = await prisma.workoutData.create({
            data: {
                name,
                progress,
                date,
                isDone: false
            }
        })
        return NextResponse.json(newWorkoutRecord)
    } catch
        (error) {
        return NextResponse.json({error: `Error creating new record: ${error}`, status: 500})
    }
}