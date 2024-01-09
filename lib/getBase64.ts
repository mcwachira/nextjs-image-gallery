import {getPlaiceholder} from "plaiceholder";
import type {Photo, ImageResults} from "@/models/Images";


const getBase64 = async(imageUrl:string) => {


    try{
        const res = await fetch(imageUrl)

        if(!res.ok){
            throw new Error(`Failed to fetch image: ${res.status} ${res.statusText}`)
        }

        const buffer  = await res.arrayBuffer()

        const {base64} = await getPlaiceholder(Buffer.from(buffer))
        console.log(base64)

        return (base64)
    }catch(e){

        if(e instanceof Error) console.log(e.stack)
    }



}



 export default async function addBlurredDataUrls(images:ImageResults):Promise<Photo[]> {
//make all requests at once instead of awaiting each other - avoiding water fall
     const base64Promises = images.photos.map((photo) => getBase64(photo.src.large))

//resolve all request in order
     const base64Results = await Promise.all(base64Promises);

     const photosWithBlur: Photo[] = images.photos.map((photo, i) => {
         photo.blurredDataUrl = base64Results[i]
         return photo
     })
        return photosWithBlur

 }
// // Usage
// const { base64, img } = await getImage(
//     "https://images.unsplash.com/photo-1621961458348-f013d219b50c?auto=format&fit=crop&w=2850&q=80"
// );