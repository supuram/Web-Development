import Link from 'next/link';

export default function About(){
    return(
        <div>
            <h1>About Section</h1>
            <Link href='/'>Home</Link>
            <Link href='/posts/link3'>Link3</Link>
        </div>
    )
}