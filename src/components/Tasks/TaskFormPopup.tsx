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
import { useColumnStore, useEventStore } from "@/lib/stateManagement";
import { DialogClose } from "@radix-ui/react-dialog";
import axios from "axios";
import { useState } from "react";

export function TaskFormPopup() {
  const [title, setTitle] = useState<string>("");
  const fetchColumnData = useColumnStore((state) => state.setColumn);
  const selectedEventId = useEventStore((state) => state.selectedEventId);

  const addTask = async () => {
    if (title.trim() === "") {
      alert("Title cannot be empty");
      return;
    }

    await axios.post("/api/tasks", { title, eventId: selectedEventId });
    fetchColumnData(selectedEventId);
    setTitle("");
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-xl bg-transparent">+</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Task Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input
              id="name"
              className="col-span-3"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button type="submit" onClick={addTask}>
              Add
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
