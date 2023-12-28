import Link from 'next/link'

export default function MainHeaderLink({label, link}:{label:string,
  link:string}){
  return(
    <Link href={link} className='bg-zinc-900 bg-opacity-80 text-4xl mb-5
            mr-10 border px-5 py-3 rounded-lg hover:scale-110'>
            {label}
    </Link>
  )
}