import Link from "next/link";

type Props = {};

const LeftNav = (props: Props) => {
  return (
    <>
      <li className="hidden sm:block md:block xl:block">
        <Link href={"/"} className="text-primary text-lg font-[fantasy]">
          MODERN COLLEGE OF ENGINEERING, PUNE
        </Link>
      </li>
    </>
  );
};

export default LeftNav;
