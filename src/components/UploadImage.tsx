type UploadImage = {
  label: string
  name: string
};

export function UploadImage({label, name}:UploadImage) {

  return <>
    <div className="flex justify-left my-3">
      <label className="text-lg w-32">{label}:</label>
      <div>
        <input type="file" name='file' className="bg-zinc-900 bg-opacity-80
        border rounded-md mx-3 my-1.5 text-lg"/>
        <p className='ml-5 text-lg'>Upload only PNG or JPG (MAX. 1MB)</p>
      </div>
    </div>
  </>

  
}