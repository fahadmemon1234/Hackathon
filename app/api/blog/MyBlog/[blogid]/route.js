import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { ConnectLink } from '../../../../lib/db'
import { blogModel } from '../../../../lib/Model/blogSchema'

export async function GET(request,content) {
    console.log(content.params.blogid)

    await mongoose.connect(ConnectLink).then((val) => {
        console.log("test connect")
    })

    let checkuser = await blogModel.find({ userid:content.params.blogid.toString() })

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



export async function DELETE(request,content) {
    console.log(content.params.blogid)

    await mongoose.connect(ConnectLink).then((val) => {
        console.log("test connect")
    })

    let checkuser = await blogModel.findByIdAndDelete( content.params.blogid )

    console.log(checkuser)

    if(checkuser!=null){
        return NextResponse.json({
            data: checkuser,
            message: "Your Data is Deleted"
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
    // console.log(content.params.blogid)

    const body = await request.json();

    await mongoose.connect(ConnectLink).then((val) => {
        console.log("test connect")
    })

const id = {_id:content.params.blogid}

console.log(body,"body")


    let checkuser = await blogModel.findOneAndUpdate(id, body)


    if(checkuser!=null){
        return NextResponse.json({
            data: checkuser,
            message: "Your Data is Updated"
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