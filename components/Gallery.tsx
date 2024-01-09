import {ImageResults} from "@/models/Images";
import fetchImages from "@/lib/fetchImages";
import ImgContainer from "@/components/ImgContainer";


const Gallery = async() => {

    const url = 'https://api.pexels.com./v1/curated'

    const images : ImageResults | undefined =  await fetchImages(url);

    if(!images) return <h2 className='m-4 text-2xl font-bold'>No Images Found</h2>
    return(
        <section className='px-2 my-3 grid gap-2 grid-cols-gallery'>

            <section className="px-2 my-3 grid gap-2 grid-cols-gallery">

                {images.photos.map(photo => (
                    <ImgContainer photo={photo}/>
                ))}

            </section>

        </section>
    )
}


export default Gallery