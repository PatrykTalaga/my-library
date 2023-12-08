export default function Home() {

  return <>
    <div className="grid auto-rows-max grid-flow-row grid-cols-4 gap-5 mt-15">
      <div className="bg-slate-700 border rounded-lg w-fit p-5">
        <h1 className="text-2xl font-bold">Book Title</h1>
        <p className="text-lg">Book Cover</p>
        <p className="text-lg"><b>Author:</b> Author</p>
        <p className="text-lg"><b>Read:</b> Yes</p>
        <p className="text-lg"><b>Avaibility:</b> On the shelf</p>
      </div>
      <div className="bg-slate-700 border rounded-lg w-fit p-5">
        <h1 className="text-2xl font-bold">Book Title</h1>
        <p className="text-lg">Book Cover</p>
        <p className="text-lg"><b>Author:</b> Author</p>
        <p className="text-lg"><b>Read:</b> Yes</p>
        <p className="text-lg"><b>Avaibility:</b> On the shelf</p>
      </div>
    </div>
  </>
}

{/* <p>Pages: Pages</p>
<p>Page Format: A5</p>
<p>Year: 1212</p>
<p>Publisher: Wololo Books</p> */}