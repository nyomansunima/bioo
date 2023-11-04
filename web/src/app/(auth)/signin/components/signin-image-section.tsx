import Image from 'next/image'

export default function SigninImageSection() {
  return (
    <section className="hidden laptop:flex w-1/2 h-full bg-[#E8E8FF] items-end animate-in duration-700 fade-in-10">
      <Image
        src={'/images/open-doodle-swinging.svg'}
        height={521}
        width={521}
        alt="Signin image"
      />
    </section>
  )
}
