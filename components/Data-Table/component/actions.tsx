import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import useStore from "@/hooks/loader-hook";
import { User } from "@prisma/client";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

type Props = {
  users: User[] | [];
};

const Actions = (props: Props) => {
  const { setLoading } = useStore();
  const { refresh } = useRouter();
  const authorize = async (array: User[]) => {
    if (array.length > 0) {
      setLoading(true);
      fetch("/api/update-teacher-position", {
        method: "POST",
        body: JSON.stringify({ teacherArray: array }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          toast({
            title: "Succesufully authorize teacher",
            description: "work done successfully",
          });
          refresh();
        })
        .catch((res) => {
          toast({
            title: "Error Occured Please refresh",
            description: "something went wrong",
            variant: "destructive",
          });
          refresh();
        })
        .finally(() => {
          setLoading(false);
          refresh();
        });
    }
  };
  const deAuthorize = async (array: User[]) => {
    console.log(`🚀 ~ array:`, array);
    if (array.length > 0) {
      setLoading(true);
      fetch("/api/degrade-teacher-position", {
        method: "POST",
        body: JSON.stringify({ teacherArray: array }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log(`🚀 ~ completed:`, res);
          refresh();
          toast({
            title: "User DeAuthorize",
            description: "This user is also deleted from database",
          });
        })
        .catch((res) => {
          toast({
            title: "User DeAuthorization failed",
            description: "Error occured in server please try after some time",
            variant: "destructive",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="text-xs text-muted-foreground">Actions</div>
        </DropdownMenuLabel>
        <DropdownMenuItem onClick={() => authorize(props.users)}>
          Authorize as Teacher
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => deAuthorize(props.users)}>
          Reject as Teacher
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
