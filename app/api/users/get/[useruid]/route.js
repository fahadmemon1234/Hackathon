import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { ConnectLink } from '../../../../lib/db'
import { USERMODEL } from '../../../../lib/Model/userSchema'

export async function GET(request,content) {
    console.log(content.params.useruid)

    await mongoose.connect(ConnectLink).then((val) => {
        console.log("test connect")
    })

    
    let checkuser = await USERMODEL.find({ _id:content.params.useruid })

    console.log(checkuser)

    if(checkuser!=null){
        return NextResponse.json({
            data: checkuser,
            message: "GET Your RES"
        })

    }
    else{
        return NextResponse.json({
            data:[],
            message: "Not add any res"
        })
    }

}




// Edit

export async function PUT(request,content) {
    console.log(content.params.useruid)

    const body = await request.json();

    await mongoose.connect(ConnectLink).then((val) => {
        console.log("test connect")
    })

const id = {_id:content.params.useruid}

console.log(body,"body")


    let checkuser = await USERMODEL.findOneAndUpdate(id, body)


    if(checkuser!=null){
        return NextResponse.json({
            data: checkuser,
            message: "Your Profile is Updated"
        })

    }
    else{
        return NextResponse.json({
            data:[],
            message: "Not add any res"
        })
    }


    // return NextResponse.json({
    //             data: 'data',
    //             message: "Your Data is Updated"
    //         })
 

}