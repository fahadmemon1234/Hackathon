import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { ConnectLink } from '../../../lib/db'
import { USERMODEL } from '../../../lib/Model/userSchema'

export async function GET() {

    await mongoose.connect(ConnectLink).then((val) => {
        console.log("test connect")
    })

    let res = await USERMODEL.find({})

    return NextResponse.json({
        data: res,
        message: "GET aLL RES"
    })

}