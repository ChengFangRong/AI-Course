import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return  (
    <section>
  <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="bg-amber-200 p-8 md:p-12 lg:px-16 lg:py-24">
        <div className="flex max-w-xl items-center justify-center">
            <SignIn />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2">
        <img
          alt=""
          src="https://i.pinimg.com/736x/a5/84/1b/a5841b2cf13fd7592fff39b912204fd0.jpg"
          className="h-40 w-full object-cover sm:h-56 md:h-full"
        />

        <img
          alt=""
          src="https://i.pinimg.com/736x/dc/24/76/dc24762f956004cfb3fbb6df597df4ae.jpg"
          className="h-40 w-full object-cover sm:h-56 md:h-full"
        />
      </div>
    </div>
  </div>
</section>

)
}