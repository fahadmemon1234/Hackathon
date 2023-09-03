import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { ConnectLink } from '../../../lib/db'
import { blogModel } from '../../../lib/Model/blogSchema'

export async function GET() {

    await mongoose.connect(ConnectLink).then((val) => {
        console.log("test connect")
    })

    let res = await blogModel.find({})

    return NextResponse.json({
        data: res,
        message: "GET aLL RES"
    })

}