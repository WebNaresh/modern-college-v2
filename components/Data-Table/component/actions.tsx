import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useStore from "@/hooks/loader-hook";
import { FormSteps } from "@/lib/interface";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiCheckCircle, BiEdit } from "react-icons/bi";

type Props = {
  formStep: FormSteps;
};

const Actions = (props: Props) => {
  const { setLoading } = useStore();
  const router = useRouter();

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
        <Link href={props.formStep.href as string}>
          <DropdownMenuItem className="gap-2">
            <BiCheckCircle className="text-lg" /> Complete Step
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem className="gap-2">
          {" "}
          <BiEdit className="text-lg" />
          Edit Step
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
