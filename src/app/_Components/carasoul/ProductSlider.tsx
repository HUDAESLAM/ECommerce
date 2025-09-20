"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import React from "react";

export default function ProductSlider({
  images,
  altContact,
}: {
  images: string[];
  altContact: string;
}) {
  return (
    <>
      <Carousel
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent>
          {images?.map((img, index) => (
            <CarouselItem key={index}>
              <Image
                className="w-full "
                src={img}
                alt={altContact}
                width={400}
                height={400}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
}
