import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request:NextRequest) { 
    try {
        const { name, email, rollNumber, grade, section } = await request.json();
        const newStudent = await prisma.student.create({
            data: {
                name,
                email,
                rollNumber,
                grade,
                section
            },
        });
        return NextResponse.json(newStudent);
    } catch (error) {
        console.error("Error creating student:", error);
        return NextResponse.error();
    }
}

export async function GET(request:NextRequest) {
    try {
        const students = await prisma.student.findMany();
        // If there is nothing in the database
        if (!students || students.length === 0) {
            return NextResponse.json({ message: "No students data found!" });
        } else {
            return NextResponse.json(students);
        }
    } catch (error) {
        console.error("Error retrieving students:", error);
        return NextResponse.error();
    }
}
