import {ImageResults} from "@/models/Images";
import fetchImages from "@/lib/fetchImages";
import ImgContainer from "@/components/ImgContainer";
import addBlurredDataUrls from "@/lib/getBase64";
import {getPrevNextPages} from "@/lib/getPrevNextPages";
import Footer from "@/components/Footer";


type Props = {
    topic?:string | undefined,
    page?:string | undefined
}

const Gallery = async({topic = 'curated', page }:Props) => {

    let url
    if (topic === 'curated' && page) { // browsing beyond home
        url = `https://api.pexels.com/v1/curated?page=${page}`
    } else if (topic === 'curated') { // home
        url = 'https://api.pexels.com/v1/curated'
    } else if (!page) { // 1st page of search results
        url = `https://api.pexels.com/v1/search?query=${topic}`
    } else { // search result beyond 1st page
        url = `https://api.pexels.com/v1/search?query=${topic}&page=${page}`
    }
    const images : ImageResults | undefined =  await fetchImages(url);

    if(!images|| images.per_page === 0) return <h2 className='m-4 text-2xl font-bold'>No Images Found</h2>


    //calculate pagination
    const photosWithBlur = await addBlurredDataUrls(images)

    const {prevPage, nextPage} =  getPrevNextPages(images)

    const footerProps  = {topic, page, nextPage,prevPage }
    return(

        <>

            <section className="px-1 my-3 grid grid-cols-gallery auto-rows-[10px]">



                    {photosWithBlur.map(photo => (
                        <ImgContainer photo={photo} key={photo.id}/>
                    ))}

                </section>




            <Footer {...footerProps}/>
        </>
    )
}


export default Gallery