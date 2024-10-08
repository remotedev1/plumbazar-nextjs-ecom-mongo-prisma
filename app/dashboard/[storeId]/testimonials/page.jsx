import { format } from "date-fns";

import TestimonialsClient from "./components/Client";
import { db } from "@/lib/db";

const TestimonialsPage = async ({ params }) => {

  const testimonials = await db.testimonial.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedTestimonials = testimonials.map((item) => ({
    id: item.id,
    name: item.name,
    message: item.message,
    organization: item.organization,
    designation: item.designation,
    image: item.images[0],
    createdAt: format(new Date(item.createdAt), "MMMM do ,yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <TestimonialsClient data={formattedTestimonials} />
      </div>
    </div>
  );
};

export default TestimonialsPage;
