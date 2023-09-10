import Link from 'next/link';

export default function Link1(){
    return(
        <div>
            <h1>Good</h1>
            <Link href='/'>Home</Link>
            <Link href='/about'>About</Link>
        </div>
    )
}