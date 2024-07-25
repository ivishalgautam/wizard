import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { H2, H6 } from "../ui/typography";
import { Navigation } from "swiper/modules";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-8 col-span-12 sm:col-span-6 md:col-span-4">
      <H6 className={"text-center mb-2 font-extrabold"}>{product.title}</H6>
      <div className="">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          navigation
          modules={[Navigation]}
        >
          {product.images.map((img) => (
            <SwiperSlide key={img}>
              <Image
                width={500}
                height={500}
                src={img}
                alt={product.title}
                className="mx-auto"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex flex-col items-center justify-center space-y-1">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-extrabold">{"Persons"}</TableCell>
              <TableCell className="font-medium">{product.persons}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-extrabold">{"Dimensions"}</TableCell>
              <TableCell className="font-medium">{product.size} MM</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-extrabold">{"Loungers"}</TableCell>
              <TableCell className="font-medium">{product.lounger}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-extrabold">{"Litres"}</TableCell>
              <TableCell className="font-medium">{product.litre}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-extrabold">{"Weight"}</TableCell>
              <TableCell className="font-medium">{product.weight} Kg</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-extrabold">{"Others"}</TableCell>
              <TableCell className="font-medium">
                {product.jets} hydromassage jets
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
