import Link from 'next/link';

export default function Home(){
    return(
        <div >
            <Link href='/posts/link1'>Link1</Link>
            <Link href='/posts/link2'>Link2</Link>
            <Link href='/posts/link3'>Link3</Link>
            <Link href='/about'>About</Link>
        </div>
    )
}