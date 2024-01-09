import Gallery from "@/components/Gallery";

type Props = {
    params:{
        myParams:(string | undefined)[]
    }
}

export const generateMetaData = ({params:{myParams}}:Props) => {

    const topic = myParams?.[0] ?? 'curated'
    const page = myParams?.[1] ?? "1"
    return {
        title:`Results from ${term }`
    }
}


 const SearchResults = ({params:{myParams}}:Props)=> {
     const topic = myParams?.[0] ?? 'curated'
     const page = myParams?.[1] ?? "1"
    return <Gallery topic={topic} page={page}/>
}
export default SearchResults