"use client";
import { pools } from "@/pool_data";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Controller, useForm } from "react-hook-form";
import { H2, H3, H5, H6, Muted } from "@/components/ui/typography";
import WizardLayout from "@/components/layout/wizard-layout";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Table as TableIcon } from "lucide-react";
import { colors } from "@/colors_data";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import EnquiryForm from "@/components/forms/enquiry";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useEmblaCarousel from "embla-carousel-react";
import { galleryData } from "@/gallery_data";

import "@/app/embla.css";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTableDialog, setIsTableDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useForm({
    defaultValues: { type: "", model: "", category: "", color: "", currPos: 1 },
  });
  const router = useRouter();
  const currPos = watch("currPos");
  const handlePrev = () => {
    const newPos = currPos - 1;
    newPos < 1 ? router.replace("/") : setValue("currPos", newPos);
  };

  const handleNext = async () => {
    if (!(await trigger())) return;
    const newPos = Math.min(4, currPos + 1);
    setValue("currPos", newPos);
  };

  const selectedColor = colors
    .map((item) =>
      item.colors.find((item, key) => item.name === watch("color"))
    )
    .filter(Boolean)[0];

  const onSubmit = async (data) => {
    setIsOpen(true);
  };

  async function handleQuery(inputs) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(inputs);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    try {
      const resp = await fetch(
        "https://anndaan.app/api/enquiry.php",
        requestOptions
      );
      const data = await resp.json();
      toast.success(data.message ?? "Enquiry submit");
      if (data.status) {
        setIsOpen(false);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message ?? "Unable to send enquiry!");
    } finally {
      setIsOpen(false);
    }
  }

  return (
    <WizardLayout>
      <div className="container py-8 overflow-x-hidden">
        <form onSubmit={handleSubmit(onSubmit)}>
          {currPos === 1 && (
            <Type control={control} setValue={setValue} errors={errors} />
          )}

          {currPos === 2 && (
            <Model
              control={control}
              setValue={setValue}
              errors={errors}
              type={watch("type")}
              setIsTableDialog={setIsTableDialog}
            />
          )}

          {currPos === 3 && (
            <Color control={control} setValue={setValue} errors={errors} />
          )}

          {currPos === 4 && (
            <div className="space-y-10">
              <div className="flex gap-12 flex-wrap items-start">
                <div className="space-y-2">
                  <H3>Selected Type</H3>
                  <TypeCard
                    pool={{
                      ...pools.find((item) => item.slug === watch("type")),
                    }}
                    control={control}
                    className={"max-w-96"}
                    selectable={false}
                  />
                </div>
                <div className="space-y-2">
                  <H3>Selected Model</H3>
                  <ModelCard
                    item={
                      Array.isArray(
                        pools.find((item) => item.slug === watch("type")).info
                      )
                        ? pools
                            .find((item) => item.slug === watch("type"))
                            .info.find((item) => item.model === watch("model"))
                        : Object.values(
                            pools.find((item) => item.slug === watch("type"))
                              .info
                          )
                            .flatMap((item) => item.data)
                            .find((item) => item.model === watch("model"))
                    }
                    control={control}
                    className="max-w-32"
                    selectable={false}
                  />
                </div>
                <div className="space-y-2">
                  <H3>Selected Color</H3>
                  <ColorCard
                    item={selectedColor}
                    control={control}
                    className="max-w-32"
                    selectable={false}
                  />
                </div>
              </div>
              <div>
                <H3 className={"text-center mb-4"}>Related Options</H3>
                <Gallery category={watch("category")} />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-8">
            <Button type="button" onClick={handlePrev}>
              <ArrowLeft /> &nbsp; Previous
            </Button>
            {currPos < 4 && (
              <Button type={"button"} onClick={handleNext}>
                Next &nbsp; <ArrowRight />
              </Button>
            )}
            {currPos === 4 && <Button>Submit</Button>}
          </div>
        </form>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {/* <DialogTrigger>Open</DialogTrigger> */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enquiry</DialogTitle>
            <DialogDescription className="sr-only">
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
            <EnquiryForm
              handleEnquirySubmit={handleQuery}
              message={`I want to query ${watch("type")
                .split("-")
                .join(" ")} with ${watch("model")} model and ${watch(
                "color"
              )} color.`}
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </WizardLayout>
  );
}

function Type({ control, setValue, errors }) {
  return (
    <div>
      <H2 className={"text-center mb-10"}>Pool type</H2>
      {errors.type && (
        <span className="text-red-500">{errors.type.message}</span>
      )}

      <div className="grid justify-items-center mt-4 grid-cols-[repeat(auto-fit,_minmax(300px,1fr))] gap-4 pb-10">
        {pools.map((pool, key) => (
          <TypeCard
            key={key}
            pool={pool}
            control={control}
            setValue={setValue}
          />
        ))}
      </div>
    </div>
  );
}

function Model({ control, setValue, errors, type, setIsTableDialog }) {
  return (
    <div>
      <H2 className={"text-center mb-10"}>Model</H2>

      {errors.model && (
        <span className="text-red-500">{errors.model.message}</span>
      )}
      <div className="mt-4">
        <div>
          {type &&
          Array.isArray(pools.find((ele) => ele.slug === type)?.info) ? (
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="grid justify-items-center grid-cols-[repeat(auto-fit,_minmax(128px,1fr))] gap-4 pb-10">
                  {pools
                    .find((ele) => ele.slug === type)
                    .info.map((item, key) => (
                      <ModelCard
                        key={key}
                        item={item}
                        control={control}
                        setValue={setValue}
                      />
                    ))}
                </div>
              </div>

              <div>
                <PoolInfoTable type={type} />
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="">
                  {Object.keys(
                    pools.find((ele) => ele.slug === type)?.info
                  ).map((key) => (
                    <div key={key} className="space-y-2">
                      <H3 className={"text-primary"}>{key}</H3>
                      <div className="grid justify-items-start grid-cols-[repeat(auto-fit,_minmax(128px,1fr))] gap-4 pb-10">
                        {pools
                          .find((ele) => ele.slug === type)
                          ?.info[key].data.map((item, key) => (
                            <ModelCard
                              key={key}
                              item={item}
                              control={control}
                              setValue={setValue}
                            />
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <PoolInfoTable type={type} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Color({ control, setValue, errors }) {
  return (
    <div>
      <H2>Colors</H2>

      {errors.color && (
        <span className="text-red-500">{errors.color.message}</span>
      )}

      <div className="mt-4">
        {colors.map((item) => (
          <div key={item.category}>
            <H2>{item.category}</H2>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 pb-10">
              {item.colors.map((item, key) => (
                <ColorCard
                  key={key}
                  control={control}
                  setValue={setValue}
                  item={item}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TypeCard({ pool, control, setValue, selectable = true, className }) {
  return (
    <Controller
      control={control}
      name="type"
      rules={{ required: "Please select pool type!" }}
      render={({ field: { onChange, value } }) => (
        <div
          className={cn(
            "bg-white transition-colors cursor-pointer p-4 rounded-lg drop-shadow-lg relative before:absolute before:inset-0 border-2 border-white before:rounded-lg before:z-10 max-w-[300px]",
            className,
            {
              "before:mix-blend-hue before:bg-white":
                value && value !== pool.slug,
              "border-primary": value && value === pool.slug,
            }
          )}
          onClick={selectable ? () => setValue("type", pool.slug) : null}
        >
          <figure className={cn("aspect-video rounded-lg overflow-hidden")}>
            <Image
              src={pool.img}
              alt={pool.name}
              width={300}
              height={300}
              className="w-full h-full object-cover object-center"
            />
          </figure>
          <div className="mt-4 space-y-2">
            <H3>{pool.name}</H3>
            <Muted>{pool.body}</Muted>
          </div>
        </div>
      )}
    />
  );
}

function ModelCard({ item, setValue, control, selectable = true, className }) {
  return (
    <Controller
      name="model"
      rules={{ required: "Please select model!" }}
      control={control}
      render={({ field: { onChange, value } }) => (
        <div
          className={cn(
            "bg-white p-2 py-5 cursor-pointer rounded-lg drop-shadow-lg flex h-auto items-center border-2 border-white justify-center flex-col gap-2 max-w-[128px]",
            className,
            {
              "border-primary": value && value === item?.model,
            }
          )}
          onClick={
            selectable
              ? () => {
                  setValue("model", item?.model);
                  setValue(
                    "category",
                    item?.category ? item?.category : "other"
                  );
                }
              : null
          }
        >
          <Image
            src={item?.img}
            alt={item?.model}
            width={100}
            height={100}
            className="aspect-video"
          />
          <H6 className={"text-center"}>{item?.model}</H6>
        </div>
      )}
    />
  );
}

function ColorCard({ control, setValue, item, selectable = true, className }) {
  return (
    <Controller
      name="color"
      rules={{ required: "Please select color!" }}
      control={control}
      render={({ field: { onChange, value } }) => (
        <div
          className={cn(
            "bg-white p-2 cursor-pointer max-w-[128px] rounded-lg drop-shadow-lg flex items-center border-2 border-white justify-center flex-col gap-2",
            className,
            {
              "border-primary": value && value === item.name,
            }
          )}
          onClick={selectable ? () => setValue("color", item.name) : null}
        >
          <Image
            src={item.img}
            alt={item.name}
            width={100}
            height={100}
            className="aspect-video w-full h-full object-fill"
          />
          <H6 className={"text-center"}>{item.name}</H6>
        </div>
      )}
    />
  );
}

function Gallery({ category }) {
  const [emblaRef] = useEmblaCarousel();
  const gallery =
    galleryData.find((gallery) => gallery.category === category)?.images ?? [];

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {gallery?.map((img, key) => (
          <div key={img} className="embla__slide aspect-video">
            <Image
              src={img}
              width={500}
              height={500}
              alt={`${category}-${key + 1}`}
              className="w-full h-full object-cover object-center rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function PoolInfoTable({ type, data = [] }) {
  // const data = type ? pools.find((p) => p.slug === type).info : [];
  const filterKeys = ["category", "img"];

  const filteredData = data.length
    ? data
    : type && Array.isArray(pools.find((ele) => ele.slug === type)?.info)
    ? pools.find((ele) => ele.slug === type).info
    : Object.keys(pools.find((ele) => ele.slug === type)?.info).map(
        (key) => pools.find((ele) => ele.slug === type)?.info[key].data
      );

  const headers = Object.keys(filteredData[0]).filter(
    (item) => !filterKeys.includes(item)
  );

  return Array.isArray(filteredData[0]) ? (
    filteredData.map((data, key) => (
      <PoolInfoTable key={key} type={type} data={data} />
    ))
  ) : (
    <Table className="bg-white rounded-lg overflow-hidden shadow-lg mb-10">
      <TableCaption className="sr-only">Info.</TableCaption>
      <TableBody>
        <TableRow className="bg-primary !text-black hover:bg-primary">
          {headers.map((header) => (
            <TableHead className=" text-center uppercase" key={header}>
              {header}
            </TableHead>
          ))}
        </TableRow>
        {filteredData?.map((pool, key) => {
          const { category, img, ...rest } = pool;
          const values = Object.values(rest);
          return (
            <TableRow key={key}>
              {values.map((val) => (
                <TableCell key={val} className="text-center">
                  {val}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
