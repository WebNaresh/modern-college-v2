import { Button } from "@/components/ui/button";
import useStore from "@/hooks/loader-hook";
import { FormSteps } from "@/lib/interface";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiExternalLink } from "react-icons/fi";

type Props = {
  formStep: FormSteps;
};

const Actions = (props: Props) => {
  const { setLoading } = useStore();
  const router = useRouter();

  return (
    <Link href={props.formStep.href as string}>
      <Button variant="ghost" className="h-8 w-8 p-0 ">
        <FiExternalLink className="h-4 w-4 text-primary" />
      </Button>
    </Link>
  );
};

export default Actions;
