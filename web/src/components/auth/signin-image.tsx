import Image from 'next/image'

export function SigninImage() {
  return (
    <section className="flex w-1/2 h-full bg-[#E8E8FF] items-end ">
      <Image
        src={'/images/open-doodle-swinging.svg'}
        height={521}
        width={521}
        alt="Signin image"
      />
    </section>
  )
}
