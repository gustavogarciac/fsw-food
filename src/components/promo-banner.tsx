import Image from 'next/image'

interface PromoBannerProps {
  alt: string
  src: string
}

export const PromoBanner = ({ alt, src }: PromoBannerProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={1440}
      height={400}
      className="w-full h-auto object-contain"
      quality={100}
    />
  )
}
