import {NextRequest, NextResponse} from "next/server";
import {prisma} from "../../../../prisma/prisma-client";

export async function DELETE(req: NextRequest) {
    try {
        const {id} = await req.json()
        if (!id) {
            return NextResponse.json({error: "Id of record is required", status: 401})
        }
        const record = await prisma.workoutData.delete({
            where: {
                id
            }
        })
        return NextResponse.json(record)
    } catch (error) {
        return NextResponse.json({error: `Error deleting record: ${error}`, status: 500})
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const {id, isDone} = await req.json()
        if (!id) {
            return NextResponse.json({error: "Id of record is required", status: 401})
        }
        const updatedRecord = await prisma.workoutData.update({
            where: {
                id
            },
            data: {
                isDone
            }
        })
        return NextResponse.json(updatedRecord)
    } catch (error) {
        return NextResponse.json({error: `Error updating status: ${error}`, status: 500})
    }
}