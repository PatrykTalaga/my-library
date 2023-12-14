import { writeFile} from 'fs/promises'
import { join } from 'path'

export default function ServerUploadPage(){

  async function upload(data:FormData) {
    'use server'

    const file:File | null = data.get('file') as unknown as File

    if(!file) {
      throw new Error('No file was uploaded')
    }
    /* if(file.size > 1000000) {
      throw new Error('No file was uploaded')
    } */ 

    console.log(file.size)

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const path = join('src/', 'app/', 'bookCovers/' , file.name)
    await writeFile(path, buffer)
    console.log(`open ${path} to see uplpaded file`)

    return { success: true}
  }

  return <>
    <h1>Upload File</h1>
    <form action={upload}>
      <input type="file" name='file'/>
      <button type='submit'>Submit</button>
    </form>
  </>
}