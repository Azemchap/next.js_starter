import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <section className='py-12'>
      <div className='container'>
        <Link href={'/posts'}>
          <Button>View posts</Button>
        </Link>
      </div>
    </section>
  )
}
