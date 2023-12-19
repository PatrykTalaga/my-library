type UploadImage = {
  name: string
};

export function UploadImageControlled({name}:UploadImage) {

  return <>
    <div className="flex justify-left">
      <div>
        <input type="file" name={name} className="bg-zinc-900 bg-opacity-80
        border rounded-md mx-3 my-1.5 text-lg w-80"/>
        <p className='ml-4'>Upload only PNG or JPG (MAX. 500kB)</p>
      </div>
    </div>
  </>

  
}