import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Play } from "lucide-react";

export function VideoDialog({ videoURL = "" }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" className="px-2 h-7 text-xs">
          <Play className="mr-1" size={15} /> Play Video
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[625px] lg:max-w-[825px] bg-transparent border-none shadow-none">
        <DialogHeader>
          <DialogTitle className="sr-only">Edit profile</DialogTitle>
          <DialogDescription className="sr-only"></DialogDescription>
        </DialogHeader>

        <video src={videoURL} autoPlay loop className="rounded-xl"></video>

        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
