import Container from "@/components/Container";
import Link from "next/link";

function page() {
  return (
    <Container>
      <div className="flex-1 hero bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Clerk Saas Template</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <Link href={"/dashboard"} className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default page;
