import {ImageResults} from "@/models/Images";
import fetchImages from "@/lib/fetchImages";
import ImgContainer from "@/components/ImgContainer";
import addBlurredDataUrls from "@/lib/getBase64";


type Props = {
    topic:string | undefined
}

const Gallery = async({topic}:Props) => {

    const url =  !topic ? 'https://api.pexels.com./v1/curated': `https://api.pexels.com./v1/search?query=${topic}`

    const images : ImageResults | undefined =  await fetchImages(url);

    if(!images) return <h2 className='m-4 text-2xl font-bold'>No Images Found</h2>

    const photosWithBlur = await addBlurredDataUrls(images)
    return(
        <section className='px-2 my-3 grid gap-2 grid-cols-gallery'>

            <section className="px-2 my-3 grid gap-2 grid-cols-gallery">

                {photosWithBlur.map(photo => (
                    <ImgContainer photo={photo} key={photo.id}/>
                ))}

            </section>

        </section>
    )
}


export default Gallery