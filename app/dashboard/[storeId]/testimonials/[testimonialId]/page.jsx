import { auth } from "@/auth";
import { TestimonialForm } from "./components/testimonial-form";
import { db } from "@/lib/db";
import Unauthorized from "@/components/auth/un-authorized";

const TestimonialPage = async ({ params }) => {
  const { user } = await auth();
  if (user.role !== "SUPERADMIN" && user.role !== "ADMIN") {
    return <Unauthorized />;
  }
  if (params.testimonialId !== "new") {
    var testimonials = await db.testimonial.findFirst({
      where: {
        id: params.testimonialId,
      },
    });
  }

  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <TestimonialForm initialData={testimonials} />
      </div>
    </div>
  );
};

export default TestimonialPage;
