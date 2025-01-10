import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"
import Link from "next/link"

export function MobileSheet() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="default">
                    <MenuIcon />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit profile</SheetTitle>
                    <SheetDescription>
                        Make changes to your profile here. Click save when you&apos;re done.
                    </SheetDescription>
                </SheetHeader>
                <nav className='flex flex-col  my-8  bg-secondary/50 rounded'>
                    <SheetTrigger asChild>
                        <Link className="hover:bg-secondary/80 p-4 px-6" href={'/'} >Home</Link>
                    </SheetTrigger>
                    <SheetTrigger asChild>
                        <Link className="hover:bg-secondary/80 p-4 px-6" href={'/about'} >About</Link>
                    </SheetTrigger>
                    <SheetTrigger asChild>
                        <Link className="hover:bg-secondary/80 p-4 px-6" href={'/contact'} >Contact</Link>
                    </SheetTrigger>
                </nav>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit">Save changes</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
