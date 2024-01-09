import type {ImageResults} from "@/models/Images";
import {ImageSchemaWithPhotos} from "@/models/Images";
import env from './env'


export default async function fetchImages(url:string):Promise<ImageResults | undefined>{

    try{
        const res = await fetch(url,{
            headers:{
                Authorization:env.PEXELS_API_KEY
            }
        } )

        if(!res.ok) throw  new Error('Fetch Images error!\n')

        const imagesResults:ImageResults =  await res.json()

        // console.log(imagesResults)

        //parse data with zod schema

        const parsedData = ImageSchemaWithPhotos.parse(imagesResults)

        if(parsedData.total_result === 0) return undefined

        return parsedData
    } catch(e) {
        if(e instanceof Error) console.log(e.stack)
    }
}