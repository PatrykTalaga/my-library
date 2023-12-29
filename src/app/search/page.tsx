import SearchComponent from "@/components/SearchComponent";

export default async function Search() {
  
  return <>
  <div className="mx-auto w-96 flex flex-col justify-center items-center">
    <p className="text-3xl mb-2">Search Page</p>
    <SearchComponent />
  </div>
    
  </>
  
}