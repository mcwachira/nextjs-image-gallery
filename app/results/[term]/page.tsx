import Gallery from "@/components/Gallery";

type Props = {
    params:{
        term:string
    }
}

export const generateMetaData = ({params:{term}}:Props) => {

    return {
        title:`Results from ${term }`
    }
}


 const SearchResults = ({params:{term}}:Props) => {

    return <Gallery topic={term}/>
}
export default SearchResults