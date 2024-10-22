import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request:NextRequest, { params }: { params: {id: string}}) {
    try {
        const id = parseInt(params.id);
        if (isNaN(id)) {
            return NextResponse.json({ error: "Invalid ID provided." }, { status: 400 });
        }

        const student = await prisma.student.findUnique({
            where: { id }
        });


        if (!student) {
            return NextResponse.json({ error: "Student not found." }, { status: 404 });
        }
        return NextResponse.json(student);
    } catch (error) {
        console.error("Error retrieving student:", error); 
        return NextResponse.error();
    }
}

export async function PUT(request:NextRequest, { params }: { params: {id: string}}) {
    try {
        const data = await request.json();
        const { name, email, rollNumber, grade, section } = data;
        const id = parseInt(params.id);
        if (isNaN(id)) {
            return NextResponse.json({ error: "Invalid ID provided." }, { status: 400 });
        }
        const updateStudent = await prisma.student.update({
            where: { id },
            data: {
                name,
                email,
                rollNumber,
                grade,
                section,
            }
        });

        // Returning the updated record

        const studentUpdateRecord = await prisma.student.findUnique({
            where: { id }
        });
        return NextResponse.json(studentUpdateRecord);
    } catch (error) {
        console.error("Error updating student:", error); 
        return NextResponse.error();
    }
}

export async function DELETE(request:NextRequest, { params }: { params: {id: string}}) {
    try {
        const id = parseInt(params.id);
        if (isNaN(id)) {
            return NextResponse.json({ error: "Invalid ID provided." }, { status: 400 });
        }
        const deleteStudent = await prisma.student.delete({
            where: { id }
        });
        return NextResponse.json(deleteStudent);
    } catch (error) {
        console.error("Error deleting student:", error);
        return NextResponse.error();
    }
}
