"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { H6 } from "../ui/typography";
import { Navigation } from "swiper/modules";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";

import "swiper/css";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { motion } from "framer-motion";

export default function ProductCard({ ind, product, handleSubmit, isLoading }) {
  const [inputs, setInputs] = useState({
    productname: product.title,
    name: "",
    email: "support@brandingwaale.com",
    phone: "",
    message: `I want enquire about ${product.title}`,
    email: "",
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.1,
        delay: ind / 5,
      }}
      className="bg-white shadow-lg rounded-xl p-8 col-span-12 sm:col-span-6 md:col-span-4"
    >
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
              <TableCell className="font-medium capitalize">
                {product.lounger}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-extrabold">{"Litres"}</TableCell>
              <TableCell className="font-medium">{product.litre} ltr</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-extrabold">{"Weight"}</TableCell>
              <TableCell className="font-medium">{product.weight} Kg</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-extrabold">{"Others"}</TableCell>
              <TableCell className="font-medium capitalize">
                {product.jets} hydromassage jets
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <form onSubmit={handleSubmit}>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full mt-4">Send Enquiry</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Send enquiry</DialogTitle>
            </DialogHeader>
            <div className="grid gap-2 py-4">
              <div className="">
                <Label htmlFor="username" className="text-right">
                  Fullname
                </Label>
                <Input
                  placeholder="Enter fullname"
                  id="fullname"
                  className="col-span-3"
                  onChange={(e) =>
                    setInputs((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>
              <div className="">
                <Label htmlFor="username" className="text-right">
                  Phone
                </Label>
                <Input
                  placeholder="Enter Phone"
                  id="phone"
                  className="col-span-3"
                  onChange={(e) =>
                    setInputs((prev) => ({ ...prev, phone: e.target.value }))
                  }
                />
              </div>
              <div className="">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  placeholder="Enter Email"
                  id="email"
                  className="col-span-3"
                  onChange={(e) =>
                    setInputs((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </div>
              <div className="">
                <Label htmlFor="name" className="text-right">
                  Message
                </Label>
                <Textarea
                  placeholder="Enter Message"
                  id="message"
                  className="col-span-3"
                  onChange={(e) =>
                    setInputs((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  disabled
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                disabled={isLoading}
                type="submit"
                onClick={() => handleSubmit(inputs)}
              >
                {isLoading ? "Submit..." : "Submit"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
    </motion.div>
  );
}
