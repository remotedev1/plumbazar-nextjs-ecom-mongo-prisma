"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { BlogPost, Objective, Section } from "./components";

export default function ResponsiveTabs() {
  const title = "Complete Guide to Materials Procurement in Construction";
  const date = "2024-06-01";
  const author = "Deb Dulal Das";

  // Initialize content state
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true); // To manage loading state

  useEffect(() => {
    // Simulate a data fetch or complex calculation
    const blogContent = (
      <>
        <p>
          Materials procurement is a crucial aspect of construction project
          management...
        </p>
        <Section title="Understanding Materials Procurement">
          <p>What is Materials Procurement?</p>
          <p>
            Materials procurement is a crucial aspect of construction project
            management. It involves the process of sourcing, acquiring, and
            managing materials needed for construction. Effective materials
            procurement ensures that projects are completed on time, within
            budget, and to the desired quality standards. This guide will
            explore the various facets of materials procurement, providing
            detailed insights and statistical data to help understand its
            significance and best practices.
          </p>
          <p>Key Objectives:</p>
          <Objective
            number={1}
            text="Timely Delivery: Ensuring materials arrive when needed to keep the project on schedule."
          />
          <Objective
            number={2}
            text="Cost Efficiency: Acquiring materials at the best possible prices to stay within budget."
          />
          <Objective
            number={3}
            text="Quality Assurance: Obtaining materials that meet specified standards and requirements."
          />
          <Objective
            number={4}
            text="Compliance: Adhering to legal, regulatory, and ethical standards."
          />
          <Objective
            number={5}
            text="Supplier Management: Building and maintaining strong relationships with reliable suppliers."
          />
        </Section>
        <Section title="Role of Materials Procurement in Construction Management">
          <p>What is Materials Procurement?</p>

          <p>
            The role of materials procurement in construction management
            includes:
          </p>
          <Objective
            number={1}
            text="Scheduling: Ensuring materials are available when needed to maintain project timelines."
          />
          <Objective
            number={2}
            text="Budgeting: Managing costs through efficient purchasing and negotiating favorable terms."
          />
          <Objective
            number={3}
            text="Quality Control: Sourcing materials that meet quality and specification standards."
          />
          <Objective
            number={4}
            text="Risk Management: Mitigating risks related to supply chain disruptions and price volatility."
          />
          <Objective
            number={5}
            text="Compliance: Ensuring adherence to legal, regulatory, and ethical standards."
          />
          <Objective
            number={6}
            text="Sustainability: Promoting the use of environmentally friendly and sustainable materials."
          />
        </Section>
      </>
    );

    setContent(blogContent); // Set content after fetching
    setLoading(false); // Set loading to false after setting content
  }, []);

  const [selectedTab, setSelectedTab] = useState("tab1");

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      <h2 className="text-3xl font-bold text-center py-10">{title}</h2>
      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="space-y-4"
      >
        {/* Tab List */}
        <TabsList className="flex justify-between bg-gray-100 rounded-md p-1">
          <TabsTrigger
            value="tab1"
            className={`w-full text-center p-2 ${
              selectedTab === "tab1" ? "bg-white" : "bg-gray-200"
            } rounded-md`}
          >
            Report 1
          </TabsTrigger>
          <TabsTrigger
            value="tab2"
            className={`w-full text-center p-2 ${
              selectedTab === "tab2" ? "bg-white" : "bg-gray-200"
            } rounded-md`}
          >
            Report 2
          </TabsTrigger>
        </TabsList>

        {/* Tab Content */}
        <TabsContent value="tab1">
          <div className="p-4 bg-white shadow-md rounded-md">
            {loading ? (
              <p>Loading...</p> // Display loading until content is ready
            ) : (
              <BlogPost
                title={title}
                date={date}
                author={author}
                content={content}
              />
            )}
          </div>
        </TabsContent>
        <TabsContent value="tab2">
          <div className="p-4 bg-white shadow-md rounded-md">
            Content for Tab 2
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
