import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";

export default function EnquiryForm({ message = "", handleEnquirySubmit }) {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: { fullname: "", phone: "", email: "", message: message },
  });

  const onSubmit = (data) => {
    handleEnquirySubmit({ ...data, message });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2 py-4">
        <div className="">
          <Label className="text-right">Full Name</Label>
          <Input
            placeholder="Enter full Name"
            id="fullname"
            className="col-span-3"
            {...register("fullname", { required: "Required*" })}
          />
          {errors.fullname && (
            <span className="text-red-500">{errors.fullname.message}</span>
          )}
        </div>
        <div className="">
          <Label className="text-right">Phone</Label>
          <Input
            placeholder="Enter Phone"
            id="phone"
            className="col-span-3"
            {...register("phone", { required: "Required*" })}
          />
          {errors.phone && (
            <span className="text-red-500">{errors.phone.message}</span>
          )}
        </div>
        <div className="">
          <Label htmlFor="email" className="text-right">
            Email
          </Label>
          <Input
            placeholder="Enter Email"
            id="email"
            className="col-span-3"
            {...register("email", { required: "Required*" })}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="">
          <Label htmlFor="name" className="text-right">
            Message
          </Label>
          <Textarea
            placeholder="Enter Message"
            id="message"
            className="col-span-3"
            {...register("message", { required: "Required*" })}
            disabled
          />
          {errors.message && (
            <span className="text-red-500">{errors.message.message}</span>
          )}
        </div>
      </div>

      <div className="text-end">
        <Button>Submit</Button>
      </div>
    </form>
  );
}
